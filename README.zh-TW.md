<div align="center">

<img src="public/logo.svg" alt="ImgCompress Logo" width="120" height="120" />

# ImgCompress

**一個安全、快速、完全在瀏覽器中執行的圖片壓縮工具**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**🌐 [線上演示](https://img-compress.wangruofeng007.com/) | [GitHub 倉庫](https://github.com/wangruofeng/img-compress)**

**語言 / Language**: [English](README.md) | [简体中文](README.zh-CN.md) | **繁體中文**

</div>

---

### ✨ 功能

- 🔒 **完全客戶端處理** - 所有圖片處理都在瀏覽器中完成，不會上傳到任何伺服器，保護您的隱私
- 🎨 **即時預覽對比** - 支援拖曳分割線對比原圖和壓縮後的圖片效果
- 🎯 **圖片品質進度條** - 帶高亮選中部分的進度條，根據品質值顯示不同顏色（綠色/黃色/紅色）
- 🚀 **批次處理** - 支援同時壓縮多張圖片，提高工作效率
- 🎛️ **靈活配置** - 可自訂圖片品質、輸出格式和最大寬度
- 🌍 **多語言支援** - 支援英文、簡體中文和繁體中文，預設簡體中文
- 💾 **格式轉換** - 支援靜態 JPG、PNG、WebP、AVIF 之間的轉換
- 📱 **響應式設計** - 完美適配桌面端和行動裝置
- ⚡ **高效能** - Canvas 和按需載入的 WebAssembly 編碼器均在瀏覽器本機執行
- 🌐 **線上訪問** - Cloudflare Pages 是主要部署目標，GitHub Pages 為相容部署目標。
- 🌙 **深色/淺色模式** - 支援深色和淺色主題切換，主題偏好自動儲存

### 🎬 功能演示

#### 主要功能
- **拖曳上傳** - 支援點擊或拖曳圖片檔案
- **即時壓縮** - 上傳後自動開始壓縮處理
- **對比預覽** - 點擊預覽按鈕，透過拖曳分割線對比壓縮效果
- **批次下載** - 一鍵下載所有壓縮後的圖片

#### 預覽對比功能

預覽可切換「原圖」「對比」「壓縮圖」。對比模式下，左側為原圖，右側為壓縮圖。可點擊或拖曳圖片移動分割線，聚焦滑桿後也可用方向鍵微調。棋盤格表示透明區域。

### 🚀 快速開始

#### 環境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm 或 yarn

#### 安裝步驟

1. **克隆倉庫**
   ```bash
   git clone https://github.com/wangruofeng/img-compress.git
   cd img-compress
   ```


2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run start
   ```

4. **構建生產版本**
   ```bash
   npm run build
   ```

5. **預覽生產構建**
   ```bash
   npm run preview
   ```

### 📖 使用說明

#### 基本使用

1. **上傳圖片**
   - 點擊上傳區域或直接拖曳圖片檔案
   - 支援 JPG、PNG、WebP、AVIF、SVG、GIF 和 APNG。SVG、GIF 和 APNG 按原格式最佳化，動態 WebP 和 AVIF 保留原始檔案。
   - 可同時上傳多張圖片

2. **調整壓縮設定**
   - **圖片品質**：拖曳畫質滑桿（0.10–1.00）
   - **輸出格式**：靜態點陣圖可選 JPEG、PNG、WebP 或 AVIF
   - **最大寬度**：設定圖片的最大寬度（像素）
   - 無損模式適用於靜態點陣圖，預設輸出無損 WebP，編碼失敗時回退為 PNG。最大寬度仍然生效。壓縮結果沒有更小時會保留原始檔案。

3. **預覽和下載**
   - 點擊圖片卡片上的預覽按鈕查看對比效果
   - 拖曳分割線調整對比位置
   - 點擊下載按鈕儲存壓縮後的圖片
   - 使用「下載全部」按鈕批次下載

#### 壓縮設定說明

- **JPEG**：最適合照片，檔案體積小，但不支援透明背景
- **PNG**：支援透明背景，適合圖示和圖形，但檔案體積較大
- **WebP** — WebP 支援透明背景，可進行有損或無損壓縮。
- **AVIF** — 靜態 AVIF 支援透明背景，可用於高壓縮率輸出。

### 🛠️ 技術棧

- **前端框架**: React 19.2.3
- **開發語言**: TypeScript 5.8.2
- **構建工具**: Vite 6
- **UI 圖示**: Lucide React
- **樣式方案**: Tailwind CSS（透過 Vite 配置）

### 📁 專案結構

```
img-compress/
├── components/          # React 元件
│   ├── Dropzone.tsx    # 檔案上傳元件
│   ├── Header.tsx      # 頁面標頭
│   ├── ImageCard.tsx   # 圖片卡片元件
│   ├── PreviewModal.tsx # 預覽對比模態框
│   ├── SettingsPanel.tsx # 設定面板
│   ├── LanguageSwitcher.tsx # 語言切換元件
│   ├── Onboarding.tsx  # 新手引導元件
│   └── Icon.tsx        # 圖示元件
├── contexts/           # React Context
│   ├── LanguageContext.tsx # 多語言上下文
│   └── ThemeContext.tsx    # 深色/淺色主題上下文
├── locales/           # 國際化檔案
│   └── translations.ts # 翻譯文字
├── utils/             # 工具函數
│   ├── compressor.ts  # 圖片壓縮邏輯
│   └── helpers.ts     # 輔助函數
├── types.ts           # TypeScript 類型定義
├── App.tsx            # 主應用元件
├── index.tsx          # 應用入口
└── vite.config.ts     # Vite 配置
```

### 🤝 貢獻指南

我們歡迎所有形式的貢獻！請遵循以下步驟：

1. **Fork 本倉庫**
2. **建立特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交變更** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **開啟 Pull Request**

#### 貢獻建議

- 🐛 修復 Bug
- ✨ 新增功能
- 📝 改進文件
- 🎨 優化 UI/UX
- 🌍 新增更多語言支援
- ⚡ 效能優化

### 📝 開發說明

#### 程式碼規範

- 使用 TypeScript 進行類型檢查
- 遵循 React Hooks 最佳實踐
- 元件採用函數式元件
- 使用 Tailwind CSS 進行樣式設計

#### 瀏覽器支援

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

### 📄 授權許可

本專案採用 [MIT License](LICENSE) 授權許可。

### 🙏 致謝

- [React](https://reactjs.org/) - UI 框架
- [Vite](https://vitejs.dev/) - 構建工具
- [Lucide React](https://lucide.dev/) - 圖示庫
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - 圖片處理

### 📧 聯絡方式

如有問題或建議，請透過以下方式聯絡：

- 📮 提交 [Issue](https://github.com/wangruofeng/img-compress/issues)
- 💬 開啟 [Discussion](https://github.com/wangruofeng/img-compress/discussions)

### 📋 更新日誌

詳細的更新日誌請查看 [CHANGELOG.md](CHANGELOG.md)。

---

<div align="center">

**如果這個專案對您有幫助，請給個 ⭐ Star！**

Made with ❤️ by ImgCompress Contributors

<a href="https://github.com/wangruofeng/img-compress/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wangruofeng/img-compress" alt="Contributors" />
</a>

</div>
