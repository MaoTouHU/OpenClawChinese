# 上游同步翻译预备清单

> **创建时间**: 2026-02-06 12:45 (北京时间)
> **上游基准**: v2026.2.3 → main (91 个新提交, 300 个文件变更)
> **预计发版**: 2026-02-06 ~ 2026-02-07
> **预计翻译量**: 175-225 条新字符串

---

## 一、变更总览

### 按类型分类

| 类型 | 提交数 | 翻译影响 |
|------|--------|---------|
| 新功能 (feat) | ~15 | 高 — 新 UI 文本、新配置项 |
| 修复 (fix) | ~40 | 中 — 部分涉及错误信息变更 |
| 文档 (docs) | ~15 | 低 — 主要影响文档站，不影响 CLI/Dashboard |
| 杂项 (chore) | ~15 | 无 — 依赖更新、构建配置 |
| 安全 (security) | ~6 | 低 — 内部逻辑，少量用户面向文本 |

### 需翻译的核心变更

| 优先级 | 变更 | 预计字符串数 | 翻译文件 |
|--------|------|------------|---------|
| P0 | Token 用量仪表板 (Web UI) | 150-200 | `dashboard/usage.json` **新建** |
| P1 | xAI Grok Provider | 10 | `commands/auth-choice.json` + `wizard/onboarding.json` **更新** |
| P1 | 计费错误信息 | 1 | `commands/helpers.json` 或新建 |
| P2 | 飞书渠道重构 | 5-6 | `dashboard/channels-feishu.json` **更新** |
| P3 | Ollama 流式文档 | 8-10 | 仅文档，不影响 CLI/Dashboard |

---

## 二、翻译任务清单

### P0: Token 用量仪表板 (最大工程)

- **上游文件**: `ui/src/ui/views/usage.ts` (~3500 行，全新文件)
- **翻译文件**: `translations/dashboard/usage.json` (需新建)
- **预计字符串数**: 150-200

#### 页面结构与翻译分区

```
Token Usage Dashboard
├── 1. 头部区域
│   ├── 页面标题: "Token Usage"
│   ├── 日期范围筛选器: Start/End 日期输入
│   ├── 时区切换: "Time zone: UTC" / "Time zone: Local"
│   ├── 刷新按钮: "Refresh"
│   └── 固定表头: "Pin" / "Unpin"
│
├── 2. 每日图表区域
│   ├── 标题: "Daily Usage"
│   ├── 图表模式: "Tokens" / "Cost"
│   ├── 分组模式: "Total" / "By Type"
│   ├── 类型标签: "Input" / "Output" / "Cache Read" / "Cache Write"
│   └── 时间标签: "Midnight", "4am", "Noon" 等
│
├── 3. 会话列表区域
│   ├── 标题: "Sessions"
│   ├── 排序: "Tokens", "Cost", "Recent", "Messages", "Errors"
│   ├── 筛选: "Days:", "Hours:", "Session:"
│   ├── 搜索语法: "agent:", "channel:", "model:", "has:errors"
│   └── 状态: "No sessions in range", "Loading..."
│
├── 4. 会话详情面板
│   ├── 标题: "Conversation"
│   ├── 摘要: "Messages", "Tool Calls", "Errors", "Duration"
│   ├── 时间线: "Usage Over Time" (Cumulative / Per Turn)
│   └── 上下文: "System Prompt Breakdown"
│
└── 5. 使用洞察区域
    ├── 指标卡: "Sessions", "Throughput", "Error Rate", "Cache Hit Rate"
    ├── 排行: "Top Models", "Top Providers", "Top Tools"
    └── 峰值: "Peak Error Days", "Peak Error Hours"
```

#### 建议译文（关键字符串）

| 英文 | 建议译文 | 说明 |
|------|----------|------|
| Token Usage | Token 用量 | 页面标题 |
| Daily Usage | 每日用量 | 图表标题 |
| Usage Overview | 用量概览 | 区域标题 |
| Sessions | 会话 | 与现有翻译一致 |
| Conversation | 对话 | 会话详情 |
| Usage Over Time | 用量趋势 | 时间线图表 |
| System Prompt Breakdown | 系统提示词分解 | 上下文分析 |
| Activity by Time | 按时间分布 | 热力图 |
| Messages | 消息 | |
| Tool Calls | 工具调用 | |
| Errors | 错误 | |
| Duration | 时长 | |
| Tokens | Token 数 | |
| Cost | 费用 | |
| Input | 输入 | Token 类型 |
| Output | 输出 | Token 类型 |
| Cache Read | 缓存读取 | Token 类型 |
| Cache Write | 缓存写入 | Token 类型 |
| Refresh | 刷新 | 与 overview.json 一致 |
| Clear Selection | 清除选择 | |
| Clear All | 全部清除 | |
| Export | 导出 | |
| Expand All | 全部展开 | |
| Collapse All | 全部折叠 | |
| Loading... | 加载中... | |
| No data | 暂无数据 | |
| No sessions in range | 该范围内暂无会话 | |
| Sort | 排序 | |
| Throughput | 吞吐量 | |
| Error Rate | 错误率 | |
| Cache Hit Rate | 缓存命中率 | |
| Top Models | 热门模型 | |
| Top Providers | 热门提供商 | |
| Top Tools | 热门工具 | |
| Top Agents | 热门代理 | |
| Top Channels | 热门渠道 | |
| Peak Error Days | 错误高峰日 | |
| Peak Error Hours | 错误高峰时段 | |
| Cumulative | 累计 | 图表模式 |
| Per Turn | 每轮 | 图表模式 |
| Total | 总计 | |
| By Type | 按类型 | |
| Avg Tokens / Msg | 平均 Token / 消息 | |
| Avg Cost / Msg | 平均费用 / 消息 | |

#### Tooltip 建议译文

| 英文 | 建议译文 |
|------|----------|
| Cache hit rate = cache read / (input + cache read). Higher is better. | 缓存命中率 = 缓存读取 / (输入 + 缓存读取)。越高越好。 |
| Error rate = errors / total messages. Lower is better. | 错误率 = 错误数 / 总消息数。越低越好。 |
| Throughput shows tokens per minute over active time. Higher is better. | 吞吐量表示活跃时间内每分钟的 Token 数。越高越好。 |
| Average tokens per message in this range. | 该范围内每条消息的平均 Token 数。 |
| Average cost per message when providers report costs. | 提供商报告费用时每条消息的平均费用。 |
| Cost data is missing for some or all sessions in this range. | 该范围内部分或全部会话缺少费用数据。 |
| Estimated from session spans (first/last activity). | 根据会话跨度（首次/末次活动）估算。 |

#### 时间标签

| 英文 | 建议译文 |
|------|----------|
| Midnight | 午夜 |
| 4am | 凌晨4点 |
| 8am | 上午8点 |
| Noon | 中午 |
| 4pm | 下午4点 |
| 8pm | 晚上8点 |
| Sun / Mon / Tue / Wed / Thu / Fri / Sat | 周日 / 周一 / 周二 / 周三 / 周四 / 周五 / 周六 |

#### 翻译策略

1. **等上游发版后**：克隆上游代码，找到 `ui/src/ui/views/usage.ts`
2. **提取字符串**：运行检测脚本或手动查找所有用户面向文本
3. **创建翻译文件**：新建 `translations/dashboard/usage.json`，按上面的译文填充
4. **注意代码上下文**：翻译条目需包含 HTML 标签上下文（如 `<div class="card-title">Token Usage</div>`）
5. **注册到 config.json**：将 `dashboard/usage.json` 添加到 `translations/config.json` 的 `modules.dashboard` 数组

---

### P1: xAI Grok Provider (10 条)

- **上游文件**:
  - `src/commands/auth-choice-options.ts`
  - `src/commands/auth-choice.apply.xai.ts` (新文件)
  - `src/commands/onboard-auth.models.ts`
  - `src/cli/program/register.onboard.ts`
- **翻译文件**: `translations/commands/auth-choice.json` (更新) + 可能需要新建 `commands/auth-choice-xai.json`
- **预计字符串数**: 10

#### 完整字符串清单与建议译文

| # | 英文原文 | 建议译文 | 所在文件 | 上下文 |
|---|---------|----------|---------|--------|
| 1 | `"xAI (Grok)"` | `"xAI (Grok)"` | auth-choice-options.ts | 提供商分组标签（品牌名不翻译） |
| 2 | `"API key"` (xAI hint) | `"API 密钥"` | auth-choice-options.ts | 提示文本 |
| 3 | `"xAI (Grok) API key"` | `"xAI (Grok) API 密钥"` | auth-choice-options.ts | 认证选项 |
| 4 | `"Enter xAI API key"` | `"输入 xAI API 密钥"` | auth-choice.apply.xai.ts | 输入提示 |
| 5 | `"Use existing XAI_API_KEY (${source}, ${preview})?"` | `"使用已有的 XAI_API_KEY（${source}，${preview}）？"` | auth-choice.apply.xai.ts | 确认提示 |
| 6 | `"Model configured"` | `"模型已配置"` | auth-choice.apply.xai.ts | 成功提示标题 |
| 7 | `"Default model set to ${model} for agent \"${agentId}\"."` | `"已将代理 \"${agentId}\" 的默认模型设为 ${model}。"` | auth-choice.apply.xai.ts | 成功信息 |
| 8 | `"Grok 4"` | `"Grok 4"` | onboard-auth.models.ts | 模型名（不翻译） |
| 9 | `"Grok"` | `"Grok"` | onboard-auth.config-core.ts | 模型别名（不翻译） |
| 10 | `"xAI API key"` (CLI) | `"xAI API 密钥"` | register.onboard.ts | CLI --help 描述 |

#### 注意事项

- 品牌名 `xAI` 和 `Grok` 不翻译
- 字符串 #5 和 #7 含动态变量 `${...}`，翻译时需保留变量占位符
- 需参考现有 auth-choice.json 的格式，确保翻译条目包含周围代码上下文
- `"API key"` → `"API 密钥"` 需全项目统一（检查现有翻译是否一致）

---

### P1: 计费错误信息 (1 条关键)

- **上游文件**: `src/agents/pi-embedded-helpers/errors.ts`
- **翻译文件**: 需确认目标，可能新建 `translations/commands/errors.json`
- **预计字符串数**: 1

#### 原文

```
⚠️ API provider returned a billing error — your API key has run out of credits or has an insufficient balance. Check your provider's billing dashboard and top up or switch to a different API key.
```

#### 建议译文

```
⚠️ API 提供商返回了计费错误 — 您的 API 密钥已耗尽额度或余额不足。请检查提供商的计费面板，充值或更换其他 API 密钥。
```

#### 注意事项

- 这是用户在 API 额度用完时看到的**关键错误信息**
- 需要确认该字符串在源码中的完整上下文（可能包含函数调用包装）
- 翻译后检查 `⚠️` emoji 是否正确保留

---

### P2: 飞书渠道重构 (5-6 条)

- **上游文件**: `extensions/feishu/` (多个文件)
- **翻译文件**: `translations/dashboard/channels-feishu.json` (更新)
- **预计字符串数**: 5-6

#### 新增/变更对照表

| # | 类型 | 原内容 | 新内容 | 建议译文 |
|---|------|--------|--------|----------|
| 1 | 变更 | `selectionLabel: "Feishu (Lark Open Platform)"` | `selectionLabel: "Feishu/Lark (飞书)"` | 上游已含中文，验证一致性 |
| 2 | 变更 | `blurb: "Feishu/Lark bot via WebSocket."` | `blurb: "飞书/Lark enterprise messaging with doc/wiki/drive tools."` | `"飞书/Lark 企业消息，支持文档/知识库/云盘工具。"` |
| 3 | 新增 | — | `"feishu: webhook mode not implemented in monitor..."` | `"飞书：监控器不支持 webhook 模式。请使用 websocket 模式或配置外部 HTTP 服务器。"` |
| 4 | 新增 | — | `groupPolicy="open" allows any member to trigger...` | `groupPolicy="open" 允许任何成员触发（需@提及）。设置 groupPolicy="allowlist" + groupAllowFrom 以限制发送者。` |
| 5 | 变更 | `idLabel: "feishuOpenId"` | `idLabel: "feishuUserId"` | 内部标识符，检查 UI 是否展示 |

#### 现有翻译对比

现有 `channels-feishu.json` 翻译的目标文件是 `ui/src/ui/views/channels.feishu.ts`，覆盖了：
- 卡片标题 (飞书/Lark)
- 状态标签 (运行中/已配置/已连接/已启用)
- 按钮 (探测/启动/停止/重启)
- 字段 (应用ID/应用密钥/验证令牌/加密密钥)
- 模式 (webhook/轮询/事件)

上游重构将飞书从内置 SDK 改为社区插件 (`extensions/feishu/`)，但 Dashboard 视图文件路径可能不变。需验证 `ui/src/ui/views/channels.feishu.ts` 是否仍是翻译目标。

---

### P3: 其他小项

#### Claude Opus 4.6 模型
- **影响**: 模型目录更新，可能出现在 onboarding 模型选择列表
- **翻译**: 模型名 `Claude Opus 4.6` 不需翻译
- **操作**: 无

#### GPT-5.3 Codex 回退
- **影响**: 模型配置变化
- **翻译**: 无用户面向文本
- **操作**: 无

#### Dashboard 配置页滚动修复
- **影响**: CSS 修复
- **翻译**: 无
- **操作**: 无

#### Ollama 流式配置文档
- **影响**: 仅 docs/ 目录下的 Markdown 文档
- **翻译**: 约 8-10 条文档字符串，如果本地化文档则需处理
- **操作**: 低优先级，可后续处理

---

## 三、术语表

确保全项目翻译一致性：

### 通用术语

| 英文 | 中文 | 使用场景 |
|------|------|---------|
| Token | Token | 不翻译，保留英文 |
| API key | API 密钥 | 统一用法 |
| Provider | 提供商 | 模型/认证提供商 |
| Gateway | 网关 | |
| Dashboard | 控制台 | README 中用法 |
| Channel | 渠道 | |
| Session | 会话 | |
| Agent | 代理 | |
| Instance | 实例 | |
| Cron | 定时任务 | |
| Onboarding | 初始化向导 | |

### Token 仪表板专用术语

| 英文 | 中文 | 说明 |
|------|------|------|
| Token Usage | Token 用量 | 页面标题 |
| Cost | 费用 | 非"成本" |
| Throughput | 吞吐量 | Token/分钟 |
| Cache Hit Rate | 缓存命中率 | |
| Error Rate | 错误率 | |
| Input tokens | 输入 Token | |
| Output tokens | 输出 Token | |
| Cache Read | 缓存读取 | |
| Cache Write | 缓存写入 | |
| Tool Calls | 工具调用 | |
| System Prompt | 系统提示词 | |
| Context | 上下文 | |

### 飞书专用术语

| 英文 | 中文 | 说明 |
|------|------|------|
| Feishu | 飞书 | |
| Lark | Lark | 保留英文（国际版名称）|
| App ID | 应用 ID | |
| App Secret | 应用密钥 | |
| Verification Token | 验证令牌 | |
| Encrypt Key | 加密密钥 | |
| Webhook | Webhook | 保留英文 |
| WebSocket | WebSocket | 保留英文 |

---

## 四、执行检查清单

上游发版后按此清单逐项执行：

### 第一步：获取上游代码
- [ ] 克隆或拉取上游最新发版代码
- [ ] 确认版本号和变更内容

### 第二步：Token 仪表板 (P0)
- [ ] 找到 `ui/src/ui/views/usage.ts`，确认文件存在
- [ ] 提取所有用户面向字符串（使用检测脚本辅助）
- [ ] 创建 `translations/dashboard/usage.json`
- [ ] 在 `translations/config.json` 的 `modules.dashboard` 中注册
- [ ] 运行 `node cli/index.mjs apply --verbose` 验证
- [ ] 检查未匹配数量

### 第三步：xAI Grok Provider (P1)
- [ ] 确认 `src/commands/auth-choice.apply.xai.ts` 存在
- [ ] 确认 `src/commands/auth-choice-options.ts` 中的 xAI 字符串
- [ ] 创建或更新翻译文件，添加上述 10 条翻译
- [ ] 注意包含代码上下文

### 第四步：计费错误 (P1)
- [ ] 找到 `src/agents/pi-embedded-helpers/errors.ts`
- [ ] 确认错误信息的完整上下文
- [ ] 添加翻译条目

### 第五步：飞书渠道 (P2)
- [ ] 确认 `ui/src/ui/views/channels.feishu.ts` 路径是否变化
- [ ] 对比现有翻译与新内容，更新 `channels-feishu.json`
- [ ] 检查新增的错误信息和安全警告

### 第六步：验证与发布
- [ ] 运行 `node cli/index.mjs apply --verbose` 完整测试
- [ ] 检查未匹配数是否下降
- [ ] 提交更新，触发 nightly 构建
- [ ] 验证 npm @nightly 包的翻译效果

---

*此文档基于 2026-02-06 上游 main 分支的 91 个未发布提交分析生成*
*上游发版后需根据实际代码调整翻译条目的代码上下文*
