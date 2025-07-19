import sys
import os
import tempfile
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from utils.zipper import zip_files, unzip_file
from utils.image_tools import enhance_image, convert_image_format, compress_image
from utils.audio_tools import convert_audio_format
from utils.pdf_tools import extract_text_from_pdf

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:5000", "http://localhost:5000"])  # Enable CORS for all routes
UPLOAD_DIR = tempfile.gettempdir()

# Add request logging
@app.before_request
def log_request_info():
    print(f"Request: {request.method} {request.url}")
    print(f"Headers: {dict(request.headers)}")

# Add a simple test endpoint
@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'Backend is working!', 'status': 'success'})

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/zip', methods=['POST'])
def zip_endpoint():
    try:
        print("Zip endpoint called")  # Debug log
        if 'files' not in request.files:
            print("No files in request")  # Debug log
            return jsonify({'error': 'No files uploaded'}), 400
        
        files = request.files.getlist('files')
        if not files or all(f.filename == '' for f in files):
            print("No files selected")  # Debug log
            return jsonify({'error': 'No files selected'}), 400
        
        print(f"Processing {len(files)} files")  # Debug log
        output_path = os.path.join(UPLOAD_DIR, 'output.zip')
        file_paths = []
        
        for f in files:
            if f.filename != '':
                temp_path = os.path.join(UPLOAD_DIR, f.filename)
                f.save(temp_path)
                file_paths.append(temp_path)
        
        if not file_paths:
            return jsonify({'error': 'No valid files to zip'}), 400
            
        zip_files(file_paths, output_path)
        return send_file(output_path, as_attachment=True, download_name='output.zip')
    except Exception as e:
        return jsonify({'error': f'Failed to create zip file: {str(e)}'}), 500

@app.route('/unzip', methods=['POST'])
def unzip_endpoint():
    if 'files' not in request.files:
        return jsonify({'error': 'No zip file uploaded'}), 400
    
    file = request.files['files']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.lower().endswith('.zip'):
        return jsonify({'error': 'Please upload a ZIP file'}), 400
    
    # Save uploaded zip file
    zip_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(zip_path)
    
    # Create extraction directory
    extract_dir = os.path.join(UPLOAD_DIR, 'extracted')
    os.makedirs(extract_dir, exist_ok=True)
    
    try:
        unzip_file(zip_path, extract_dir)
        # List extracted files
        extracted_files = []
        for root, dirs, files in os.walk(extract_dir):
            for f in files:
                rel_path = os.path.relpath(os.path.join(root, f), extract_dir)
                extracted_files.append(rel_path)
        
        return jsonify({
            'message': f'Successfully extracted {len(extracted_files)} files',
            'files': extracted_files
        })
    except Exception as e:
        return jsonify({'error': f'Failed to extract zip file: {str(e)}'}), 500

@app.route('/image/enhance', methods=['POST'])
def image_enhance_endpoint():
    if 'files' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['files']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Check if file is an image
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        return jsonify({'error': 'Please upload a valid image file'}), 400
    
    try:
        input_path = os.path.join(UPLOAD_DIR, file.filename)
        output_path = os.path.join(UPLOAD_DIR, 'enhanced_' + file.filename)
        file.save(input_path)
        enhance_image(input_path, output_path)
        return send_file(output_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': f'Failed to enhance image: {str(e)}'}), 500

@app.route('/image/convert', methods=['POST'])
def image_convert_endpoint():
    input_path = request.json.get('input')
    output_format = request.json.get('output_format')
    if not input_path or not output_format:
        return jsonify({'error': 'Missing input or output_format'}), 400
    output_path = os.path.splitext(input_path)[0] + '.' + output_format
    convert_image_format(input_path, output_format)
    return send_file(output_path, as_attachment=True)

@app.route('/image/compress', methods=['POST'])
def image_compress_endpoint():
    input_path = request.json.get('input')
    output_path = request.json.get('output')
    quality = request.json.get('quality', 80)
    if not input_path or not output_path:
        return jsonify({'error': 'Missing input or output'}), 400
    compress_image(input_path, output_path, quality)
    return send_file(output_path, as_attachment=True)

@app.route('/audio/convert', methods=['POST'])
def audio_convert_endpoint():
    if 'files' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400
    file = request.files['files']
    input_path = os.path.join(UPLOAD_DIR, file.filename)
    output_path = os.path.join(UPLOAD_DIR, 'converted_' + file.filename)
    file.save(input_path)
    convert_audio_format(input_path, output_path)
    return send_file(output_path, as_attachment=True)

@app.route('/pdf/extract', methods=['POST'])
def pdf_extract_endpoint():
    if 'files' not in request.files:
        return jsonify({'error': 'No PDF uploaded'}), 400
    file = request.files['files']
    pdf_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(pdf_path)
    text = extract_text_from_pdf(pdf_path)
    return jsonify({'text': text})

if __name__ == '__main__':
    print("Starting Flask server on http://127.0.0.1:5000")
    print("API endpoints available:")
    print("  GET  /api/test - Test endpoint")
    print("  POST /zip - Zip/Unzip files")
    print("  POST /image/enhance - Enhance images")
    print("  POST /image/convert - Convert image format")
    print("  POST /image/compress - Compress images")
    print("  POST /audio/convert - Convert audio format")
    print("  POST /pdf/extract - Extract text from PDF")
    app.run(debug=True, port=5000, host='127.0.0.1') 