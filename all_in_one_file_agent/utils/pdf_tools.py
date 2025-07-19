import pdfplumber
from docx import Document
from reportlab.pdfgen import canvas
import os

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ''
    return text

def convert_docx_to_pdf(docx_path, output_path):
    doc = Document(docx_path)
    c = canvas.Canvas(output_path)
    textobject = c.beginText(40, 800)
    for para in doc.paragraphs:
        textobject.textLine(para.text)
    c.drawText(textobject)
    c.save() 