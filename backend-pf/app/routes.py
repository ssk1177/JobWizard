from flask import request, jsonify, Blueprint
import spacy
import re
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import io

DEBUG = True


# Create a Blueprint for the routes
routes = Blueprint('routes', __name__)

# Allow specific file extensions
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}


def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@routes.route('/performSimilarityMatch', methods=['POST'])
def performSimilarityMatch():
    try:
        if 'resumeBrowse' not in request.files or 'job_description' not in request.form:
            return jsonify({"error": "Missing file or job description in the request"}), 400

        resume = request.files['resumeBrowse']
        job_desc = request.form['job_description']

        if resume.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if resume and allowed_file(resume.filename):
            filename = secure_filename(resume.filename)
            print("data:", filename)

            try:
                nlp = spacy.load('en_core_web_sm')
            except OSError:
                spacy.cli.download("en_core_web_sm")
                nlp = spacy.load('en_core_web_sm')

            resume_blob = resume.stream.read()

            parsed_resume = parse_resume(nlp, resume_blob)
            job_texts = extract_entities(nlp, job_desc)

            similarities, matched_resume_texts, matched_job_texts = tfidf_cosine_similarity(
                parsed_resume, job_texts)

            response = {
                "score": round(similarities[0] * 100, 2),
                "matched_resume_texts": matched_resume_texts,
                "matched_job_texts": matched_job_texts
            }

            return jsonify(response), 200
        else:
            return jsonify({"error": "Invalid file type"}), 400

    except Exception as e:
        print("Exception raised in performSimilarityMatch:", e)
        return jsonify({"message": f"Exception: {str(e)}"}), 500


def parse_resume(nlp, resume_blob):
    resume_content = extract_text_from_pdf(resume_blob)
    resume_text = preprocess_text(resume_content)
    return extract_entities(nlp, resume_text)


def extract_text_from_pdf(pdf_blob):
    if DEBUG:
        print("Entering extract_text_from_pdf...")

    # Use io.BytesIO to handle the PDF bytes as a file-like object
    pdf_file = io.BytesIO(pdf_blob)
    text = ""
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        text += page.extract_text() or ""

    if DEBUG:
        print("Exiting extract_text_from_pdf...")

    return text


def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    return text


def extract_entities(nlp, text):
    doc = nlp(text)
    return ' '.join([token.lemma_ for token in doc])


def tfidf_cosine_similarity(resume_text, job_text):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_text])

    # Extract feature names from the vectorizer
    feature_names = vectorizer.get_feature_names_out()

    # Compute cosine similarity
    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:2])

    # Determine matched words/phrases
    matched_resume_texts, matched_job_texts = get_matched_texts(
        resume_text, job_text, vectors[0].toarray()[0], vectors[1].toarray()[0], feature_names)

    return cosine_sim.flatten(), matched_resume_texts, matched_job_texts


def get_matched_texts(resume_text, job_text, resume_vector, job_vector, feature_names):
    matched_resume = [feature_names[i] for i in range(
        len(feature_names)) if resume_vector[i] > 0 and job_vector[i] > 0]
    matched_job = [feature_names[i] for i in range(
        len(feature_names)) if job_vector[i] > 0 and resume_vector[i] > 0]

    return matched_resume, matched_job
