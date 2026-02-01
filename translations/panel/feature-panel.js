/* ============================================================
 * OpenClaw 汉化版 - 功能面板
 * 武汉晴辰天下网络科技有限公司 | https://qingchencloud.com/
 * ============================================================ */

(function() {
  'use strict';

  // 面板数据（构建时会被替换为实际数据）
  const PANEL_DATA = /*PANEL_DATA_PLACEHOLDER*/{
    faq: [],
    plugins: [],
    about: {
      project: "OpenClaw 汉化发行版",
      company: "武汉晴辰天下网络科技有限公司",
      website: "https://openclaw.qt.cool/",
      github: "https://github.com/1186258278/OpenClawChineseTranslation",
      npm: "https://www.npmjs.com/package/@qingchencloud/openclaw-zh",
      companyWebsite: "https://qingchencloud.com/",
      license: "MIT License"
    }
  }/*END_PANEL_DATA*/;

  // 图标 SVG
  const ICONS = {
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    lobster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="none"/><g fill="#3a0a0d"><rect x="1" y="5" width="1" height="3"/><rect x="2" y="4" width="1" height="1"/><rect x="2" y="8" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="3" y="9" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="4" y="10" width="1" height="1"/><rect x="5" y="2" width="6" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="12" y="3" width="1" height="1"/><rect x="12" y="9" width="1" height="1"/><rect x="13" y="4" width="1" height="1"/><rect x="13" y="8" width="1" height="1"/><rect x="14" y="5" width="1" height="3"/><rect x="5" y="11" width="6" height="1"/><rect x="4" y="12" width="1" height="1"/><rect x="11" y="12" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/><rect x="5" y="14" width="6" height="1"/></g><g fill="#ff4f40"><rect x="5" y="3" width="6" height="1"/><rect x="4" y="4" width="8" height="1"/><rect x="3" y="5" width="10" height="1"/><rect x="3" y="6" width="10" height="1"/><rect x="3" y="7" width="10" height="1"/><rect x="4" y="8" width="8" height="1"/><rect x="5" y="9" width="6" height="1"/><rect x="5" y="12" width="6" height="1"/><rect x="6" y="13" width="4" height="1"/></g><g fill="#ff775f"><rect x="1" y="6" width="2" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="13" y="6" width="2" height="1"/><rect x="13" y="5" width="1" height="1"/><rect x="13" y="7" width="1" height="1"/></g><g fill="#081016"><rect x="6" y="5" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/></g><g fill="#f5fbff"><rect x="6" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/></g></svg>'
  };

  // 当前激活的 Tab
  let activeTab = 'help';

  // 创建面板 HTML
  function createPanelHTML() {
    return `
      <div class="feature-panel-overlay" id="feature-panel-overlay">
        <div class="feature-panel">
          <header class="panel-header">
            <h2>🦞 功能面板</h2>
            <button class="panel-close" id="panel-close">&times;</button>
          </header>
          <nav class="panel-tabs">
            <button class="panel-tab active" data-tab="help">帮助文档</button>
            <button class="panel-tab" data-tab="commands">快捷指令</button>
            <button class="panel-tab" data-tab="plugins">插件列表</button>
            <button class="panel-tab" data-tab="about">关于我们</button>
          </nav>
          <main class="panel-content" id="panel-content">
            ${renderTabContent('help')}
          </main>
        </div>
      </div>
    `;
  }

  // 渲染 Tab 内容
  function renderTabContent(tab) {
    switch (tab) {
      case 'help':
        return renderHelpTab();
      case 'commands':
        return renderCommandsTab();
      case 'plugins':
        return renderPluginsTab();
      case 'about':
        return renderAboutTab();
      default:
        return '';
    }
  }

  // 渲染帮助文档 Tab
  function renderHelpTab() {
    const faqItems = PANEL_DATA.faq.map(item => `
      <div class="faq-item" data-id="${item.id}">
        <button class="faq-question">
          <span>${item.question}</span>
          ${ICONS.chevronDown}
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${formatAnswer(item.answer)}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="help-tab">
        ${faqItems || '<p style="color: var(--text-muted); text-align: center;">暂无 FAQ 内容</p>'}
      </div>
    `;
  }

  // 格式化答案（处理代码块）
  function formatAnswer(text) {
    return text.replace(/```([\s\S]*?)```/g, '<code>$1</code>')
               .replace(/`([^`]+)`/g, '<code style="display:inline;padding:2px 6px;margin:0;">$1</code>')
               .replace(/\n/g, '<br>');
  }

  // 渲染快捷指令 Tab
  function renderCommandsTab() {
    return `
      <div class="commands-grid">
        <button class="command-btn" data-action="restart">
          ${ICONS.refresh}
          <span>重启网关</span>
          <span class="command-desc">重启 OpenClaw Gateway</span>
        </button>
        <button class="command-btn" data-action="clear-cache">
          ${ICONS.trash}
          <span>清理缓存</span>
          <span class="command-desc">清理临时文件和缓存</span>
        </button>
        <button class="command-btn" data-action="check-update">
          ${ICONS.download}
          <span>检测更新</span>
          <span class="command-desc">检查是否有新版本</span>
        </button>
        <button class="command-btn" data-action="restore-original">
          ${ICONS.undo}
          <span>恢复原版</span>
          <span class="command-desc">切换回原版 OpenClaw</span>
        </button>
        <button class="command-btn" data-action="fix-common" style="grid-column: span 2;">
          ${ICONS.wrench}
          <span>一键修复常见问题</span>
          <span class="command-desc">自动检测并修复 token、bind、mode 等配置问题</span>
        </button>
      </div>
    `;
  }

  // 渲染插件列表 Tab
  function renderPluginsTab() {
    const pluginItems = PANEL_DATA.plugins.map(plugin => `
      <div class="plugin-item">
        <div class="plugin-icon">📦</div>
        <div class="plugin-info">
          <div class="plugin-name">${plugin.name}</div>
          <div class="plugin-desc">${plugin.description}</div>
          ${plugin.install ? `
            <code class="plugin-install" data-copy="${plugin.install}" title="点击复制安装命令">
              ${plugin.install}
            </code>
          ` : ''}
        </div>
        <span class="plugin-status ${plugin.status}">${plugin.status === 'available' ? '可用' : '即将推出'}</span>
      </div>
    `).join('');

    return `
      <div class="plugins-tab">
        ${pluginItems || '<p style="color: var(--text-muted); text-align: center;">暂无插件</p>'}
      </div>
    `;
  }

  // 渲染关于我们 Tab
  function renderAboutTab() {
    const about = PANEL_DATA.about;
    return `
      <div class="about-section">
        <div class="about-logo">${ICONS.lobster}</div>
        <h3 class="about-title">${about.project}</h3>
        <p class="about-company">${about.company}</p>
        <div class="about-links">
          <a class="about-link" href="${about.website}" target="_blank" rel="noreferrer">
            ${ICONS.globe}
            <span>官网</span>
          </a>
          <a class="about-link" href="${about.github}" target="_blank" rel="noreferrer">
            ${ICONS.github}
            <span>GitHub</span>
          </a>
          <a class="about-link" href="${about.npm}" target="_blank" rel="noreferrer">
            ${ICONS.package}
            <span>npm</span>
          </a>
          <a class="about-link" href="${about.companyWebsite}" target="_blank" rel="noreferrer">
            ${ICONS.globe}
            <span>公司官网</span>
          </a>
        </div>
        <p class="about-copyright">© 2026 ${about.company} | ${about.license}</p>
      </div>
    `;
  }

  // 显示 Toast 通知
  function showToast(message, type = 'info') {
    let toast = document.querySelector('.panel-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'panel-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `panel-toast ${type}`;
    
    // 触发重排以重新播放动画
    toast.offsetHeight;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 复制到剪贴板（支持 HTTP 环境的 fallback）
  async function copyToClipboard(text) {
    // 优先尝试现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        showToast('已复制到剪贴板', 'success');
        return;
      } catch (err) {
        // 继续尝试 fallback
      }
    }
    
    // Fallback: 使用 execCommand（支持 HTTP 环境）
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999); // 移动端支持
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (success) {
        showToast('已复制到剪贴板', 'success');
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err) {
      // 最后的 fallback：让用户手动复制
      showToast(`请手动复制: ${text}`, 'info');
    }
  }

  // 执行快捷指令
  async function executeCommand(action) {
    showToast('正在执行...', 'info');
    
    switch (action) {
      case 'restart':
        showToast('请在终端执行: openclaw gateway restart', 'info');
        break;
      case 'clear-cache':
        showToast('请在终端执行: rm -rf ~/.openclaw/cache', 'info');
        break;
      case 'check-update':
        try {
          const res = await fetch('https://registry.npmjs.org/@qingchencloud/openclaw-zh/latest');
          const data = await res.json();
          showToast(`最新版本: ${data.version}`, 'success');
        } catch (e) {
          showToast('无法检查更新，请检查网络', 'error');
        }
        break;
      case 'restore-original':
        showToast('请在终端执行:\nnpm uninstall -g @qingchencloud/openclaw-zh\nnpm install -g openclaw', 'info');
        break;
      case 'fix-common':
        showToast('一键修复功能开发中...', 'info');
        break;
      default:
        showToast('未知操作', 'error');
    }
  }

  // 打开面板
  function openPanel() {
    const overlay = document.getElementById('feature-panel-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  // 关闭面板
  function closePanel() {
    const overlay = document.getElementById('feature-panel-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  // 切换 Tab
  function switchTab(tab) {
    activeTab = tab;
    
    // 更新 Tab 按钮状态
    document.querySelectorAll('.panel-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // 更新内容
    const content = document.getElementById('panel-content');
    if (content) {
      content.innerHTML = renderTabContent(tab);
      bindContentEvents();
    }
  }

  // 切换 FAQ 展开状态
  function toggleFaq(item) {
    item.classList.toggle('expanded');
  }

  // 绑定内容区事件
  function bindContentEvents() {
    // FAQ 折叠
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleFaq(btn.closest('.faq-item'));
      });
    });

    // 快捷指令
    document.querySelectorAll('.command-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        executeCommand(btn.dataset.action);
      });
    });

    // 复制安装命令
    document.querySelectorAll('.plugin-install').forEach(el => {
      el.addEventListener('click', () => {
        copyToClipboard(el.dataset.copy);
      });
    });
  }

  // 初始化面板
  function initPanel() {
    // 检查是否已经初始化
    if (document.getElementById('feature-panel-overlay')) {
      return;
    }

    // 查找入口按钮位置（TopBar 健康状态旁边）
    const topbarStatus = document.querySelector('.topbar-status');
    if (!topbarStatus) {
      // 如果找不到，稍后重试
      setTimeout(initPanel, 1000);
      return;
    }

    // 创建入口按钮
    const trigger = document.createElement('button');
    trigger.className = 'panel-trigger';
    trigger.title = '功能面板';
    trigger.setAttribute('aria-label', '打开功能面板');
    trigger.innerHTML = ICONS.gear;
    trigger.addEventListener('click', openPanel);

    // 插入到 topbar-status 开头
    topbarStatus.insertBefore(trigger, topbarStatus.firstChild);

    // 创建面板
    const panelContainer = document.createElement('div');
    panelContainer.innerHTML = createPanelHTML();
    document.body.appendChild(panelContainer.firstElementChild);

    // 绑定事件
    document.getElementById('panel-close').addEventListener('click', closePanel);
    
    // 点击遮罩关闭
    document.getElementById('feature-panel-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'feature-panel-overlay') {
        closePanel();
      }
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePanel();
      }
    });

    // Tab 切换
    document.querySelectorAll('.panel-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });

    // 绑定内容区事件
    bindContentEvents();

    console.log('[OpenClaw 汉化版] 功能面板已加载');
  }

  // 全局标记，防止重复初始化
  let panelInitialized = false;
  let observer = null;

  // 带防抖的初始化包装器
  let initTimeout = null;
  function debouncedInit() {
    if (panelInitialized) return;
    if (initTimeout) clearTimeout(initTimeout);
    initTimeout = setTimeout(() => {
      if (!panelInitialized && !document.querySelector('.panel-trigger') && document.querySelector('.topbar-status')) {
        initPanel();
        panelInitialized = true;
        // 初始化成功后断开 observer
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }
    }, 100);
  }

  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', debouncedInit);
  } else {
    // DOM 已加载，但可能 Dashboard 还没渲染完成
    setTimeout(debouncedInit, 500);
  }

  // 如果 Dashboard 是 SPA，监听路由变化后重新初始化
  // 只在未初始化时创建 observer
  if (!panelInitialized && !observer) {
    observer = new MutationObserver((mutations) => {
      debouncedInit();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

})();
