import zipfile
import os
from pathlib import Path

def zip_files(file_paths, output_name):
    with zipfile.ZipFile(output_name, 'w') as zipf:
        for file_path in file_paths:
            file_path = Path(file_path)
            if file_path.is_file():
                zipf.write(file_path, arcname=file_path.name)
            elif file_path.is_dir():
                for root, _, files in os.walk(file_path):
                    for file in files:
                        full_path = Path(root) / file
                        arcname = str(full_path.relative_to(file_path.parent))
                        zipf.write(full_path, arcname=arcname)

def unzip_file(zip_path, extract_to):
    with zipfile.ZipFile(zip_path, 'r') as zipf:
        zipf.extractall(extract_to) 