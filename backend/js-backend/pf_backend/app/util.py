from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import io
import re
from PyPDF2 import PdfReader

DEBUG = True


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


def extract_text_from_docx(docx_blob):

    if DEBUG:
        print("Entering extract_text_from_docx...")

    doc = io.BytesIO(docx_blob)  # Document(io.BytesIO(docx_blob))
    text = ""
    # for para in doc.paragraphs:
    #   text += para.text + "\n"

    if DEBUG:
        print("Exiting extract_text_from_docx...")

    return text


# def tfidf_cosine_similarity(resume, job_descriptions):

#     documents = [resume, job_descriptions]
#     # else:
#     #   documents = [resume] + job_descriptions

#     tfidf_vectorizer = TfidfVectorizer().fit_transform(documents)
#     resume_vector = tfidf_vectorizer[0:1]
#     job_vectors = tfidf_vectorizer[1:]
#     cosine_similarities = cosine_similarity(
#         resume_vector, job_vectors).flatten()
#     return cosine_similarities
