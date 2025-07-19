// Karam Smart File Agent - Client-side fallback functionality
// This provides basic file processing while the main React app loads

// Include JSZip via CDN
if (typeof JSZip === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.onload = () => console.log('JSZip loaded successfully');
    document.head.appendChild(script);
}

// Simple file processing functions
window.KaramFileAgent = {
    
    // Create ZIP from selected files
    createZip: async function(files) {
        if (typeof JSZip === 'undefined') {
            alert('ZIP library is still loading. Please try again in a moment.');
            return;
        }
        
        const zip = new JSZip();
        const fileArray = Array.from(files);
        
        for (let file of fileArray) {
            const arrayBuffer = await file.arrayBuffer();
            zip.file(file.name, arrayBuffer);
        }
        
        const content = await zip.generateAsync({type: 'blob'});
        
        // Create download link
        const url = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'karam-archive.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return 'ZIP file created and downloaded successfully!';
    },
    
    // Extract ZIP file
    extractZip: async function(zipFile) {
        if (typeof JSZip === 'undefined') {
            alert('ZIP library is still loading. Please try again in a moment.');
            return;
        }
        
        const arrayBuffer = await zipFile.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        const files = [];
        zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                files.push(relativePath);
            }
        });
        
        return `ZIP contains ${files.length} files: ${files.join(', ')}`;
    },
    
    // Get file info
    getFileInfo: function(file) {
        return {
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type || 'Unknown',
            lastModified: new Date(file.lastModified).toLocaleDateString()
        };
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Karam Smart File Agent - Client-side functionality loaded');
    
    // Add drag and drop to body
    document.body.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    document.body.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            console.log(`${files.length} files dropped:`, Array.from(files).map(f => f.name));
        }
    });
});
