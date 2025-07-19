from PIL import Image, ImageEnhance
import os

def enhance_image(input_path, output_path, factor=1.5):
    img = Image.open(input_path)
    enhancer = ImageEnhance.Contrast(img)
    img_enhanced = enhancer.enhance(factor)
    img_enhanced.save(output_path)

def convert_image_format(input_path, output_format):
    img = Image.open(input_path)
    base = os.path.splitext(input_path)[0]
    out_path = f"{base}.{output_format.lower()}"
    img.save(out_path, output_format.upper())
    return out_path

def compress_image(input_path, output_path, quality=80):
    img = Image.open(input_path)
    img.save(output_path, quality=quality, optimize=True) 