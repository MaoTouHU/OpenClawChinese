<a id="top"></a>

# OpenClaw 汉化发行版

 [![npm](https://img.shields.io/npm/v/@qingchencloud/openclaw-zh?label=npm)](https://www.npmjs.com/package/@qingchencloud/openclaw-zh)
 [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **每小时自动同步** [OpenClaw](https://github.com/openclaw/openclaw) 官方更新，汉化版延迟 < 1 小时！

 

<a id="toc"></a>

 

## 目录

[什么是 OpenClaw？](#what-is-openclaw) ·
[🎁 免费AI接口](#free-ai) ·
[4 步上手](#quickstart) ·
[汉化效果预览](#preview) ·
[常用命令](#commands) ·
[网关重启](#gateway-restart) ·
[卸载教程](#uninstall) ·
[更新升级](#upgrade) ·
[Docker 部署](#docker) ·
[其他安装方式](#other-install) ·
[手机端 ClawApp](#mobile) ·
[常见问题](#faq) ·
[插件扩展](#plugins) ·
[社区交流](#community) ·
[相关链接](#links) ·
[参与贡献](#contributing) ·
[关于](#about)

**子文档导航：**

- **[安装指南](docs/INSTALL_GUIDE.md)** — [前提条件](docs/INSTALL_GUIDE.md#prerequisites) · [安装](docs/INSTALL_GUIDE.md#phase1-install) · [初始化配置](docs/INSTALL_GUIDE.md#phase2-config) · [验证运行](docs/INSTALL_GUIDE.md#phase3-verify) · [进阶配置](docs/INSTALL_GUIDE.md#phase4-advanced) · [模型配置](docs/INSTALL_GUIDE.md#model-config) · [守护进程](docs/INSTALL_GUIDE.md#daemon)
- **[Docker 部署指南](docs/DOCKER_GUIDE.md)** — [一键部署](docs/DOCKER_GUIDE.md#quick-deploy) · [本地启动](docs/DOCKER_GUIDE.md#local-start) · [远程部署](docs/DOCKER_GUIDE.md#remote-deploy) · [Token 认证](docs/DOCKER_GUIDE.md#remote-access) · [Nginx 反代](docs/DOCKER_GUIDE.md#nginx-https) · [Docker Compose](docs/DOCKER_GUIDE.md#docker-compose) · [错误排查](docs/DOCKER_GUIDE.md#troubleshoot)
- **[常见问题](docs/FAQ.md)** — [安装问题](docs/FAQ.md#install-issues) · [启动问题](docs/FAQ.md#startup-issues) · [Dashboard 连不上](docs/FAQ.md#dashboard-issues) · [内网/远程访问](docs/FAQ.md#network-issues) · [模型和对话](docs/FAQ.md#model-issues) · [其他问题](docs/FAQ.md#other-issues)
- **[贡献指南](docs/CONTRIBUTING.md)** — [环境准备](docs/CONTRIBUTING.md#setup) · [项目结构](docs/CONTRIBUTING.md#structure) · [添加新翻译](docs/CONTRIBUTING.md#add-translation) · [提交 PR](docs/CONTRIBUTING.md#submit-pr)
- **[翻译规范](docs/TRANSLATION_GUIDE.md)** — [术语表](docs/TRANSLATION_GUIDE.md#glossary) · [翻译原则](docs/TRANSLATION_GUIDE.md#principles) · [风格指南](docs/TRANSLATION_GUIDE.md#style-guide)

---

<a id="what-is-openclaw"></a>

## 什么是 OpenClaw？

[OpenClaw](https://openclaw.ai/) 是 GitHub 326,000+ Stars 的**开源个人 AI 助手平台**。它运行在你的电脑上，通过 WhatsApp、Telegram、Discord 等聊天应用与你的 AI 助手交互，帮你处理邮件、日历、文件等日常事务。

**本项目 = OpenClaw + 全中文界面**，CLI 命令行和 Dashboard 网页控制台均已深度汉化。

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="free-ai"></a>

## 🎁 免费 AI 接口

> **零成本接入主流 AI 模型！** 我们内部搭建的公益平台，无限 Token 流量，超级省钱！

 

**平台亮点：**

- **🆓 无限 Token 流量** — 不限调用次数，不限 Token 用量，真正零成本
- **🤖 主流模型全覆盖** — GPT-5.4、Claude、Gemini、DeepSeek 等热门模型开箱即用
- **⚡ 即开即用** — 注册即可获取 API Key，兼容 OpenAI 接口格式，无缝对接 OpenClaw
- **🔒 安全稳定** — 内部公益项目，长期维护，稳定可靠

**配合 OpenClaw 使用：**

 获取 API Key 后，初始化 OpenClaw 时选择 **OpenAI Compatible** 提供商，填入地址和 Key 即可。支持 GPT-5.4、Claude、Gemini、DeepSeek 等主流模型。

> 💡 **省钱小贴士**：搭配 OpenClaw 使用，相当于拥有了一个免费的私人 AI 助手，日常聊天、写代码、处理文档全部零成本！

 
<a id="partners"></a>

### 合作伙伴

 

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="ecosystem"></a>

## 🔥 生态工具
 

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="quickstart"></a>

## 4 步上手

> **前提条件**：需要 **Node.js >= 22**（[下载 Node.js](https://nodejs.org/)）
>
> 检查版本：`node -v`

### 第 1 步：安装

**方式一：独立安装包（推荐，零依赖，无需 Node.js/npm）**

- **Windows**: 下载 [.exe 安装向导](https://github.com/qingchencloud/openclaw-standalone/releases/latest)，双击即装
- **macOS / Linux / 树莓派**: curl -fsSL https://dl.qrj.ai/openclaw/install.sh | bash
- **全平台下载**: [GitHub Releases](https://github.com/qingchencloud/openclaw-standalone/releases/latest)

> 独立安装包自带 Node.js 运行时，下载解压即可使用，无需任何环境依赖。

**方式二：npm 安装（需要 Node.js 22+）**

```bash
npm install -g @qingchencloud/openclaw-zh@latest
```

### 第 2 步：初始化（推荐守护进程模式）

```bash
openclaw onboard --install-daemon
```

初始化向导会引导你完成：选择 AI 模型 → 配置 API 密钥 → 设置聊天通道

### 第 3 步：启动网关

```bash
openclaw gateway
```

### 第 4 步：打开控制台

```bash
openclaw dashboard
```

浏览器会自动打开全中文的 Dashboard 控制台。完成！

> 想了解每一步的详细说明？查看 **[详细安装指南](docs/INSTALL_GUIDE.md)**（包含 Node.js 安装、模型配置、守护进程、内网访问等）

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="preview"></a>

## 汉化效果预览

<p align="center">
  <img src="docs/image/5.png" alt="概览仪表板" width="100%">
  <br>
  <em>概览仪表板 - 网关状态、实例监控、快捷操作一目了然</em>
</p>

<details>
<summary><b>查看更多截图</b></summary>

<p align="center">
  <img src="docs/image/1.png" alt="对话界面" width="100%">
  <br>
  <em>对话界面 - 与 AI 助手实时交互</em>
</p>

<p align="center">
  <img src="docs/image/4.png" alt="渠道管理" width="100%">
  <br>
  <em>渠道管理 - WhatsApp、Telegram、Discord 等全平台支持</em>
</p>

<p align="center">
  <img src="docs/image/2.png" alt="配置中心" width="100%">
  <br>
  <em>配置中心 - 完整汉化</em>
</p>

<p align="center">
  <img src="docs/image/3.png" alt="节点配置" width="100%">
  <br>
  <em>节点配置 - 执行审批、安全策略管理</em>
</p>

<p align="center">
  <img src="docs/image/6.png" alt="技能插件" width="100%">
  <br>
  <em>技能插件 - 1Password、Apple Notes 等丰富扩展</em>
</p>

</details>

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="commands"></a>

## 常用命令

```bash
openclaw                    # 启动 OpenClaw
openclaw onboard            # 初始化向导
openclaw dashboard          # 打开网页控制台
openclaw config             # 查看/修改配置
openclaw skills             # 管理技能
openclaw --help             # 查看帮助

# 网关管理
openclaw gateway run        # 前台运行（挂终端，用于调试）
openclaw gateway start      # 后台守护进程（不挂终端，推荐！）
openclaw gateway stop       # 停止网关
openclaw gateway restart    # 重启网关
openclaw gateway status     # 查看网关状态
openclaw gateway install    # 安装为系统服务（开机自启）

# 常用操作
openclaw update             # 检查并更新 CLI
openclaw doctor             # 诊断问题（自动修复）
```

> **Windows 用户注意**：如果 `gateway install` 失败（提示 schtasks 不可用），可使用 `gateway start` 启动后台进程，或使用 Docker 部署方案。

> **Dashboard 语言设置**：首次打开网页控制台后，前往 **Overview** 页面底部，将 **Language** 切换为 **简体中文 (Simplified Chinese)**，即可显示中文界面。设置后刷新页面生效。

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="gateway-restart"></a>

## 网关重启

```bash
# 方式 1：使用 gateway 子命令（推荐）
openclaw gateway restart

# 方式 2：先停止再启动
openclaw gateway stop
openclaw gateway start

# 方式 3：守护进程模式（后台运行，不挂终端）
openclaw daemon start       # 启动后台守护
openclaw daemon stop        # 停止守护
openclaw daemon restart    # 重启守护
openclaw daemon status     # 查看状态

# Docker 容器重启
docker restart openclaw
```

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="uninstall"></a>

## 卸载教程

### CLI 卸载

```bash
# 卸载汉化版
npm uninstall -g @qingchencloud/openclaw-zh

# 如果之前安装过原版，也一并卸载
npm uninstall -g openclaw
```

### 数据清理（可选）

```bash
# 删除配置和缓存（不可恢复！）
rm -rf ~/.openclaw

# Docker 清理
docker rm -f openclaw                # 删除容器
docker volume rm openclaw-data       # 删除数据卷
```

### 守护进程卸载

```bash
# macOS
launchctl unload ~/Library/LaunchAgents/com.openclaw.plist
rm ~/Library/LaunchAgents/com.openclaw.plist

# Linux (systemd)
sudo systemctl stop openclaw
sudo systemctl disable openclaw
sudo rm /etc/systemd/system/openclaw.service
sudo systemctl daemon-reload
```

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="upgrade"></a>

## 更新升级

```bash
npm update -g @qingchencloud/openclaw-zh
```

> 查看当前版本：`openclaw --version`

| 版本 | 安装命令 | 说明 |
|------|----------|------|
| **稳定版** | `npm install -g @qingchencloud/openclaw-zh@latest` | 经过测试，推荐使用 |
| **最新版** | `npm install -g @qingchencloud/openclaw-zh@nightly` | 每小时同步上游，体验新功能 |

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="docker"></a>

## Docker 部署（国内推荐）

> **国内用户强烈推荐使用 Docker Hub 镜像**，拉取速度快，无需翻墙！

| 镜像源 | 拉取命令 | 适用 |
|--------|----------|------|
| **Docker Hub（国内推荐）** | `docker pull 1186258278/openclaw-zh:latest` | 国内用户 |
| GitHub Container Registry | `docker pull ghcr.io/1186258278/openclaw-zh:latest` | 海外用户 |

### 一键部署（最简单）

```bash
# Linux/macOS — 加 --china 自动使用国内镜像
curl -fsSL https://cdn.jsdelivr.net/gh/1186258278/OpenClawChineseTranslation@main/docker-deploy.sh | bash -s -- --china
```

```powershell
# Windows PowerShell — 加 -China 自动使用国内镜像
irm https://cdn.jsdelivr.net/gh/1186258278/OpenClawChineseTranslation@main/docker-deploy.ps1 | iex
# 或: .\docker-deploy.ps1 -China
```

### 手动 Docker 部署

```bash
# 国内用户使用 Docker Hub 镜像
IMAGE=1186258278/openclaw-zh:latest
# 海外用户使用: IMAGE=ghcr.io/1186258278/openclaw-zh:latest

# 1. 初始化（首次运行）
# Docker 需要交互式运行来配置 AI 模型和 API 密钥
docker run --rm -it -v openclaw-data:/root/.openclaw $IMAGE openclaw onboard

# 按向导完成：选择模型 → 配置 API 密钥 → 设置聊天通道

# 2. 配置网关模式
docker run --rm -v openclaw-data:/root/.openclaw $IMAGE openclaw config set gateway.mode local

# 3. 启动（守护进程模式，容器会一直运行）
docker run -d --name openclaw -p 18789:18789 \
  -v openclaw-data:/root/.openclaw --restart unless-stopped \
  $IMAGE openclaw gateway run
```

**参数说明：**
- `-d`: 后台运行（守护进程模式）
- `--name openclaw`: 给容器取名，方便管理
- `-p 18789:18789`: 端口映射
- `--restart unless-stopped`: 除非手动停止，否则一直运行
- `openclaw gateway run`: 启动网关（容器启动命令）

访问：`http://localhost:18789`

> 完整指南（远程部署、Nginx 反代、Docker Compose、内网访问等）请查看 **[Docker 部署指南](docs/DOCKER_GUIDE.md)**

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="other-install"></a>

## 其他安装方式

<details>
<summary><b>一键安装脚本（npm）</b></summary>

**Linux / macOS：**
```bash
curl -fsSL -o install.sh https://cdn.jsdelivr.net/gh/1186258278/OpenClawChineseTranslation@main/install.sh && bash install.sh
```

**Windows PowerShell：**
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/1186258278/OpenClawChineseTranslation@main/install.ps1" -OutFile "install.ps1" -Encoding UTF8; powershell -ExecutionPolicy Bypass -File ".\install.ps1"
```

> 如遇中文乱码，直接用 npm 安装：`npm install -g @qingchencloud/openclaw-zh@latest`

</details>

<details>
<summary><b>npm 国内加速安装</b></summary>

```bash
# 使用 npmmirror 镜像源（国内推荐）
npm install -g @qingchencloud/openclaw-zh@latest --registry=https://registry.npmmirror.com

# 或全局设置镜像源后再安装
npm config set registry https://registry.npmmirror.com
npm install -g @qingchencloud/openclaw-zh@latest
```

</details>

<details>
<summary><b>pnpm / yarn 安装</b></summary>

```bash
# pnpm
pnpm add -g @qingchencloud/openclaw-zh@latest

# yarn
yarn global add @qingchencloud/openclaw-zh@latest
```

</details>

<details>
<summary><b>Git 克隆加速</b></summary>

```bash
# 方案 1: 使用 GitHub 代理
git clone https://ghproxy.net/https://github.com/1186258278/OpenClawChineseTranslation.git

# 方案 2: 无需 git，直接用 npx 运行
npx @qingchencloud/openclaw-zh@latest
```

</details>

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="mobile"></a>

 
<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="faq"></a>

## 常见问题

### Top 3 高频问题

<details open>
<summary><b>❶ 安装卡住 / 下载慢</b></summary>

**原因**：npm 默认从国外源下载，国内网络可能很慢。

**解决**：加 `--registry` 参数使用国内镜像源，或直接用 Docker 部署：
```bash
# 方案 1：npm 加镜像源
npm install -g @qingchencloud/openclaw-zh@latest --registry=https://registry.npmmirror.com

# 方案 2：用 Docker（国内最快）
docker pull 1186258278/openclaw-zh:latest
```

> [详细说明 →](docs/FAQ.md#install-slow)

</details>

<details open>
<summary><b>❷ 安装后还是英文界面</b></summary>

**原因**：系统上还残留了英文原版 `openclaw`，它的优先级高于汉化版。

**解决**：先卸载原版，再重装汉化版：
```bash
npm uninstall -g openclaw
npm install -g @qingchencloud/openclaw-zh@latest
```

验证：`openclaw --version` 输出应包含 `-zh` 后缀。

> [详细说明 →](docs/FAQ.md#still-english)

</details>

<details open>
<summary><b>❸ 打开 Dashboard 报 `pairing required` 或 `token mismatch`</b></summary>

**原因**：OpenClaw 的安全机制要求设备配对或 Token 验证。

**解决**：

```bash
# token mismatch —— 用 dashboard 命令自动带 Token 打开：
openclaw dashboard

# pairing required —— 批准设备：
openclaw devices list           # 查看待批准设备 ID
openclaw devices approve <ID>   # 批准该设备

# Docker 用户如果无法运行 CLI，可以一键关闭设备认证：
docker run --rm -v openclaw-data:/root/.openclaw \
  1186258278/openclaw-zh:latest \
  openclaw config set gateway.controlUi.dangerouslyDisableDeviceAuth true
# 然后重启容器
```

> [token mismatch 详细说明 →](docs/FAQ.md#token-mismatch) | [pairing required 详细说明 →](docs/FAQ.md#pairing-required)

</details>

### 其他常见问题

| 问题 | 快速解决 | 详情 |
|------|----------|------|
| **安装报 `Permission denied (publickey)`** | `git config --global url."https://github.com/".insteadOf ssh://git@github.com/` | [查看 →](docs/FAQ.md#permission-denied) |
| **远程 / 内网访问不了** | `openclaw config set gateway.bind lan` 然后重启 | [查看 →](docs/FAQ.md#lan-access) |
| **镜像源版本落后** | 去掉 `--registry` 参数直接安装，或等待镜像同步（已自动触发） | [#32](https://github.com/1186258278/OpenClawChineseTranslation/issues/32) |
| **`Missing config`** | 运行 `openclaw onboard` 初始化配置 | [查看 →](docs/FAQ.md#missing-config) |
| **`Missing workspace template`** | 升级到最新版即可：`npm install -g @qingchencloud/openclaw-zh@latest` | [查看 →](docs/FAQ.md#missing-workspace-template-agentsmd) |
| **Ollama 无响应** | 检查 baseURL 是否为 `http://localhost:11434/v1` | [查看 →](docs/FAQ.md#ollama-no-response) |
| **Docker 容器启动后退出** | 确保启动命令包含 `openclaw gateway run` | [查看 →](docs/DOCKER_GUIDE.md#troubleshoot) |
| **Docker 打不开 Dashboard** | 设置 `gateway.bind lan` 监听所有网卡 | [查看 →](docs/DOCKER_GUIDE.md#troubleshoot) |

> **[完整排查手册 (25+ 个问题)](docs/FAQ.md)** | **[Docker 问题排查](docs/DOCKER_GUIDE.md#troubleshoot)**

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="plugins"></a>

## 插件扩展

```bash
# 安装更新检测插件
npm install -g @qingchencloud/openclaw-updater
```

访问 [插件市场](https://openclaw.qt.cool/) 获取更多插件。

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="community"></a>

## 社区交流

 
 
 
### 微信交流群

 

 

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="links"></a>

## 相关链接

| 汉化版 | 上游项目 |
|--------|----------|
| [npm 包](https://www.npmjs.com/package/@qingchencloud/openclaw-zh) | [OpenClaw GitHub](https://github.com/openclaw/openclaw) |
 

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="contributing"></a>

## 参与贡献

- [报告问题](https://github.com/1186258278/OpenClawChineseTranslation/issues) | [改进翻译](docs/CONTRIBUTING.md) | [翻译规范](docs/TRANSLATION_GUIDE.md) | 给项目点个 Star

<p align="right"><a href="#top">回到顶部</a></p>

---

<a id="about"></a>


<p align="right"><a href="#top">回到顶部</a></p>

<!-- AI Translation Tools: Claude, Copilot, Codex, Devin, Amazon Q, CodeRabbit -->
