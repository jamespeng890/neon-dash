# ⚡ Neon Dash (霓虹冲刺)

> 一个基于 HTML5 Canvas 的赛博朋克风格无尽跑酷游戏。
> A Cyberpunk style endless runner game built with Vanilla JS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange.svg)
![PWA](https://img.shields.io/badge/PWA-Supported-purple.svg)

## 🎮 游戏介绍 (Introduction)

**Neon Dash** 是一个轻量级的网页游戏。玩家需要控制霓虹方块躲避不断下落的障碍物。游戏完全使用原生 JavaScript 编写，没有依赖任何庞大的游戏引擎，因此加载速度极快。

**[👉 点击这里在线试玩 (Play Demo)]([https://你的用户名.github.io/neon-dash/](https://ultradomain.shop/))**

## ✨ 特色功能 (Features)

* 🎨 **赛博朋克视觉**：酷炫的霓虹发光特效 (CSS3 + Canvas Glow)。
* 📱 **全平台适配**：完美支持 PC (键盘) 和 手机 (触摸) 操作。
* 🚀 **PWA 支持**：支持 **“添加到主屏幕”**，安装后体验接近原生 App。
* 📶 **离线游玩**：内置 Service Worker，断网状态下依然可以打开游戏。
* ⚡ **高性能**：基于 `requestAnimationFrame` 的 60FPS 流畅体验。

## 🕹️ 操作说明 (Controls)

| 平台 | 操作方式 | 说明 |
| :--- | :--- | :--- |
| **电脑 (PC)** | ⬅️ ➡️ 方向键 | 控制左右移动 |
| **手机 (Mobile)** | 点击屏幕左侧 / 右侧 | 点击屏幕的左右区域来移动 |

## 📲 如何安装 (PWA)

本游戏支持 **Progressive Web App (PWA)** 技术：

1.  **在手机上**：使用 Chrome/Safari 打开游戏网址 -> 点击分享或菜单 -> 选择 **"添加到主屏幕"**。
2.  **在电脑上**：使用 Chrome/Edge 打开 -> 点击地址栏右侧的 **安装图标**。
3.  安装后，游戏将以独立 App 窗口运行，无地址栏干扰，且支持离线启动。

## 🛠️ 本地运行 (Local Development)

如果你想在本地修改代码，请按照以下步骤操作：

1.  克隆仓库：
    ```bash
    git clone [https://github.com/你的用户名/neon-dash.git](https://github.com/你的用户名/neon-dash.git)
    ```
2.  进入目录：
    ```bash
    cd neon-dash
    ```
3.  启动本地服务器 (由于 PWA 安全限制，必须使用服务器环境运行)：
    * **Python 用户**: `python -m http.server`
    * **VS Code 用户**: 安装 "Live Server" 插件，右键 `index.html` 点击 "Open with Live Server"。

## 📝 目录结构

```text
neon-dash/
├── index.html      # 游戏入口 & UI 结构
├── style.css       # 样式 & 移动端适配
├── script.js       # 游戏核心逻辑 & 渲染循环
├── sw.js           # Service Worker (离线缓存控制)
├── manifest.json   # PWA 配置文件
├── icon.png        # 应用图标
└── README.md       # 项目说明文档
