import React, { useState, useRef } from 'react';
import './App.css';
// @ts-ignore
import JSZip from 'jszip';

const TOOLS = [
  { key: 'zip', label: 'Zip/Unzip', icon: '🗜️', tooltip: 'Compress or extract files' },
  { key: 'image', label: 'Image Tools', icon: '🖼️', tooltip: 'Enhance, convert, compress images' },
  { key: 'audio', label: 'Audio Tools', icon: '🎵', tooltip: 'Convert audio formats' },
  { key: 'pdf', label: 'PDF Tools', icon: '📄', tooltip: 'Extract text from PDF' },
];

// For GitHub Pages deployment - all processing is done client-side
const API_BASE = '';

function App() {
  const [tool, setTool] = useState('zip');
  const [files, setFiles] = useState<FileList | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [zipMode, setZipMode] = useState<'zip' | 'unzip'>('zip');
  const [imageOp, setImageOp] = useState<'enhance' | 'convert' | 'compress'>('enhance');
  const [imageFormat, setImageFormat] = useState('png');
  const [imageQuality, setImageQuality] = useState(80);
  const [audioFormat, setAudioFormat] = useState('mp3');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setResult('');
    setDownloadUrl(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files);
      setResult('');
      setDownloadUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Client-side file processing functions for GitHub Pages deployment
  const processFilesClientSide = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    setResult('');
    setDownloadUrl(null);

    try {
      if (tool === 'zip') {
        if (zipMode === 'zip') {
          await createZipFile();
        } else {
          await extractZipFile();
        }
      } else if (tool === 'image') {
        await processImages();
      } else if (tool === 'audio') {
        setResult('Audio processing requires server-side processing. Feature coming soon for static deployment.');
      } else if (tool === 'pdf') {
        await extractPdfText();
      }
    } catch (err: any) {
      setResult('Error: ' + err.message);
    }
    setLoading(false);
  };

  const createZipFile = async () => {
    const zip = new JSZip();
    
    for (let i = 0; i < files!.length; i++) {
      const file = files![i];
      const arrayBuffer = await file.arrayBuffer();
      zip.file(file.name, arrayBuffer);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(content);
    setDownloadUrl(url);
    setResult('Zip file created successfully! Click download to save.');
    
    // Create download link with proper filename
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archive.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extractZipFile = async () => {
    if (files!.length !== 1) {
      setResult('Please select exactly one ZIP file to extract.');
      return;
    }

    const file = files![0];
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setResult('Please select a ZIP file.');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    
    let extractedFiles: string[] = [];
    zip.forEach((relativePath: string, zipEntry: any) => {
      if (!zipEntry.dir) {
        extractedFiles.push(relativePath);
      }
    });

    setResult(`ZIP file contains ${extractedFiles.length} files:\n${extractedFiles.join(', ')}\n\nNote: Due to browser security limitations, files cannot be automatically saved to disk. In a full deployment, files would be extracted.`);
  };

  const processImages = async () => {
    setResult('Image processing features require advanced libraries. This feature will be enhanced in future updates. For now, basic file operations are supported.');
  };

  const extractPdfText = async () => {
    setResult('PDF text extraction requires specialized libraries. This feature will be enhanced in future updates with PDF.js integration.');
  };

  const handleRun = async () => {
    await processFilesClientSide();
  };

  const renderToolOptions = () => {
    if (tool === 'zip') {
      return (
        <div style={{ marginBottom: 8 }}>
          <label title="Create a zip archive from files">
            <input type="radio" checked={zipMode === 'zip'} onChange={() => setZipMode('zip')} /> Zip
          </label>
          <label style={{ marginLeft: 16 }} title="Extract files from a zip archive">
            <input type="radio" checked={zipMode === 'unzip'} onChange={() => setZipMode('unzip')} /> Unzip
          </label>
        </div>
      );
    }
    if (tool === 'image') {
      return (
        <div style={{ marginBottom: 8 }}>
          <label title="AI/ML-based image enhancement">
            <input type="radio" checked={imageOp === 'enhance'} onChange={() => setImageOp('enhance')} /> Enhance
          </label>
          <label style={{ marginLeft: 12 }} title="Convert image format">
            <input type="radio" checked={imageOp === 'convert'} onChange={() => setImageOp('convert')} /> Convert
          </label>
          <label style={{ marginLeft: 12 }} title="Compress image (reduce size)">
            <input type="radio" checked={imageOp === 'compress'} onChange={() => setImageOp('compress')} /> Compress
          </label>
          {imageOp === 'convert' && (
            <select value={imageFormat} onChange={e => setImageFormat(e.target.value)} style={{ marginLeft: 12 }}>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WEBP</option>
              <option value="bmp">BMP</option>
            </select>
          )}
          {imageOp === 'compress' && (
            <input type="number" min={1} max={100} value={imageQuality} onChange={e => setImageQuality(Number(e.target.value))} style={{ marginLeft: 12, width: 60 }} />
          )}
        </div>
      );
    }
    if (tool === 'audio') {
      return (
        <div style={{ marginBottom: 8 }}>
          <label>Convert to: </label>
          <select value={audioFormat} onChange={e => setAudioFormat(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="mp3">MP3</option>
            <option value="wav">WAV</option>
            <option value="ogg">OGG</option>
            <option value="flac">FLAC</option>
          </select>
        </div>
      );
    }
    if (tool === 'pdf') {
      return <div style={{ marginBottom: 8 }}>Extract text from PDF.</div>;
    }
    return null;
  };

  const renderFilePreview = () => {
    if (!files || files.length === 0) return null;
    const file = files[0];
    if (file.type.startsWith('image/')) {
      return <div className="file-preview"><img src={URL.createObjectURL(file)} alt="preview" /></div>;
    }
    if (file.type === 'application/pdf') {
      return <div className="file-preview">PDF: {file.name}</div>;
    }
    return <div className="file-preview">{file.name}</div>;
  };

  return (
    <div className="App">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>All-in-One File Agent</h2>
      <div className="tool-tabs">
        {TOOLS.map(t => (
          <button
            key={t.key}
            className={`tool-tab${tool === t.key ? ' selected' : ''}`}
            onClick={() => setTool(t.key)}
            title={t.tooltip}
          >
            <span style={{ fontSize: 20 }}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>{renderToolOptions()}</div>
      <div
        className={`upload-area${dragOver ? ' dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        title="Click or drag files here"
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="upload-label">Click or drag files here to upload</div>
        {renderFilePreview()}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <button className="action-btn" onClick={handleRun} disabled={loading || !files}>
          {loading ? <span className="spinner" /> : 'Run'}
        </button>
      </div>
      {downloadUrl && <div style={{ textAlign: 'center', marginBottom: 16 }}><a className="download-link" href={downloadUrl} download>Download Result</a></div>}
      {result && <div className="result-box">{result}</div>}
      <div style={{ marginTop: 32, textAlign: 'center', fontSize: 13, color: '#888' }}>
        &copy; {new Date().getFullYear()} All-in-One File Agent
      </div>
    </div>
  );
}

export default App;
