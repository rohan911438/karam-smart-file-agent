import React, { useState, useRef } from 'react';
import './App.css';

const TOOLS = [
  { key: 'zip', label: 'Zip/Unzip', icon: '🗜️', tooltip: 'Compress or extract files' },
  { key: 'image', label: 'Image Tools', icon: '🖼️', tooltip: 'Enhance, convert, compress images' },
  { key: 'audio', label: 'Audio Tools', icon: '🎵', tooltip: 'Convert audio formats' },
  { key: 'pdf', label: 'PDF Tools', icon: '📄', tooltip: 'Extract text from PDF' },
];

const API_BASE = 'http://localhost:5000';

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

  const handleRun = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    setResult('');
    setDownloadUrl(null);
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));
      let endpoint = '';
      let isFileDownload = false;
      let params: any = {};

      if (tool === 'zip') {
        if (zipMode === 'zip') {
          endpoint = '/zip';
          isFileDownload = true;
        } else {
          endpoint = '/unzip';
          params = { extract_to: 'unzipped' };
        }
      } else if (tool === 'image') {
        if (imageOp === 'enhance') {
          endpoint = '/image/enhance';
          isFileDownload = true;
        } else if (imageOp === 'convert') {
          endpoint = '/image/convert';
          formData.append('output_format', imageFormat);
          isFileDownload = true;
        } else if (imageOp === 'compress') {
          endpoint = '/image/compress';
          formData.append('quality', imageQuality.toString());
          isFileDownload = true;
        }
      } else if (tool === 'audio') {
        endpoint = '/audio/convert';
        formData.append('output_format', audioFormat);
        isFileDownload = true;
      } else if (tool === 'pdf') {
        endpoint = '/pdf/extract';
      }

      Object.entries(params).forEach(([k, v]) => formData.append(k, String(v)));

      const res = await fetch(API_BASE + endpoint, { method: 'POST', body: formData });
      if (isFileDownload && res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
        setResult('Download ready!');
      } else {
        const data = await res.json();
        setResult(data.text || data.message || JSON.stringify(data));
      }
    } catch (err: any) {
      setResult('Error: ' + err.message);
    }
    setLoading(false);
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
