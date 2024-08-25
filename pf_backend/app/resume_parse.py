from flask import Flask  # , render_template
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
import spacy
# import re
# # import fitz  # PyMuPDF
# # import requests
# from bs4 import BeautifulSoup
# # import json
# # import PyPDF2
# # from docx import Document
# import io

# DEBUG = True

# nlp = spacy.load("en_core_web_sm")
try:
    nlp = spacy.load('en_core_web_sm')
    print("Model loaded successfully!")
except OSError as e:
    print(f"Error: {e}")

# # "tfidf_cosine_similarity", "Word_Embeddings", "BERT"
# similarity_method = "tfidf_cosine_similarity"
# # similarity_method = "BERT"

# if (similarity_method == "BERT"):
#     tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
#     model = TFBertModel.from_pretrained('bert-base-uncased')


# def preprocess_text(text):
#     text = text.lower()
#     text = re.sub(r'\s+', ' ', text)
#     return text


# def extract_entities(text):
#     doc = nlp(text)
#     return ' '.join([token.lemma_ for token in doc])

# # Extract text from PDF


# def extract_text_from_pdf(pdf_blob):

#     if DEBUG:
#         print("Entering extract_text_from_pdf...")

#     reader = io.BytesIO(pdf_blob)  # PyPDF2.PdfReader(io.BytesIO(pdf_blob))
#     text = ""
#     for page in reader.pages:
#         text += page.extract_text()

#     if DEBUG:
#         print("Exiting extract_text_from_pdf...")

#     return text

# # Extract text from DOCX


# def extract_text_from_docx(docx_blob):

#     if DEBUG:
#         print("Entering extract_text_from_docx...")

#     doc = io.BytesIO(docx_blob)  # Document(io.BytesIO(docx_blob))
#     text = ""
#     # for para in doc.paragraphs:
#     #   text += para.text + "\n"

#     if DEBUG:
#         print("Exiting extract_text_from_docx...")

#     return text


# def parse_resume(resume_blob, flag):

#     if DEBUG:
#         print("Entering parse_resume...")

#     if resume_blob:
#         try:
#             # Attempt to decode as UTF-8 text
#             if flag != 1:
#                 resume_content = resume_blob.decode('utf-8')
#             else:
#                 resume_content = resume_blob  # its in utf-8

#             # parse_resume(resume_content, flag)
#         except UnicodeDecodeError:
#             # If decoding as UTF-8 fails, assume it's a binary file
#             try:
#                 # Attempt to parse as PDF
#                 resume_content = extract_text_from_pdf(resume_blob)
#                 # parse_resume(resume_content)
#             except:
#                 # Attempt to parse as DOCX
#                 try:
#                     resume_content = extract_text_from_docx(resume_blob)
#                    # parse_resume(resume_content)
#                 except Exception as e:
#                     print("Failed to parse resume:", e)
#     else:
#         print("No resume found for the given user ID.")

#     # Read and extract text from the PDF file
#     # doc = fitz.open(pdf_path)
#     # resume_text = ""
#     # for page in doc:
#     #     resume_text += page.get_text()

#     resume_text = preprocess_text(resume_content)

#     if DEBUG:
#         print("Exiting parse_resume...resume_content:", resume_content)

#     return extract_entities(resume_text)


# def fetch_job_descriptions(job_file_path):
#     # Read job descriptions from a local text file
#     with open(job_file_path, 'r') as file:
#         # Assume each job description is separated by a blank line
#         job_descriptions = file.read().split('\n\n')

#     print("job_descriptions:", job_descriptions,
#           ", type:", type(job_descriptions))
#     return job_descriptions


# def tfidf_cosine_similarity(resume, job_descriptions, flag):

#     if flag:
#         documents = [resume, job_descriptions]
#     else:
#         documents = [resume] + job_descriptions

#     tfidf_vectorizer = TfidfVectorizer().fit_transform(documents)
#     resume_vector = tfidf_vectorizer[0:1]
#     job_vectors = tfidf_vectorizer[1:]
#     cosine_similarities = cosine_similarity(
#         resume_vector, job_vectors).flatten()
#     return cosine_similarities


# def bert_encode(texts, tokenizer, model):
#     encoded_input = tokenizer(
#         texts, padding=True, truncation=True, return_tensors='tf')
#     model_output = model(encoded_input)
#     embeddings = tf.reduce_mean(model_output.last_hidden_state, axis=1)
#     return embeddings


# def bert_similarity(resume, job_descriptions):
#     texts = [resume] + job_descriptions
#     embeddings = bert_encode(texts, tokenizer, model)
#     resume_embedding = embeddings[0:1]
#     job_embeddings = embeddings[1:]
#     cosine_similarities = cosine_similarity(
#         resume_embedding, job_embeddings).flatten()
#     return cosine_similarities


# def train_word2vec(corpus):
#     sentences = [simple_preprocess(text) for text in corpus]
#     model = Word2Vec(sentences, vector_size=100,
#                      window=5, min_count=1, workers=4)
#     return model


# def get_average_vector(text, model):
#     words = simple_preprocess(text)
#     vectors = [model.wv[word] for word in words if word in model.wv]
#     if vectors:
#         return np.mean(vectors, axis=0)
#     else:
#         return np.zeros(model.vector_size)


# def word2vec_similarity(resume, job_descriptions, model):
#     resume_vector = get_average_vector(resume, model)
#     job_vectors = [get_average_vector(job, model) for job in job_descriptions]
#     similarities = [np.dot(resume_vector, job_vector) / (np.linalg.norm(
#         resume_vector) * np.linalg.norm(job_vector)) for job_vector in job_vectors]
#     return similarities


# def get_matched_text(resume_text, job_text):
#     resume_words = set(resume_text.split())
#     job_words = set(job_text.split())
#     matched_words = resume_words & job_words
#     return matched_words


# def performSimilarityMatch(resume_blob, job_descriptions, flag):

#     if DEBUG:
#         print("Entering performSimilarityMatch...")

#     # pdf_path = '../data/dummy_resume.pdf'  # Path to the local resume PDF file
#     # Path to the local job descriptions text file
#     # job_file_path = '../data/job_description.txt'

#     parsed_resume = parse_resume(resume_blob, flag)

#     # job_descriptions = fetch_job_descriptions(job_file_path)
#     if flag != 1:
#         job_texts = [extract_entities(job) for job in job_descriptions]
#     else:
#         job_texts = job_descriptions

#     if DEBUG:
#         print("Inside performSimilarityMatch, job desc:",
#               job_texts, ", type:", type(job_texts))

#     if (similarity_method == 'BERT'):
#         similarities = bert_similarity(parsed_resume, job_texts)
#     elif (similarity_method == "Word_Embeddings"):
#         similarities = word2vec_similarity(parsed_resume, job_texts, model)

#     # default method: tfidf_cosine_similarity
#     else:
#         similarities = tfidf_cosine_similarity(parsed_resume, job_texts, flag)

#     if DEBUG:
#         print("Exiting performSimilarityMatch...")

#     return similarities


# def getJobListings(data):
#     l = []
#     o = {}

#     # target_url = "https://api.scrapingdog.com/scrape?api_key=66a2fab26fe0510bcc0292f9&url=https://ca.indeed.com/jobs?q=software+developer&l=Manitoba&dynamic=false"
#     # target_url = "https://www.indeed.com/jobs?q=python&l=New+York%2C+NY&vjk=8bf2e735050604df"
#     head = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
#             "Accept-Encoding": "gzip, deflate, br",
#             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
#             "Connection": "keep-alive",
#             "Accept-Language": "en-US,en;q=0.9,lt;q=0.8,et;q=0.7,de;q=0.6",
#             }

#     # resp = requests.get(target_url)

#     # print(resp.status_code, "\n")

#     # print(resp.content)

#     # Opening the html file
#     HTMLFile = open("../../data/test.html", "r")

#     # Reading the file
#     index = HTMLFile.read()

# #    soup = BeautifulSoup(resp.text, 'html.parser')
#     soup = BeautifulSoup(index, 'html.parser')

#     allData = soup.find("div", {"class": "mosaic-provider-jobcards"})

#     alllitags = allData.find_all("li", {"class": "css-5lfssm eu4oa1w0"})
#     # print(len(alllitags))
#     for i in range(0, len(alllitags)):
#         try:
#             o["job-id"] = alllitags[i].find("h2", {"class": "jobTitle"}).find(
#                 "a", {"class": "jcs-JobTitle"}).span.get("id").split("-")[1]
#         except:
#             o["job-id"] = None

#         if (o["job-id"] != None):
#             try:
#                 o["job-title"] = alllitags[i].find("h2", {"class": "jobTitle"}).find(
#                     "a", {"class": "jcs-JobTitle"}).span.text
#             except:
#                 o["job-title"] = None

#             try:
#                 o["company-name"] = alllitags[i].find("div", {"class": "company_location"}).find(
#                     "span", {"class": "css-63koeb eu4oa1w0"}).text
#             except:
#                 o["company-name"] = None

#             try:
#                 o["company-location"] = alllitags[i].find("div", {"class": "company_location"}).find(
#                     "div", {"data-testid": "text-location"}).text
#             except:
#                 o["company-location"] = None

#             try:
#                 o["salary"] = alllitags[i].find(
#                     "div", {"class": "salary-snippet-container"}).text
#             except:
#                 o["salary"] = None

#             try:
#                 o["posted"] = alllitags[i].find("div", {"class": "jobMetaDataGroup"}).find(
#                     "span", {"data-testid": "myJobsStateDate"}).text.split(' ', 1)[1]
#             except:
#                 o["posted"] = None

#             try:
#                 o["job-desc"] = (alllitags[i].find(
#                     "div", {"class": "jobMetaDataGroup"}).find("ul").text).replace(r'\n', ' ').replace(r'\r', '')
#             except:
#                 o["job-desc"] = None

#             l.append(o)
#             o = {}

#     return l
