from flask import Flask
from PIL import Image
import zlib
import io
import fitz  # PyMuPDF

DEBUG = True


def genHashPass(passwd):
    try:
        from . import bcrypt
        return bcrypt.generate_password_hash(passwd)
    except Exception as e:
        print("Error in generating hash for the password", e)


def checkHashPass(hashpass, rawpass):
    try:
        from . import bcrypt
        return bcrypt.check_password_hash(hashpass, rawpass)
    except Exception as e:
        print("Error in checkHashPass", e)


def compressImg(file):
    # Open the image file
    img = Image.open(file)

    # Determine image format (JPEG or PNG)
    img_format = img.format

    # Save image to a BytesIO object
    img_io = io.BytesIO()

    if img_format == 'JPEG':
        img = img.convert("RGB")  # Convert to RGB for JPEG
        img.save(img_io, 'JPEG', quality=85)  # Compress JPEG
    elif img_format == 'PNG':
        img.save(img_io, 'PNG', compress_level=6)  # Compress PNG

    img_io.seek(0)

    # Compress the image data
    compressed_image_data = zlib.compress(img_io.getvalue())

    return compressed_image_data


def extract_text_from_pdf(pdf_content):

    pdf_document = fitz.open(stream=pdf_content, filetype="pdf")
    text = ""

    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text("text")

    pdf_document.close()
    return text


def highlight_matches(text, matches):
    # Escape any HTML special characters in the text to prevent issues
    from markupsafe import escape

    text = escape(text)
    for match in matches:
        match_escaped = escape(match)
        text = text.replace(match_escaped, f'<mark>{match_escaped}</mark>')
    return text


def get_jd_list(job_listings):
    if DEBUG:
        print("Entering get_jd_list", type(job_listings))

    jd_list = []

    for listing in job_listings:
        if DEBUG:
            print("listing:", listing)

        jd_list.append(listing["job-desc"])

    if DEBUG:
        print("job desc list", jd_list)

    return jd_list
