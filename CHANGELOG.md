# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

**Language / 语言 / 語言**: [English](#english) | [简体中文](#简体中文) | [繁體中文](#繁體中文)

---

## 简体中文

### [1.4.0] - 2026-09-17

#### ✨ 新增功能
- 🚀 **迁移至 Cloudflare Pages** - 主部署切换到自定义域名，GitHub Pages 保留为兼容构建
- 🎯 **最大宽度自定义输入** - 支持自定义整数像素值
- 🔍 **SEO 审计修复** - 添加 sitemap.xml 与 robots.txt、canonical、meta/OG、结构化数据、缓存与 404 页

#### 🛠️ 技术改进
- 统一扁平 icon button token，重写 DESIGN.md 对齐实际代码
- 清理 GEMINI_API_KEY 死配置，补充项目结构文档
- 精简 _headers，避免与 Pages 默认头重复

---

### [1.3.1] - 2026-04-27

#### 🐛 Bug 修复
- 修复 favicon 与资源路径在 GitHub Pages 子路径下的部署问题

#### 🎨 界面优化
- README 按语言拆分为三份，更新 logo 与 UI 细节
- Header 的 GitHub 文字链接替换为 SVG 图标并适配暗色模式

---

### [1.3.0] - 2026-02-15

#### 🐛 Bug 修复
- 修复移动端"节省"空间显示 NaN 问题
- 添加 PNG/WebP 格式的浏览器支持检测和自动降级处理
- 优化 formatFileSize 函数，处理 undefined/null/NaN 情况

#### 🎨 界面优化
- 移动端统计信息改为上下布局，更适合窄屏幕显示
- 移除已完成状态的重复徽章显示

#### 🛠️ 技术改进
- 统一使用 utils/helpers.ts 中的 formatFileSize 函数
- 改进压缩器错误处理和降级逻辑

---

### [1.2.0] - 2026-02-10

#### ✨ 新增功能
- 🎨 **深色/浅色主题切换** - 支持手动切换和系统偏好自动切换

#### 🐛 Bug 修复
- 使用 JSZip 进行批量下载，避免浏览器下载数量限制

---

### [1.1.0] - 2026-01-26

#### 🐛 Bug 修复
- 提高了图片质量默认值从 80% 到 90%，以获得更好的压缩效果

---

### [0.1.0] - 2026-01-13

#### ✨ 新增功能
- 🎨 **图片质量进度条** - 添加了带高亮选中部分的进度条样式，根据质量值显示不同颜色（绿色/黄色/红色）
- 🎯 **实时预览对比** - 支持拖拽竖直分割线对比原图和压缩后的图片
- 🌍 **多语言支持** - 支持英文、简体中文和繁体中文，默认简体中文
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- ⚡ **批量处理** - 支持同时压缩多张图片

#### 🎨 界面优化
- 优化了图片质量设置的交互体验，添加悬停和拖拽反馈效果
- 改进了预览对比界面的视觉效果和交互体验
- 更新了 Header 中的文档和 GitHub 链接

#### 🛠️ 技术改进
- 基于 React 19.2.3 和 TypeScript 5.8.2 构建
- 使用 Vite 6.2.0 作为构建工具
- 采用 Tailwind CSS 进行样式设计
- 配置 GitHub Pages 自动部署
- 添加 GitHub Actions 工作流实现 CI/CD

---

## English

### [1.4.0] - Sep 17, 2026

#### ✨ New Features
- 🚀 **Migrated to Cloudflare Pages** - Primary deployment moved to a custom domain; GitHub Pages kept as a compatibility build
- 🎯 **Custom max-width input** - Arbitrary integer pixel values supported
- 🔍 **SEO audit fixes** - Added sitemap.xml & robots.txt, canonical, meta/OG, structured data, caching and 404 page

#### 🛠️ Technical Improvements
- Unified flat icon button token; rewrote DESIGN.md to match the code
- Removed dead GEMINI_API_KEY config; documented project structure
- Trimmed _headers to avoid duplicating Pages defaults

---

### [1.3.1] - Apr 27, 2026

#### 🐛 Bug Fixes
- Fixed favicon and asset paths under the GitHub Pages sub-path

#### 🎨 UI Improvements
- Split README by language; refreshed logo and UI details
- Replaced the Header GitHub text link with an SVG icon adapted to dark mode

---

### [1.3.0] - Feb 15, 2026

#### 🐛 Bug Fixes
- Fixed "saved space" showing NaN on mobile devices
- Added browser support detection and fallback for PNG/WebP formats
- Improved formatFileSize to handle undefined/null/NaN

#### 🎨 UI Improvements
- Changed stats layout to vertical stack on mobile for better display
- Removed duplicate "done" status badge

#### 🛠️ Technical Improvements
- Unified formatFileSize usage from utils/helpers.ts
- Improved compressor error handling and fallback logic

---

### [1.2.0] - Feb 10, 2026

#### ✨ New Features
- 🎨 **Dark/Light Theme Toggle** - Support manual toggle and system preference

#### 🐛 Bug Fixes
- Use JSZip for batch download to avoid browser download limits

---

### [1.1.0] - Jan 26, 2026

#### 🐛 Bug Fixes
- Increased default image quality from 80% to 90% for better compression results

---

### [0.1.0] - Jan 13, 2026

#### ✨ New Features
- 🎨 **Image Quality Progress Bar** - Added progress bar style with highlighted selected portion, displaying different colors based on quality value (green/yellow/red)
- 🎯 **Real-time Preview Comparison** - Support dragging vertical split line to compare original and compressed images
- 🌍 **Multi-language Support** - Support for English, Simplified Chinese, and Traditional Chinese, defaulting to Simplified Chinese
- 📱 **Responsive Design** - Perfect adaptation for desktop and mobile devices
- ⚡ **Batch Processing** - Support compressing multiple images simultaneously

#### 🎨 UI Improvements
- Optimized image quality settings interaction experience with hover and drag feedback effects
- Improved visual effects and interaction experience of preview comparison interface
- Updated documentation and GitHub links in Header

#### 🛠️ Technical Improvements
- Built with React 19.2.3 and TypeScript 5.8.2
- Using Vite 6.2.0 as build tool
- Styled with Tailwind CSS
- Configured GitHub Pages automatic deployment
- Added GitHub Actions workflow for CI/CD

---

## 繁體中文

### [1.4.0] - 2026-09-17

#### ✨ 新增功能
- 🚀 **遷移至 Cloudflare Pages** - 主部署切換到自訂網域，GitHub Pages 保留為相容構建
- 🎯 **最大寬度自訂輸入** - 支援自訂整數像素值
- 🔍 **SEO 稽核修復** - 新增 sitemap.xml 與 robots.txt、canonical、meta/OG、結構化資料、快取與 404 頁

#### 🛠️ 技術改進
- 統一扁平 icon button token，重寫 DESIGN.md 對齊實際程式碼
- 清理 GEMINI_API_KEY 死配置，補充專案結構文件
- 精簡 _headers，避免與 Pages 預設頭重複

---

### [1.3.1] - 2026-04-27

#### 🐛 Bug 修復
- 修復 favicon 與資源路徑在 GitHub Pages 子路徑下的部署問題

#### 🎨 介面優化
- README 按語言拆分為三份，更新 logo 與 UI 細節
- Header 的 GitHub 文字連結替換為 SVG 圖示並適配暗色模式

---

### [1.3.0] - 2026-02-15

#### 🐛 Bug 修復
- 修復行動端「節省」空間顯示 NaN 問題
- 添加 PNG/WebP 格式的瀏覽器支援檢測和自動降級處理
- 優化 formatFileSize 函數，處理 undefined/null/NaN 情況

#### 🎨 介面優化
- 行動端統計資訊改為上下佈局，更適合窄螢幕顯示
- 移除已完成狀態的重複徽章顯示

#### 🛠️ 技術改進
- 統一使用 utils/helpers.ts 中的 formatFileSize 函數
- 改進壓縮器錯誤處理和降級邏輯

---

### [1.2.0] - 2026-02-10

#### ✨ 新增功能
- 🎨 **深色/淺色主題切換** - 支援手動切換和系統偏好自動切換

#### 🐛 Bug 修復
- 使用 JSZip 進行批次下載，避免瀏覽器下載數量限制

---

### [1.1.0] - 2026-01-26

#### 🐛 Bug 修復
- 提高了圖片品質預設值從 80% 到 90%，以獲得更好的壓縮效果

---

### [0.1.0] - 2026-01-13

#### ✨ 新增功能
- 🎨 **圖片品質進度條** - 新增了帶高亮選中部分的進度條樣式，根據品質值顯示不同顏色（綠色/黃色/紅色）
- 🎯 **即時預覽對比** - 支援拖曳豎直分割線對比原圖和壓縮後的圖片
- 🌍 **多語言支援** - 支援英文、簡體中文和繁體中文，預設簡體中文
- 📱 **響應式設計** - 完美適配桌面端和行動裝置
- ⚡ **批次處理** - 支援同時壓縮多張圖片

#### 🎨 介面優化
- 優化了圖片品質設定的互動體驗，新增懸停和拖曳回饋效果
- 改進了預覽對比介面的視覺效果和互動體驗
- 更新了 Header 中的文件和 GitHub 連結

#### 🛠️ 技術改進
- 基於 React 19.2.3 和 TypeScript 5.8.2 構建
- 使用 Vite 6.2.0 作為構建工具
- 採用 Tailwind CSS 進行樣式設計
- 配置 GitHub Pages 自動部署
- 新增 GitHub Actions 工作流程實現 CI/CD