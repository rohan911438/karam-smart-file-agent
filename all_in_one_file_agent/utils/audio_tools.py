from pydub import AudioSegment
import os

def convert_audio_format(input_path, output_format):
    base = os.path.splitext(input_path)[0]
    out_path = f"{base}.{output_format.lower()}"
    audio = AudioSegment.from_file(input_path)
    audio.export(out_path, format=output_format.lower())
    return out_path 