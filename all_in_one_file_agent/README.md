![Karam Logo](../logo-7833524_1280.webp)

# Karam: All-in-One Smart File Utility Agent

## Overview
Karam is a unified, AI-enabled automation agent for all your file-related tasks. With a beautiful web interface, Karam lets you zip/unzip, enhance and convert images, compress files, convert audio, extract text from PDFs, and more—all in one place.

## Features
- **Zip/Unzip**: Compress multiple files or extract archives.
- **Image Tools**: Enhance, convert, or compress images (AI/ML-powered enhancement).
- **Audio Tools**: Convert audio files between formats (MP3, WAV, OGG, FLAC).
- **PDF Tools**: Extract text from PDF documents.
- **Modern UI**: Responsive, drag-and-drop, tooltips, and file previews.

## Demo
![Karam UI Screenshot](frontend/screenshot.png)

## Requirements
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Python 3.8+
- pip
- (Optional for audio/image) ffmpeg installed and in PATH

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-github-username>/karam.git
cd karam/all_in_one_file_agent/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally (Development)
```bash
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
```

### 5. Deploy to GitHub Pages
- Set your GitHub username in `package.json` under `homepage`.
- Make sure the repo is named `karam`.
- Install gh-pages if not already:
  ```bash
  npm install --save gh-pages
  ```
- Deploy:
  ```bash
  npm run deploy
  ```

## Backend (API)
The backend is a Flask app (Python) that powers all file utilities. See `web/app.py` for endpoints.

### Requirements
- Install Python dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Run the backend:
  ```bash
  cd web
  python app.py
  ```

## Folder Structure
```
karam/
  all_in_one_file_agent/
    frontend/      # React app (UI)
    web/           # Flask backend (API)
    utils/         # Python utility modules
    requirements.txt
    main.py
```

## .gitignore
Add a `.gitignore` file at the root with at least:
```
node_modules/
build/
.env
__pycache__/
*.pyc
.DS_Store
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](../LICENSE)

---
**Author:** [Your Name] 