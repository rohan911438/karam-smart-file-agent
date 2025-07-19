import sys
import os
import tempfile
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from flask import Flask, request, jsonify, send_file, send_from_directory
from utils.zipper import zip_files, unzip_file
from utils.image_tools import enhance_image, convert_image_format, compress_image
from utils.audio_tools import convert_audio_format
from utils.pdf_tools import extract_text_from_pdf

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
UPLOAD_DIR = tempfile.gettempdir()

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
    if 'files' not in request.files:
        return jsonify({'error': 'No files uploaded'}), 400
    files = request.files.getlist('files')
    output_path = os.path.join(UPLOAD_DIR, 'output.zip')
    file_paths = []
    for f in files:
        temp_path = os.path.join(UPLOAD_DIR, f.filename)
        f.save(temp_path)
        file_paths.append(temp_path)
    zip_files(file_paths, output_path)
    return send_file(output_path, as_attachment=True)

@app.route('/unzip', methods=['POST'])
def unzip_endpoint():
    zipfile_path = request.json.get('zipfile')
    extract_to = request.json.get('extract_to')
    if not zipfile_path or not extract_to:
        return jsonify({'error': 'Missing zipfile or extract_to'}), 400
    unzip_file(zipfile_path, extract_to)
    return jsonify({'message': f'Extracted {zipfile_path} to {extract_to}'})

@app.route('/image/enhance', methods=['POST'])
def image_enhance_endpoint():
    if 'files' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['files']
    input_path = os.path.join(UPLOAD_DIR, file.filename)
    output_path = os.path.join(UPLOAD_DIR, 'enhanced_' + file.filename)
    file.save(input_path)
    enhance_image(input_path, output_path)
    return send_file(output_path, as_attachment=True)

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
    app.run(debug=True, port=3000) 