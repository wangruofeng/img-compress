<div align="center">

<img src="/logo.svg" alt="ImgCompress Logo" width="120" height="120" />

# ImgCompress

**一个安全、快速、完全在浏览器中运行的图片压缩工具**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**🌐 [在线演示](https://wangruofeng.github.io/img-compress/) | [GitHub 仓库](https://github.com/wangruofeng/img-compress)**

**语言 / Language**: [English](README.md) | **简体中文** | [繁體中文](README.zh-TW.md)

</div>

---

### ✨ 特性

- 🔒 **完全客户端处理** - 所有图片处理都在浏览器中完成，不会上传到任何服务器，保护您的隐私
- 🎨 **实时预览对比** - 支持拖拽分割线对比原图和压缩后的图片效果
- 🎯 **图片质量进度条** - 带高亮选中部分的进度条，根据质量值显示不同颜色（绿色/黄色/红色）
- 🚀 **批量处理** - 支持同时压缩多张图片，提高工作效率
- 🎛️ **灵活配置** - 可自定义图片质量、输出格式和最大宽度
- 🌍 **多语言支持** - 支持英文、简体中文和繁体中文，默认简体中文
- 💾 **格式转换** - 支持 JPG、PNG、WebP 格式之间的转换
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- ⚡ **高性能** - 基于 Canvas API，压缩速度快，资源占用低
- 🌐 **在线访问** - 已部署到 GitHub Pages，可直接在线使用
- 🌙 **深色/浅色模式** - 支持深色和浅色主题切换，主题偏好自动保存

### 🎬 功能演示

#### 主要功能
- **拖拽上传** - 支持点击或拖拽图片文件
- **实时压缩** - 上传后自动开始压缩处理
- **对比预览** - 点击预览按钮，通过拖拽分割线对比压缩效果
- **批量下载** - 一键下载所有压缩后的图片

#### 预览对比功能
预览界面支持通过拖拽竖直分割线来对比原图和压缩后的图片：
- 分割线左侧显示压缩后的图片
- 分割线右侧显示原图
- 默认分割线位于中间位置（50%）
- 支持鼠标和触摸拖拽操作

### 🚀 快速开始

#### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm 或 yarn

#### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/wangruofeng/img-compress.git
   cd img-compress
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run start
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

5. **预览生产构建**
   ```bash
   npm run preview
   ```

### 📖 使用说明

#### 基本使用

1. **上传图片**
   - 点击上传区域或直接拖拽图片文件
   - 支持 JPG、PNG、WebP 格式
   - 可同时上传多张图片

2. **调整压缩设置**
   - **图片质量**：选择高、中、低质量，或自定义质量值（0.1-1.0）
   - **输出格式**：选择 JPEG、PNG 或 WebP
   - **最大宽度**：设置图片的最大宽度（像素）

3. **预览和下载**
   - 点击图片卡片上的预览按钮查看对比效果
   - 拖拽分割线调整对比位置
   - 点击下载按钮保存压缩后的图片
   - 使用"下载全部"按钮批量下载

#### 压缩设置说明

- **JPEG**：最适合照片，文件体积小，但不支持透明背景
- **PNG**：支持透明背景，适合图标和图形，但文件体积较大
- **WebP**：现代格式，体积最小，质量最好，但部分旧浏览器不支持

### 🛠️ 技术栈

- **前端框架**: React 19.2.3
- **开发语言**: TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **UI 图标**: Lucide React
- **样式方案**: Tailwind CSS（通过 Vite 配置）

### 📁 项目结构

```
img-compress/
├── components/          # React 组件
│   ├── Dropzone.tsx    # 文件上传组件
│   ├── Header.tsx      # 页面头部
│   ├── ImageCard.tsx   # 图片卡片组件
│   ├── PreviewModal.tsx # 预览对比模态框
│   ├── SettingsPanel.tsx # 设置面板
│   └── Icon.tsx        # 图标组件
├── contexts/           # React Context
│   └── LanguageContext.tsx # 多语言上下文
├── locales/           # 国际化文件
│   └── translations.ts # 翻译文本
├── utils/             # 工具函数
│   ├── compressor.ts  # 图片压缩逻辑
│   └── helpers.ts     # 辅助函数
├── types.ts           # TypeScript 类型定义
├── App.tsx            # 主应用组件
├── index.tsx          # 应用入口
└── vite.config.ts     # Vite 配置
```

### 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork 本仓库**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **开启 Pull Request**

#### 贡献建议

- 🐛 修复 Bug
- ✨ 添加新功能
- 📝 改进文档
- 🎨 优化 UI/UX
- 🌍 添加更多语言支持
- ⚡ 性能优化

### 📝 开发说明

#### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 组件采用函数式组件
- 使用 Tailwind CSS 进行样式设计

#### 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

### 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

### 🙏 致谢

- [React](https://reactjs.org/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Lucide React](https://lucide.dev/) - 图标库
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - 图片处理

### 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 📮 提交 [Issue](https://github.com/wangruofeng/img-compress/issues)
- 💬 开启 [Discussion](https://github.com/wangruofeng/img-compress/discussions)

### 📋 Changelog

详细的更新日志请查看 [CHANGELOG.md](CHANGELOG.md)。

---

<div align="center">

**如果这个项目对您有帮助，请给个 ⭐ Star！**

Made with ❤️ by ImgCompress Contributors

<a href="https://github.com/wangruofeng/img-compress/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wangruofeng/img-compress" alt="Contributors" />
</a>

</div>
