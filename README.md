# 🔧 Karam - All-in-One Smart File Utility Agent

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://rohan911438.github.io/karam-smart-file-agent/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![Karam Logo](logo-7833524_1280.webp)

> **A powerful, client-side file processing tool that handles ZIP archives, file analysis, and more - all without requiring any backend server!**

---

## 🌟 **Live Demo**

🚀 **[Try Karam Smart File Agent](https://rohan911438.github.io/karam-smart-file-agent/)**

🧪 **[Test Functionality](https://rohan911438.github.io/karam-smart-file-agent/test-page.html)**

---

## 📋 **Table of Contents**

- [Features](#-features)
- [Demo Screenshots](#-demo-screenshots)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ **Features**

### 🗂️ **File Processing**
- ✅ **ZIP Creation**: Create downloadable ZIP archives from multiple files
- ✅ **ZIP Extraction**: Extract and analyze ZIP file contents
- ✅ **File Information**: Display detailed metadata (size, type, modification date)
- ✅ **Drag & Drop**: Intuitive drag-and-drop file handling

### 🚀 **Technical Features**
- ✅ **100% Client-Side**: No backend server required - works entirely in your browser
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **Mobile Responsive**: Optimized for desktop and mobile devices
- ✅ **GitHub Pages Ready**: Deployed and hosted on GitHub Pages
- ✅ **TypeScript**: Type-safe development with full TypeScript support

### 🔧 **Upcoming Features**
- 🔧 **PDF Processing**: Merge, split, and manipulate PDF files
- 🔧 **Image Tools**: Resize, convert, and optimize images (AI/ML-powered enhancement)
- 🔧 **Audio Processing**: Basic audio file manipulation and conversion
- 🔧 **Batch Operations**: Process multiple files simultaneously

---

## 📸 **Demo Screenshots**

### Main Application Interface
```
┌─────────────────────────────────────────────┐
│  🔧 Karam - Smart File Utility Agent       │
├─────────────────────────────────────────────┤
│                                             │
│  📁 Drag & Drop Files Here                 │
│  ┌─────────────────────────────────────┐   │
│  │     Select or drop files here      │   │
│  │         to get started              │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Create ZIP] [Extract ZIP] [File Info]    │
│                                             │
└─────────────────────────────────────────────┘
```

### Features Overview
- **File Upload**: Intuitive drag-and-drop interface
- **Processing Options**: ZIP creation, extraction, and file analysis
- **Real-time Feedback**: Instant file information and processing status
- **Download Management**: Automatic download handling for created files

---

## 🚀 **Quick Start**

### Option 1: Use Online (Recommended)
Simply visit the live application:
```
https://rohan911438.github.io/karam-smart-file-agent/
```

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/rohan911438/karam-smart-file-agent.git

# Navigate to the frontend directory
cd karam-smart-file-agent/all_in_one_file_agent/frontend

# Install dependencies
npm install

# Start development server
npm start
```

---

## 🛠️ **Installation**

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Local Setup
```bash
# 1. Clone the repository
git clone https://github.com/rohan911438/karam-smart-file-agent.git
cd karam-smart-file-agent

# 2. Install frontend dependencies
cd all_in_one_file_agent/frontend
npm install

# 3. Start development server
npm start

# 4. Open browser and navigate to
# http://localhost:3000
```

### Production Build
```bash
# Build for production
npm run build

# Files will be generated in the build/ directory
# and automatically copied to docs/ for GitHub Pages
```

---

## 💡 **Usage**

### Basic File Operations

#### 1. Creating ZIP Archives
```javascript
// Select multiple files using the file input
// Or drag and drop files onto the interface
// Click "Create ZIP" to download the archive
```

#### 2. Extracting ZIP Files
```javascript
// Upload a ZIP file
// Click "Extract ZIP" to view contents
// File list and structure will be displayed
```

#### 3. File Information
```javascript
// Select any file
// Click "Get File Info" for detailed metadata:
// - File name and size
// - MIME type
// - Last modified date
// - Additional properties
```

### Advanced Usage

#### Programmatic API
```javascript
// Access the Karam File Agent API
const fileAgent = window.KaramFileAgent;

// Create ZIP from file list
const zipResult = await fileAgent.createZip(fileList);

// Extract ZIP contents
const extractResult = await fileAgent.extractZip(zipFile);

// Get file information
const fileInfo = fileAgent.getFileInfo(file);
---

## 📁 **Project Structure**

```
karam-smart-file-agent/
├── 📄 README.md                              # This comprehensive guide
├── 📄 LICENSE                                # MIT License
├── 📄 index.html                             # Landing page
├── 📄 test-page.html                         # Testing interface
├── 📁 docs/                                  # GitHub Pages deployment
│   ├── 📄 index.html                         # Built React app
│   ├── 📄 karam-client.js                    # Client-side utilities
│   ├── 📁 static/                            # React build assets
│   │   ├── 📁 css/                           # Stylesheets
│   │   └── 📁 js/                            # JavaScript bundles
│   └── 📄 manifest.json                      # PWA manifest
├── 📁 all_in_one_file_agent/
│   ├── 📁 frontend/                          # React TypeScript app
│   │   ├── 📄 package.json                   # Dependencies & scripts
│   │   ├── 📄 tsconfig.json                  # TypeScript config
│   │   ├── 📁 src/                           # Source code
│   │   │   ├── 📄 App.tsx                    # Main React component
│   │   │   ├── 📄 App.css                    # Styling
│   │   │   ├── 📄 index.tsx                  # React entry point
│   │   │   └── 📄 index.css                  # Global styles
│   │   ├── 📁 public/                        # Static assets
│   │   └── 📁 build/                         # Production build
│   ├── 📁 web/                               # Flask backend (dev only)
│   │   └── 📄 app.py                         # Development server
│   └── 📁 utils/                             # Python utilities
│       ├── 📄 audio_tools.py                 # Audio processing
│       ├── 📄 image_tools.py                 # Image manipulation
│       ├── 📄 pdf_tools.py                   # PDF utilities
│       └── 📄 zipper.py                      # Archive handling
└── 📁 deployment/                            # Deployment scripts
    ├── 📄 deploy-complete.bat                # Full deployment
    ├── 📄 fix-github-pages.bat               # Fix deployment issues
    └── 📄 verify-deployment.bat              # Verify setup
```

---

## 🔧 **Technologies Used**

### Frontend
- **React 19.1.0** - Modern UI library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **JSZip 3.10.1** - Client-side ZIP processing
- **PDF-lib 1.17.1** - PDF manipulation
- **React Scripts 5.0.1** - Build toolchain

### Development & Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control
- **npm** - Package management
- **Webpack** - Module bundling (via React Scripts)

### Backend (Development Only)
- **Flask** - Python web framework (local development)
- **Python 3.10+** - Backend language
- **CORS** - Cross-origin resource sharing

---

## 📚 **API Reference**

### KaramFileAgent Object

The global `window.KaramFileAgent` object provides the following methods:

#### `createZip(files: FileList): Promise<string>`
Creates a ZIP archive from the provided files.
```javascript
const files = document.getElementById('fileInput').files;
const result = await window.KaramFileAgent.createZip(files);
console.log(result); // "ZIP file created and downloaded successfully!"
```

#### `extractZip(zipFile: File): Promise<string>`
Extracts and analyzes a ZIP file.
```javascript
const zipFile = document.getElementById('zipInput').files[0];
const result = await window.KaramFileAgent.extractZip(zipFile);
console.log(result); // "ZIP contains 5 files: file1.txt, file2.jpg, ..."
```

#### `getFileInfo(file: File): Object`
Returns detailed information about a file.
```javascript
const file = document.getElementById('fileInput').files[0];
const info = window.KaramFileAgent.getFileInfo(file);
console.log(info);
// {
//   name: "document.pdf",
//   size: "2.5 MB",
//   type: "application/pdf",
//   lastModified: "12/25/2024"
// }
```

---

## 🔨 **Development**

### Setup Development Environment
```bash
# 1. Clone and enter project
git clone https://github.com/rohan911438/karam-smart-file-agent.git
cd karam-smart-file-agent

# 2. Install dependencies
cd all_in_one_file_agent/frontend
npm install

# 3. Start development servers
npm start              # Frontend (port 3000)

# Optional: Start Flask backend for development
cd ../web
python app.py          # Backend (port 5000)
```

### Available Scripts

#### Frontend (`all_in_one_file_agent/frontend/`)
```bash
npm start              # Start development server
npm test               # Run test suite
npm run build          # Build for production
npm run eject          # Eject from Create React App
```

#### Backend (`all_in_one_file_agent/web/`)
```bash
python app.py          # Start Flask development server
```

### Code Style & Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React rules
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (optional)

---

## 🚀 **Deployment**

### GitHub Pages (Automatic)
The project is configured for automatic GitHub Pages deployment:

1. **Push to main branch** triggers automatic deployment
2. **Build process** creates optimized production files
3. **GitHub Actions** deploys to GitHub Pages
4. **Live site** available at: https://rohan911438.github.io/karam-smart-file-agent/

### Manual Deployment
```bash
# 1. Build the application
cd all_in_one_file_agent/frontend
npm run build

# 2. Deploy using provided scripts
cd ../../
./deploy-complete.bat        # Windows
# or
./deploy-complete.sh         # Linux/macOS

# 3. Verify deployment
./verify-deployment.bat      # Check all files are in place
```

---

## 🤝 **Contributing**

We welcome contributions to Karam Smart File Agent! Here's how you can help:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Ensure cross-browser compatibility
- Test on mobile devices

### Bug Reports
Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Check existing issues first

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Rohan Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 **Author**

**Rohan Kumar**
- **GitHub**: [@rohan911438](https://github.com/rohan911438)
- **Project**: [Karam Smart File Agent](https://github.com/rohan911438/karam-smart-file-agent)
- **Live Demo**: [GitHub Pages](https://rohan911438.github.io/karam-smart-file-agent/)

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **JSZip** - For client-side ZIP processing capabilities
- **GitHub Pages** - For free static site hosting
- **Open Source Community** - For the tools and libraries that make this possible

---

## 📞 **Support**

If you encounter any issues or have questions:

1. **Check the [Issues](https://github.com/rohan911438/karam-smart-file-agent/issues)** page
2. **Search existing** issues before creating new ones
3. **Create a new issue** with detailed information
4. **Join discussions** in the Issues section

---

## 🔄 **Changelog**

### v2.0.0 (Current)
- ✅ Complete client-side implementation
- ✅ GitHub Pages deployment
- ✅ Enhanced TypeScript support
- ✅ Improved UI/UX
- ✅ Mobile responsiveness

### v1.0.0
- ✅ Initial React frontend
- ✅ Flask backend integration
- ✅ Basic file processing
- ✅ ZIP functionality

---

## ⭐ **Star History**

If you find this project helpful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=rohan911438/karam-smart-file-agent&type=Date)](https://star-history.com/#rohan911438/karam-smart-file-agent&Date)

---

<div align="center">

**Made with ❤️ by [Rohan Kumar](https://github.com/rohan911438)**

[🌟 Star this repo](https://github.com/rohan911438/karam-smart-file-agent) | [🐛 Report Bug](https://github.com/rohan911438/karam-smart-file-agent/issues) | [✨ Request Feature](https://github.com/rohan911438/karam-smart-file-agent/issues)

</div>