#!/usr/bin/env node
/**
 * 🔍 未翻译字符串检测脚本
 *
 * 对比上游 OpenClaw 代码与现有翻译文件，检测：
 *   1. 已失效的翻译条目（上游修改了原文，翻译匹配不上）
 *   2. 新增的未覆盖文件（上游新增了文件，没有对应翻译）
 *   3. 新文件中可能需要翻译的用户面向字符串
 *
 * 用法:
 *   node scripts/detect-untranslated.mjs --upstream ./openclaw
 *   node scripts/detect-untranslated.mjs --clone
 *   node scripts/detect-untranslated.mjs --upstream ./openclaw --module dashboard
 *   node scripts/detect-untranslated.mjs --upstream ./openclaw --json
 */

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

// ─── 常量 ──────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const TRANSLATIONS_DIR = path.join(ROOT_DIR, 'translations');

const UPSTREAM_REPO = 'https://github.com/openclaw/openclaw.git';
const DEFAULT_CLONE_DIR = path.join(ROOT_DIR, 'openclaw');

// 已知包含用户面向文本的目录（用于扫描新文件）
const UI_SCAN_DIRS = [
  'ui/src/ui/views',          // Dashboard 视图
  'ui/src/ui/controllers',    // Dashboard 控制器
  'src/commands',             // CLI 命令
  'src/wizard',               // 初始化向导
  'src/cli',                  // CLI 入口
  'extensions',               // 扩展插件
];

// 排除的文件模式
const EXCLUDE_PATTERNS = [
  /\.test\./,
  /\.spec\./,
  /\.d\.ts$/,
  /node_modules/,
  /dist\//,
];

// ─── 颜色 ──────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// ─── 参数解析 ──────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    upstream: null,
    clone: false,
    module: null,
    json: false,
    help: false,
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--upstream':
        opts.upstream = args[++i];
        break;
      case '--clone':
        opts.clone = true;
        break;
      case '--module':
        opts.module = args[++i];
        break;
      case '--json':
        opts.json = true;
        break;
      case '--verbose':
        opts.verbose = true;
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
      default:
        if (!args[i].startsWith('-')) {
          opts.upstream = args[i];
        }
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
${c.bold}🔍 未翻译字符串检测脚本${c.reset}

${c.bold}用法:${c.reset}
  node scripts/detect-untranslated.mjs --upstream <目录>
  node scripts/detect-untranslated.mjs --clone
  node scripts/detect-untranslated.mjs --upstream <目录> --module <模块>

${c.bold}选项:${c.reset}
  --upstream <dir>  指定上游 OpenClaw 代码目录
  --clone           自动克隆上游仓库到 ./openclaw（浅克隆）
  --module <name>   只检查指定模块 (cli, wizard, commands, dashboard, tui, daemon)
  --json            输出 JSON 格式报告
  --verbose         显示详细信息
  -h, --help        显示帮助

${c.bold}示例:${c.reset}
  ${c.dim}# 检查本地上游代码目录${c.reset}
  node scripts/detect-untranslated.mjs --upstream ./openclaw

  ${c.dim}# 自动克隆并检查${c.reset}
  node scripts/detect-untranslated.mjs --clone

  ${c.dim}# 只检查 dashboard 模块${c.reset}
  node scripts/detect-untranslated.mjs --upstream ./openclaw --module dashboard

  ${c.dim}# 输出 JSON 用于 CI${c.reset}
  node scripts/detect-untranslated.mjs --upstream ./openclaw --json
`);
}

// ─── 核心逻辑 ──────────────────────────────────────

/** 加载翻译主配置 */
async function loadMainConfig() {
  const configPath = path.join(TRANSLATIONS_DIR, 'config.json');
  const content = await fs.readFile(configPath, 'utf-8');
  return JSON.parse(content);
}

/** 加载所有翻译文件 */
async function loadAllTranslations(mainConfig, moduleFilter = null) {
  const translations = [];

  for (const [category, files] of Object.entries(mainConfig.modules)) {
    if (moduleFilter && category !== moduleFilter) continue;

    for (const file of files) {
      const filePath = path.join(TRANSLATIONS_DIR, file);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const config = JSON.parse(content);
        translations.push({
          ...config,
          category,
          configFile: file,
        });
      } catch {
        // 跳过无法加载的文件
      }
    }
  }

  return translations;
}

/** 检查翻译条目的匹配状态 */
async function checkTranslation(translation, upstreamDir) {
  const targetPath = path.join(upstreamDir, translation.file);
  const result = {
    configFile: translation.configFile,
    targetFile: translation.file,
    category: translation.category,
    description: translation.description,
    totalEntries: Object.keys(translation.replacements).length,
    matched: 0,
    stale: 0,        // 原文找不到了（上游改了）
    alreadyDone: 0,  // 译文已存在（说明翻译已被应用或上游吸收了中文）
    staleEntries: [],
    fileExists: true,
  };

  let content;
  try {
    content = await fs.readFile(targetPath, 'utf-8');
  } catch {
    result.fileExists = false;
    result.stale = result.totalEntries;
    return result;
  }

  for (const [original, translated] of Object.entries(translation.replacements)) {
    if (content.includes(translated)) {
      result.alreadyDone++;
    } else if (content.includes(original)) {
      result.matched++;
    } else {
      result.stale++;
      result.staleEntries.push({
        original: original.length > 80 ? original.slice(0, 80) + '...' : original,
        translated: translated.length > 80 ? translated.slice(0, 80) + '...' : translated,
      });
    }
  }

  return result;
}

/** 扫描上游目录中没有翻译覆盖的新文件 */
async function scanUncoveredFiles(upstreamDir, translations, moduleFilter = null) {
  // 收集所有已覆盖的文件路径
  const coveredFiles = new Set(translations.map(t => t.file));

  const uncoveredFiles = [];

  for (const scanDir of UI_SCAN_DIRS) {
    const fullDir = path.join(upstreamDir, scanDir);

    try {
      await fs.access(fullDir);
    } catch {
      continue; // 目录不存在，跳过
    }

    const entries = await walkDir(fullDir);

    for (const entry of entries) {
      const relativePath = path.relative(upstreamDir, entry).replace(/\\/g, '/');

      // 跳过排除的模式
      if (EXCLUDE_PATTERNS.some(p => p.test(relativePath))) continue;
      // 只看 .ts / .js / .mjs 文件
      if (!/\.(ts|js|mjs)$/.test(relativePath)) continue;
      // 已有翻译覆盖的跳过
      if (coveredFiles.has(relativePath)) continue;

      // 模块过滤
      if (moduleFilter) {
        const inModule = isFileInModule(relativePath, moduleFilter);
        if (!inModule) continue;
      }

      // 检查是否包含可能的用户面向字符串
      try {
        const content = await fs.readFile(entry, 'utf-8');
        const lines = content.split('\n').length;
        const stringCount = countUserFacingStrings(content);

        if (stringCount > 0) {
          uncoveredFiles.push({
            path: relativePath,
            lines,
            estimatedStrings: stringCount,
          });
        }
      } catch {
        // 跳过无法读取的文件
      }
    }
  }

  // 按估计字符串数降序排列
  uncoveredFiles.sort((a, b) => b.estimatedStrings - a.estimatedStrings);

  return uncoveredFiles;
}

/** 判断文件路径是否属于某个翻译模块 */
function isFileInModule(filePath, module) {
  const moduleMap = {
    cli: ['src/cli/', 'cli/'],
    wizard: ['src/wizard/'],
    commands: ['src/commands/'],
    dashboard: ['ui/src/ui/'],
    tui: ['src/tui/'],
    daemon: ['src/daemon/'],
  };
  const prefixes = moduleMap[module] || [];
  return prefixes.some(p => filePath.startsWith(p));
}

/** 递归遍历目录 */
async function walkDir(dir) {
  const results = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
        results.push(...await walkDir(fullPath));
      } else {
        results.push(fullPath);
      }
    }
  } catch {
    // 跳过无法读取的目录
  }
  return results;
}

/**
 * 粗略统计文件中可能的用户面向字符串数
 * 匹配常见模式：
 *  - HTML 标签中的文本: >Text</tag>
 *  - 字符串赋值: "Text" (排除短字符串、纯代码)
 *  - 模板字面量中的文本
 */
function countUserFacingStrings(content) {
  let count = 0;

  // 匹配 HTML 标签内的文本 (>Text</...)
  const htmlTextPattern = />([A-Z][a-z][a-zA-Z\s]{2,50})</g;
  const htmlMatches = content.match(htmlTextPattern);
  if (htmlMatches) count += htmlMatches.length;

  // 匹配引号内的英文短语 (3+ 单词，像 "Token Usage", "No data")
  const phrasePattern = /["']([A-Z][a-z]+(?:\s[a-zA-Z/]+){1,8})["']/g;
  const phraseMatches = content.match(phrasePattern);
  if (phraseMatches) count += phraseMatches.length;

  // 匹配常见 UI 模式: label:, title:, message:, placeholder=
  const uiPattern = /(?:label|title|message|placeholder|hint|description|blurb)\s*[:=]\s*["'`]([^"'`]{3,})["'`]/gi;
  const uiMatches = content.match(uiPattern);
  if (uiMatches) count += uiMatches.length;

  // 去重（粗略）
  return Math.max(0, Math.floor(count * 0.7));
}

/** 克隆上游仓库（浅克隆） */
function cloneUpstream(targetDir) {
  console.log(`${c.cyan}ℹ${c.reset} 正在浅克隆上游仓库到 ${targetDir}...`);

  try {
    if (existsSync(path.join(targetDir, '.git'))) {
      console.log(`${c.yellow}⚠${c.reset} 目录已存在，正在拉取最新代码...`);
      execSync(`git -C "${targetDir}" fetch --depth=1 origin main`, { stdio: 'pipe' });
      execSync(`git -C "${targetDir}" reset --hard origin/main`, { stdio: 'pipe' });
      console.log(`${c.green}✓${c.reset} 已更新到最新`);
    } else {
      execSync(`git clone --depth=1 "${UPSTREAM_REPO}" "${targetDir}"`, {
        stdio: 'pipe',
      });
      console.log(`${c.green}✓${c.reset} 克隆完成`);
    }
  } catch (err) {
    console.error(`${c.red}✗${c.reset} 克隆失败: ${err.message}`);
    process.exit(1);
  }
}

// ─── 报告输出 ──────────────────────────────────────

function printReport(results, uncoveredFiles, opts) {
  if (opts.json) {
    printJsonReport(results, uncoveredFiles);
    return;
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`${c.bold}🔍 未翻译字符串检测报告${c.reset}`);
  console.log(`${'═'.repeat(60)}`);

  // ── 已失效的翻译条目 ──
  const staleResults = results.filter(r => r.stale > 0);
  if (staleResults.length > 0) {
    console.log(`\n${c.bold}${c.yellow}--- 已失效的翻译条目 (上游修改了原文) ---${c.reset}\n`);
    for (const r of staleResults) {
      const icon = r.fileExists ? '⚠' : '✗';
      const color = r.fileExists ? c.yellow : c.red;
      console.log(`  ${color}${icon}${c.reset} ${c.bold}${r.configFile}${c.reset} → ${r.targetFile}`);
      console.log(`    ${c.dim}${r.description}${c.reset}`);

      if (!r.fileExists) {
        console.log(`    ${c.red}目标文件不存在（可能被删除或移动）${c.reset}`);
      } else {
        console.log(`    匹配: ${c.green}${r.matched}${c.reset} | 已翻译: ${r.alreadyDone} | ${c.yellow}失效: ${r.stale}${c.reset} / ${r.totalEntries}`);
        if (opts.verbose && r.staleEntries.length > 0) {
          for (const entry of r.staleEntries.slice(0, 5)) {
            console.log(`    ${c.dim}  原文: ${entry.original}${c.reset}`);
          }
          if (r.staleEntries.length > 5) {
            console.log(`    ${c.dim}  ...还有 ${r.staleEntries.length - 5} 条${c.reset}`);
          }
        }
      }
      console.log();
    }
  }

  // ── 新发现的未覆盖文件 ──
  if (uncoveredFiles.length > 0) {
    console.log(`${c.bold}${c.magenta}--- 新发现的未覆盖文件 (可能需要翻译) ---${c.reset}\n`);
    for (const f of uncoveredFiles) {
      console.log(`  ${c.magenta}●${c.reset} ${c.bold}${f.path}${c.reset}`);
      console.log(`    ${c.dim}${f.lines} 行, 估计 ~${f.estimatedStrings} 个用户面向字符串${c.reset}`);
    }
    console.log();
  }

  // ── 正常的翻译文件 ──
  const okResults = results.filter(r => r.stale === 0);
  if (opts.verbose && okResults.length > 0) {
    console.log(`${c.bold}${c.green}--- 正常匹配的翻译文件 ---${c.reset}\n`);
    for (const r of okResults) {
      console.log(`  ${c.green}✓${c.reset} ${r.configFile} (${r.matched} 匹配, ${r.alreadyDone} 已翻译)`);
    }
    console.log();
  }

  // ── 统计汇总 ──
  console.log(`${'─'.repeat(60)}`);
  console.log(`${c.bold}📊 统计汇总${c.reset}\n`);

  const totalFiles = results.length;
  const okCount = results.filter(r => r.stale === 0 && r.fileExists).length;
  const staleCount = results.filter(r => r.stale > 0 && r.fileExists).length;
  const missingCount = results.filter(r => !r.fileExists).length;
  const totalEntries = results.reduce((s, r) => s + r.totalEntries, 0);
  const totalMatched = results.reduce((s, r) => s + r.matched, 0);
  const totalStale = results.reduce((s, r) => s + r.stale, 0);
  const totalAlreadyDone = results.reduce((s, r) => s + r.alreadyDone, 0);

  console.log(`  翻译文件总数:     ${totalFiles}`);
  console.log(`  ${c.green}正常匹配:${c.reset}         ${okCount}`);
  console.log(`  ${c.yellow}有失效条目:${c.reset}       ${staleCount}`);
  console.log(`  ${c.red}目标文件缺失:${c.reset}     ${missingCount}`);
  console.log(`  ${c.magenta}新增未覆盖文件:${c.reset}   ${uncoveredFiles.length}`);
  console.log();
  console.log(`  翻译条目总数:     ${totalEntries}`);
  console.log(`  ${c.green}可匹配:${c.reset}           ${totalMatched}`);
  console.log(`  已翻译:           ${totalAlreadyDone}`);
  console.log(`  ${c.yellow}已失效:${c.reset}           ${totalStale}`);

  if (uncoveredFiles.length > 0) {
    const estimatedNew = uncoveredFiles.reduce((s, f) => s + f.estimatedStrings, 0);
    console.log(`  ${c.magenta}预计新增字符串:${c.reset}   ~${estimatedNew}`);
  }

  console.log(`\n${'═'.repeat(60)}`);

  // ── 结论 ──
  if (totalStale === 0 && uncoveredFiles.length === 0) {
    console.log(`${c.green}✓ 所有翻译条目正常，无新增未覆盖文件。${c.reset}`);
  } else {
    if (totalStale > 0) {
      console.log(`${c.yellow}⚠ 有 ${totalStale} 条翻译已失效，需要更新。${c.reset}`);
    }
    if (uncoveredFiles.length > 0) {
      console.log(`${c.magenta}● 发现 ${uncoveredFiles.length} 个新文件可能需要翻译。${c.reset}`);
    }
  }

  console.log();
}

function printJsonReport(results, uncoveredFiles) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTranslationFiles: results.length,
      normalFiles: results.filter(r => r.stale === 0 && r.fileExists).length,
      staleFiles: results.filter(r => r.stale > 0 && r.fileExists).length,
      missingTargetFiles: results.filter(r => !r.fileExists).length,
      uncoveredFiles: uncoveredFiles.length,
      totalEntries: results.reduce((s, r) => s + r.totalEntries, 0),
      matchedEntries: results.reduce((s, r) => s + r.matched, 0),
      staleEntries: results.reduce((s, r) => s + r.stale, 0),
      alreadyTranslated: results.reduce((s, r) => s + r.alreadyDone, 0),
      estimatedNewStrings: uncoveredFiles.reduce((s, f) => s + f.estimatedStrings, 0),
    },
    staleTranslations: results
      .filter(r => r.stale > 0)
      .map(r => ({
        configFile: r.configFile,
        targetFile: r.targetFile,
        category: r.category,
        fileExists: r.fileExists,
        staleCount: r.stale,
        totalCount: r.totalEntries,
        entries: r.staleEntries,
      })),
    uncoveredFiles: uncoveredFiles.map(f => ({
      path: f.path,
      lines: f.lines,
      estimatedStrings: f.estimatedStrings,
    })),
  };

  console.log(JSON.stringify(report, null, 2));
}

// ─── 主程序 ────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  if (opts.help) {
    printHelp();
    return;
  }

  // 确定上游目录
  let upstreamDir = opts.upstream;

  if (opts.clone) {
    upstreamDir = DEFAULT_CLONE_DIR;
    cloneUpstream(upstreamDir);
  }

  if (!upstreamDir) {
    console.error(`${c.red}✗${c.reset} 请指定上游代码目录: --upstream <目录> 或 --clone`);
    console.log(`  运行 ${c.cyan}node scripts/detect-untranslated.mjs --help${c.reset} 查看帮助`);
    process.exit(1);
  }

  // 验证目录存在
  try {
    await fs.access(upstreamDir);
  } catch {
    console.error(`${c.red}✗${c.reset} 目录不存在: ${upstreamDir}`);
    process.exit(1);
  }

  upstreamDir = path.resolve(upstreamDir);

  if (!opts.json) {
    console.log(`${c.cyan}ℹ${c.reset} 上游代码目录: ${upstreamDir}`);
    if (opts.module) {
      console.log(`${c.cyan}ℹ${c.reset} 过滤模块: ${opts.module}`);
    }
    console.log(`${c.cyan}ℹ${c.reset} 正在加载翻译配置...`);
  }

  // 加载翻译
  const mainConfig = await loadMainConfig();
  const translations = await loadAllTranslations(mainConfig, opts.module);

  if (!opts.json) {
    console.log(`${c.green}✓${c.reset} 已加载 ${translations.length} 个翻译文件`);
    console.log(`${c.cyan}ℹ${c.reset} 正在检查翻译匹配状态...`);
  }

  // 检查每个翻译文件
  const results = [];
  for (const t of translations) {
    const result = await checkTranslation(t, upstreamDir);
    results.push(result);
  }

  // 扫描未覆盖文件
  if (!opts.json) {
    console.log(`${c.cyan}ℹ${c.reset} 正在扫描未覆盖的新文件...`);
  }

  const uncoveredFiles = await scanUncoveredFiles(upstreamDir, translations, opts.module);

  // 输出报告
  printReport(results, uncoveredFiles, opts);

  // 退出码：有问题返回 1，一切正常返回 0
  const hasIssues = results.some(r => r.stale > 0) || uncoveredFiles.length > 0;
  process.exit(hasIssues ? 1 : 0);
}

main().catch(err => {
  console.error(`${c.red}✗${c.reset} 运行失败: ${err.message}`);
  process.exit(1);
});
