<div align="center">

<img src="public/logo.svg" alt="ImgCompress Logo" width="120" height="120" />

# ImgCompress

**A safe, fast, fully browser-based image compression tool**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**🌐 [Live Demo](https://img-compress.wangruofeng007.com/) | [GitHub Repository](https://github.com/wangruofeng/img-compress)**

**Language / 语言 / 語言**: **English** | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

</div>

---

### ✨ Features

- 🔒 **Fully Client-Side Processing** - All image processing happens in your browser, no uploads to any server, protecting your privacy
- 🎨 **Real-time Preview Comparison** - Drag a split line to compare original and compressed images
- 🎯 **Image Quality Progress Bar** - Progress bar with highlighted selected portion, displaying different colors based on quality value (green/yellow/red)
- 🚀 **Batch Processing** - Compress multiple images simultaneously
- 🎛️ **Flexible Configuration** - Customize image quality, output format, and max width
- 🌍 **Multi-language Support** - English, Simplified Chinese, and Traditional Chinese, defaulting to Simplified Chinese
- 💾 **Format Conversion** - Convert static images between JPG, PNG, WebP, and AVIF
- 📱 **Responsive Design** - Perfect for desktop and mobile devices
- ⚡ **High Performance** - Canvas and on-demand WebAssembly codecs run locally in the browser
- 🌐 **Online Access** - Cloudflare Pages is the primary deployment target. GitHub Pages is available as a compatibility target.
- 🌙 **Dark/Light Mode** - Support for dark and light theme switching, theme preference saved automatically

### 🎬 Demo

[Watch the promo video (MP4)](docs/media/promo.mp4)

#### Main Features
- **Drag & Drop Upload** - Click or drag image files
- **Real-time Compression** - Automatic compression starts after upload
- **Comparison Preview** - Click preview button and drag split line to compare compression effects
- **Batch Download** - Download all compressed images with one click

#### Preview Comparison Feature

Switch between Original, Compare, and Compressed. In Compare, the original is on the left and the compressed image is on the right. Click or drag on the image to position the split, or use the arrow keys while the slider is focused. A checkerboard shows transparent areas.

### 🚀 Quick Start

#### Requirements

- Node.js >= 20.19.0 or >= 22.12.0
- npm or yarn

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wangruofeng/img-compress.git
   cd img-compress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### 📖 Usage

#### Basic Usage

1. **Upload Images**
   - Click the upload area or drag image files directly
   - Supports JPG, PNG, WebP, AVIF, SVG, GIF, and APNG. SVG, GIF, and APNG are optimized in their original formats. Animated WebP and AVIF are kept as-is.
   - Can upload multiple images simultaneously

2. **Adjust Compression Settings**
   - **Image Quality** — Adjust the quality slider (0.10–1.00)
   - **Output Format**: Choose JPEG, PNG, WebP, or AVIF for static raster images
   - **Max Width**: Set maximum width of images (pixels)
   - Lossless mode applies to static raster images and outputs lossless WebP, with PNG as a fallback. Max width still applies. The app keeps the source when the result is no smaller.

3. **Preview and Download**
   - Click preview button on image card to view comparison
   - Drag split line to adjust comparison position
   - Click download button to save compressed image
   - Use "Download All" button for batch download

#### Compression Settings

- **JPEG**: Best for photos, small file size, but doesn't support transparency
- **PNG**: Supports transparency, good for icons and graphics, but larger file size
- **WebP** — WebP supports transparency and offers lossy and lossless compression.
- **AVIF** — AVIF is available for static images and supports transparency.

### 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6
- **UI Icons**: Lucide React
- **Styling**: Tailwind CSS (via Vite config)

### 📁 Project Structure

```
img-compress/
├── components/          # React Components
│   ├── Dropzone.tsx    # File upload component
│   ├── Header.tsx      # Page header
│   ├── ImageCard.tsx   # Image card component
│   ├── PreviewModal.tsx # Preview comparison modal
│   ├── SettingsPanel.tsx # Settings panel
│   ├── LanguageSwitcher.tsx # Language switcher
│   ├── Onboarding.tsx  # Onboarding tips
│   └── Icon.tsx        # Icon component
├── contexts/           # React Context
│   ├── LanguageContext.tsx # Multi-language context
│   └── ThemeContext.tsx    # Dark/light theme context
├── locales/           # Internationalization files
│   └── translations.ts # Translation texts
├── utils/             # Utility functions
│   ├── compressor.ts  # Image compression logic
│   └── helpers.ts     # Helper functions
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── vite.config.ts     # Vite configuration
```

### 🤝 Contributing

We welcome all forms of contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

#### Contribution Suggestions

- 🐛 Fix bugs
- ✨ Add new features
- 📝 Improve documentation
- 🎨 Optimize UI/UX
- 🌍 Add more language support
- ⚡ Performance optimization

### 📝 Development

#### Code Standards

- Use TypeScript for type checking
- Follow React Hooks best practices
- Use functional components
- Use Tailwind CSS for styling

#### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 📄 License

This project is licensed under the [MIT License](LICENSE).

### 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide React](https://lucide.dev/) - Icon library
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Image processing

### 📧 Contact

If you have questions or suggestions, please contact us through:

- 📮 Submit an [Issue](https://github.com/wangruofeng/img-compress/issues)
- 💬 Start a [Discussion](https://github.com/wangruofeng/img-compress/discussions)

### 📋 Changelog

For detailed changelog, please see [CHANGELOG.md](CHANGELOG.md).

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

Made with ❤️ by ImgCompress Contributors

<a href="https://github.com/wangruofeng/img-compress/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wangruofeng/img-compress" alt="Contributors" />
</a>

</div>
