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

# Load SpaCy model globally
# nlp = spacy.load('en_core_web_md')

try:
    nlp = spacy.load('en_core_web_md')
except OSError as e:
    spacy.cli.download("en_core_web_md")
    nlp = spacy.load('en_core_web_md')


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

            resume_blob = resume.stream.read()
            resume_text = extract_text_from_pdf(resume_blob)
            job_text = preprocess_text(job_desc)

            parsed_resume = extract_relevant_terms(nlp, resume_text)
            parsed_job = extract_relevant_terms(nlp, job_text)

            similarities, matched_resume_texts, matched_job_texts = tfidf_cosine_similarity(
                parsed_resume, parsed_job)

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


def extract_text_from_pdf(pdf_blob):
    pdf_file = io.BytesIO(pdf_blob)
    text = ""
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        text += page.extract_text() or ""

    return text


def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    return text


def extract_relevant_terms(nlp, text):
    """
    Extract relevant terms using SpaCy's NER and POS tagging.
    This function filters out stop words and non-relevant POS tags.
    """
    doc = nlp(text)
    relevant_terms = []

    for token in doc:
        # Check if the token is not a stop word, is an alpha word, and is of a relevant POS
        if not token.is_stop and token.is_alpha and token.pos_ in ('NOUN', 'PROPN', 'VERB', 'ADJ'):
            relevant_terms.append(token.lemma_)

    return ' '.join(relevant_terms)


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
