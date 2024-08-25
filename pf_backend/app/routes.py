from flask import Blueprint
import spacy
# jsonify, Response, current_app, send_from_directory, request, jsonify
# from flask_login import login_user, login_required, logout_user, current_user
# from .models import db, User
# from . import db
# from .forms import *
# import random
# from .models import *
# # import os
# # from werkzeug.utils import secure_filename
# from datetime import datetime
# from markupsafe import Markup
# import json
# import base64
# from .util import *
# from .resume_parse import *

# DEBUG = True

# Create a Blueprint for the routes
routes = Blueprint('routes', __name__)


@routes.route('/api/example', methods=['GET'])
def example():
    try:
        nlp = spacy.load('en_core_web_sm')
        print("Model loaded successfully!")
        return ""
    except Exception as e:  # OSError as e:
        spacy.cli.download("en_core_web_sm")
        nlp = spacy.load('en_core_web_sm')
        print(f"Error: {e}")


# @routes.route('/manifest.json')
# def manifest():
#     return send_from_directory('static', 'manifest.json', mimetype='application/json')


# @routes.route('/analytics/data')
# @login_required
# def analytics_data():
#     if DEBUG:
#         print("Entering analytics_data...")

#     data = {
#         'lineChartData': [487, 543, 328, 435],
#         'pieChartData': [30, 70],
#         'doughnutChartData': 118,
#         'mapData': [
#             {'location': 'New York', 'value': 10},
#             {'location': 'London', 'value': 20},
#             {'location': 'Tokyo', 'value': 30},
#         ],
#         'barChartData': [10, 20, 30, 40, 50, 60, 70, 80],
#         'stats': [95, 135, 87, 39]
#     }

#     if DEBUG:
#         print("Exiting analytics_data...data:", data)

#     return jsonify(data)

# # @routes.after_request
# # def after_request(response):
# #     print("inside after_request")
# #     # Log the headers
# #     logging.debug(f"Response Headers: {response.headers}")
# #     return response


# # @routes.route('/register', methods=['GET', 'POST', 'OPTIONS'])
# # def register():
# #     if DEBUG:
# #         print("Inside register, entering...")

# #     try:
# #         data = request.json

# #         print("Inside register, data:", data)

# #         hashed_password = genHashPass(data.get('password'))

# #         new_user = User(username=data.get('username'),
# #                         password=hashed_password,
# #                         email=data.get('email'),
# #                         created_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))

# #         db.session.merge(new_user)
# #         db.session.commit()

# #         # Verify if user is created
# #         fetched_user = db.session.query(User).filter_by(
# #             email=data.get('email')).first()

# #         if fetched_user:
# #             print("new user id:", fetched_user.id)
# #             # Create user_details for the registered user
# #             db.session.add(User_details(user_id=fetched_user.id,
# #                                         profile_pic=compressImg(
# #                                             'static/images/profile-default-icon.png'),
# #                                         email=fetched_user.email,
# #                                         updated_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')))

# #             # Add basic settings
# #             db.session.add(Settings(user_id=fetched_user.id,
# #                                     auto_apply=False,
# #                                     webscrape_sites='Indeed',
# #                                     match_score_cutoff=45))

# #             db.session.commit()
# #         else:
# #             print("User creation failed")

# #         db.session.close()

# #         return jsonify({"message": "User registered successfully!"}), 200

# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error registering profile: %s", e, exc_info=True)
# #         print("Inside register, Exception raised, reason:", e)

# #         msg = "{reason} User registeration failed!".format(reason=e)
# #         return jsonify({"message": msg}), 500


# # @ routes.route('/login', methods=['GET', 'POST'])
# # def login():

# #     try:
# #         data = request.json

# #         print("Inside login, data:", data)

# #         user = User.query.filter_by(username=data['username']).first()

# #         if user and checkHashPass(user.password, data['password']):
# #             login_user(user)

# #             if DEBUG:
# #                 print("Inside login, current user:", current_user.id)

# #             return jsonify({"message": "User Logged In Successfully!"}), 200
# #         else:
# #             return jsonify({"message": "User Login failed, Check Credentials!"}), 500

# #     except Exception as e:

# #         print("Inside login, Exception raised, reason:", e)

# #         msg = "{reason} User login failed!".format(reason=e)
# #         return jsonify({"message": msg}), 500


# def getRequiredData(userId):
#     response_data = {}

#     # Step-1.1. From user profile: Role, City and Country

#     user = User_details.query.filter_by(user_id=userId).first()
#     response_data["user_id"] = userId
#     response_data["user_role"] = user.role

#     address = Address.query.filter_by(user_id=userId).first()

#     response_data["user_city"] = address.city
#     response_data["user_country"] = address.country

#     # Step-1.2: The webscrape site and match score cutoff from the user settings
#     settings = Settings.query.filter_by(user_id=userId).first()
#     response_data["user_webscrape_site"] = settings.webscrape_sites
#     response_data["user_match_score_cutodd"] = settings.match_score_cutoff

#     # Step-1.3: Resume from user documents
#     resume = Documents.query.filter_by(
#         user_id=userId, filetype='resume').first()
#     response_data["resume"] = resume.data

#     return response_data


# @ routes.route('/fetch_jobs', methods=['POST'])
# @ login_required
# def fetch_jobs():

#     # Step-1: Get the following data for the user:
#     # Step-1.1. From user profile: Role, City and Country
#     # Step-1.2: The webscrape site and match score cutoff from the user settings
#     # Step-1.3: Resume from user documents
#     # Step-2: Scrape the site recieved from step-2:
#     # Step-2.1: Using Role, City and Country fetch the Jobs from the concerned site (fetch in bulk site of 10 jobs)
#     # Step-2.2: Parse the data for each job and get the info
#     # Step-3: for each job fetched:
#     # Step-3.1: Calculate the Match score
#     # Step-3.2. Move the records

#     required_data = {}

#     # Step-1
#     required_data = getRequiredData(current_user.id)

#     # if DEBUG:
#     #     print("required_data:", required_data)

#     # Step-2
#     job_listings = getJobListings(required_data)

#     # if DEBUG:
#     #     print("job_listings:", job_listings)

#     jd_list = get_jd_list(job_listings)

#     # Step-3: Get match score for each job listing
#     similarities_score_list = performSimilarityMatch(
#         required_data.get('resume'), jd_list)

#     print("jd_list size:", len(job_listings),
#           "similarity list size:", len(jd_list))

#     insertJobListings(job_listings, required_data, similarities_score_list)

#     return jsonify({'status': 'success'}), 200


# def insertJobListings(job_listings, required_data, similarities_score_list):
#     if DEBUG:
#         print("Entering insertJobListings:", similarities_score_list)

#     if not job_listings:
#         return jsonify({'status': 'error', 'message': 'No data provided'}), 400

#     user_sel_platform = required_data.get('user_webscrape_site')
#     statuses = ['expired', 'in-progress', 'applied', 'rejected']
#     applied_on_vals = ['20-09-24', '12-02-24', '10-01-24', '06-911-24']

#     try:
#         # Parse JSON data
#         listing_objects = [
#             Application(
#                 job_id=listing['job-id'],
#                 user_id=required_data.get('user_id'),
#                 job_title=listing['job-title'],
#                 company_name=listing['company-name'],
#                 job_desc=listing['job-desc'],
#                 salary=listing['salary'],
#                 location=listing['company-location'],
#                 posted=listing['posted'],
#                 platform=user_sel_platform,  # TODO
#                 applied_on=random.choice(applied_on_vals),  # TODO
#                 match_score=job_match_score * 100,
#                 status=random.choice(statuses),  # TODO
#                 apply_link='link'  # TODO
#             )
#             for listing, job_match_score in zip(job_listings, similarities_score_list)
#         ]

#         if DEBUG:
#             print("listing_objects:", listing_objects)

#         # Bulk insert
#         db.session.bulk_save_objects(listing_objects)
#         db.session.commit()

#         if DEBUG:
#             print("Exiting insertJobListings")

#         return jsonify({'status': 'success', 'message': 'Calls added successfully'}), 200
#     except Exception as e:
#         print("Exception raised in insertJobListings, e:", e)
#         db.session.rollback()
#         return jsonify({'status': 'error', 'message': str(e)}), 500


# # @ routes.route('/get_listings', methods=['GET'])
# # @ login_required
# # def get_listings():
# #     if DEBUG:
# #         print("Entering get_listings...")
# #     user_id = current_user.id
# #     fetched_applications = Application.query.all()

# #     job_description_list = []

# #     for applicaftion in fetched_applications:
# #         # desc = str(applicaftion.job_desc, 'utf-8')
# #         job_description_list.append(applicaftion.job_desc)

# #     # resume_blob = fetch_resume(user_id)
# #     # match_scores = performSimilarityMatch(resume_blob, job_description_list)

# #     applications_data = [
# #         {
# #             'job_id': applicaftion.job_id,
# #             'user': applicaftion.user_id,
# #             'job_title': applicaftion.job_title,
# #             'company_name': applicaftion.company_name,
# #             'job_desc': applicaftion.job_desc,
# #             'salary': applicaftion.salary,
# #             'location': applicaftion.location,
# #             'posted': applicaftion.posted,
# #             'platform': applicaftion.platform,
# #             'applied_on': applicaftion.applied_on,
# #             'match_score': applicaftion.match_score,
# #             'status': applicaftion.status,
# #             'apply_link': applicaftion.apply_link
# #         }
# #         # zip(fetched_applications, match_scores)
# #         for applicaftion in fetched_applications
# #     ]

# #     if DEBUG:
# #         print("Exiting get_listings...")

# #     return jsonify(applications_data)


# @ routes.route('/job-details/<string:job_id>')
# @ login_required
# def job_details(job_id):
#     # fetched_applications = Application.query.all()
#     job_info = {}
#     if DEBUG:
#         print("Inside job_details, job_id:", job_id)

#     fetched_applications = Application.query.filter_by(
#         user_id=current_user.id, job_id=job_id).first()

#     if DEBUG:
#         print("Inside job_details, fetched_applications:",
#               fetched_applications.job_id)

#     job_info = {
#         'job_id': fetched_applications.job_id,
#         'user': fetched_applications.user_id,
#         'job_title': fetched_applications.job_title,
#         'company_name': fetched_applications.company_name,
#         'job_desc': fetched_applications.job_desc,
#         'salary': fetched_applications.salary,
#         'location': fetched_applications.location,
#         'posted': fetched_applications.posted,
#         'platform': fetched_applications.platform,
#         'applied_on': fetched_applications.applied_on,
#         'match_score': fetched_applications.match_score,
#         'status': fetched_applications.status,
#         'apply_link': fetched_applications.apply_link
#     }
#     # JSON response
#     return job_info


# @ routes.route('/scan_resume', methods=['POST'])
# @ login_required
# def scan_resume():
#     try:
#         if DEBUG:
#             print("Entering scan_resume")

#         if 'resumeBrowse' not in request.files:
#             return jsonify(status=400, message='No file part')

#         resume = request.files['resumeBrowse']

#         if resume.filename == '':
#             return jsonify(status=400, message='No selected file')

#         # resume = request.files.get('resume')
#         job_description = request.form.get('job_description')
#         matching_method = request.form.get('matching_method')

#         if not resume or not job_description or not matching_method:
#             return jsonify({"error": "Missing required fields"}), 400

#         resume_content = resume.read()  # Read the file content directly

#         # Assuming extract_text_from_pdf can handle file-like objects or raw content
#         resume_text = extract_text_from_pdf(resume_content)

#         # Save data to temporary table
#         temp_data = TempData(
#             user_id=current_user.id,
#             resume_data=resume_content,
#             resume_filename=secure_filename(resume.filename),
#             resume_text=resume_text,
#             job_description=job_description,
#             matching_method=matching_method,
#             uploaded_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))

#         db.session.add(temp_data)
#         db.session.commit()

#         # Return success response with temp_data id
#         return jsonify({"message": "Resume scanned successfully", "temp_data_id": temp_data.id, "status": 200}), 200

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500


# @ routes.route('/results/<int:temp_data_id>')
# def results(temp_data_id):

#     try:

#         temp_data = TempData.query.filter_by(id=temp_data_id).first()
#         resume = temp_data.resume_text
#         jd = temp_data.job_description

#         if (resume and jd):
#             score = performSimilarityMatch(resume, jd, 1)

#             matches = ["matched text"]
#             resume_text_highlighted = highlight_matches(
#                 temp_data.resume_text, matches)
#             job_description_highlighted = highlight_matches(
#                 temp_data.job_description, matches)

#             match_score = 75  # TODO
#             # Encode resume data to base64
#             resume_base64 = base64.b64encode(
#                 temp_data.resume_data).decode('utf-8')

#             response_data = jsonify({"match_score": match_score, "resume_data": resume_base64,
#                                     "resume_filename": temp_data.resume_filename,
#                                      "resume_text": Markup(json.dumps(resume_text_highlighted)),
#                                      "job_description_text": Markup((job_description_highlighted)),
#                                      "temp_data_id": temp_data.id, "status": 200})
#             return response_data
#         else:
#             print("Resume and jd fetch failed..")
#             return jsonify({"status": 500}), 500
#         #     match_score = 75  # Mock match score  #TODO
#         # # if DEBUG:
#         # #     print("Entering results, temp_data:", temp_data.resume_data)

#         # matches = ["matched text"]

#     except Exception as e:
#         current_app.logger.error(
#             "Error updating profile: %s", e, exc_info=True)
#         print("Exception raised in resume scan result, e:", e)
#         return jsonify({"msg": "failure in getting result", "status": 500})


# # @ routes.route('/', defaults={'path': ''})
# # @ routes.route('/<path:path>')
# # def serve_react_app(path):
# #     print("Inside serve_react_app, path:", path)
# #     if path != "" and os.path.exists('static/' + path):
# #         return send_from_directory('static', path)
# #     else:
# #         return send_from_directory('static', 'index.html')

# # @ routes.route('/get_user_data', methods=['GET'])
# # @ login_required
# # def get_user_data():
# #     try:
# #         user = User.query.get(current_user.id)

# #         if user:
# #             return jsonify({'status': 200, 'username': user.username, 'role': (user.role if hasattr(user, "role") else '')}), 200
# #         else:
# #             return jsonify({'status': 404, 'message': 'user data not found'}), 404
# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error updating profile: %s", e, exc_info=True)
# #         return jsonify({'status': 500, 'message': 'Exception raised in backend:get_user_data'}), 500


# # @routes.route('/get_user_profile', methods=['GET'])
# # @login_required
# # def get_user_profile():
# #     try:
# #         user = User.query.get(current_user.id)

# #         if user:
# #             user_data = {
# #                 'username': user.username,
# #                 'role': user.role if hasattr(user, "role") else ''
# #             }

# #             user_detail = User_details.query.filter_by(
# #                 user_id=current_user.id).first()

# #             if user_detail.profile_pic:
# #                 decompressed_image_data = zlib.decompress(
# #                     user_detail.profile_pic)
# #                 # image_url = f'/get_image'
# #                 image_url = f'http://localhost:5000/get_image'
# #                 user_data['imageUrl'] = image_url
# #             else:
# #                 user_data['imageUrl'] = None

# #             return jsonify({'status': 200, 'data': user_data}), 200
# #         else:
# #             return jsonify({'status': 404, 'message': 'User data not found'}), 404
# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error fetching profile data: %s", e, exc_info=True)
# #         return jsonify({'status': 500, 'message': 'Exception raised in backend:get_user_profile'}), 500


# # @ routes.route('/get_image', methods=['GET'])
# # @ login_required
# # def get_image():
# #     try:
# #         user = User_details.query.filter_by(user_id=current_user.id).first()

# #         if user and user.profile_pic:
# #             # Decompress the image data
# #             decompressed_image_data = zlib.decompress(user.profile_pic)
# #             # Adjust MIME type if needed
# #             return Response(decompressed_image_data, mimetype='image/jpeg')
# #         else:
# #             return jsonify({'status': 404, 'message': 'Image not found'}), 404
# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error updating profile: %s", e, exc_info=True)

# #         return jsonify({'status': 500, 'message': 'Exception raised in backend:get_image'}), 500


# # @routes.route('/upload_image', methods=['POST'])
# # @login_required
# # def upload_image():
# #     if DEBUG:
# #         print("Inside upload_image")

# #     if 'image' not in request.files:
# #         return jsonify({'status': 400, 'message': 'No file part'}), 400

# #     file = request.files['image']

# #     if file.filename == '':
# #         return jsonify({'status': 400, 'message': 'No selected file'}), 400

# #     if file:
# #         user_id = current_user.id
# #         user = User.query.get(user_id)

# #         if user:
# #             try:
# #                 user_details = User_details.query.get(user_id)
# #                 # Save the compressed image data to the database
# #                 user_details.profile_pic = compressImg(file)
# #                 db.session.commit()

# #                 if DEBUG:
# #                     print("Inside upload_image, commit")

# #                 # Generate image URL or path
# #                 image_url = f'/get_image'
# #                 return jsonify({'status': 200, 'imageUrl': image_url}), 200
# #             except Exception as e:
# #                 return jsonify({'status': 500, 'message': str(e)}), 500
# #         else:
# #             return jsonify({'status': 404, 'message': 'User not found'}), 404
# #     else:
# #         return jsonify({'status': 400, 'message': 'File type not allowed'}), 400


# # @ routes.route('/upload_image', methods=['GET', 'POST'])
# # @ login_required
# # def upload_image():
# #     if DEBUG:
# #         print("Inside upload_image")

# #     if 'image' not in request.files:
# #         return jsonify({'status': 400, 'message': 'No file part'}), 400

# #     file = request.files['image']

# #     if file.filename == '':
# #         return jsonify({'status': 400, 'message': 'No selected file'}), 400

# #     if file:
# #         user_id = current_user.id
# #         user = User.query.get(user_id)

# #         if user:
# #             try:
# #                 # Save the compressed image data to the database
# #                 user.profile_pic = compressImg(file)
# #                 db.session.commit()

# #                 if DEBUG:
# #                     print("Inside upload_image, commit")

# #                 # Generate image URL or path
# #                 image_url = f'/get_image'
# #                 return jsonify({'status': 200, 'imageUrl': image_url}), 200
# #             except Exception as e:
# #                 return jsonify({'status': 500, 'message': str(e)}), 500
# #         else:
# #             return jsonify({'status': 404, 'message': 'User not found'}), 404
# #     else:
# #         return jsonify({'status': 400, 'message': 'File type not allowed'}), 400
# #     if 'image' not in request.files:
# #         return jsonify({'status': 400, 'message': 'No file part'}), 400

# #     file = request.files['image']

# #     if file.filename == '':
# #         return jsonify({'status': 400, 'message': 'No selected file'}), 400

# #     if file:
# #         user_id = current_user.id
# #         user = User.query.get(user_id)

# #         if user:
# #             # Save the compressed image data to the database
# #             user.profile_pic = compressImg(file)
# #             db.session.commit()

# #             # Generate image URL or path
# #             image_url = f'http://localhost:5000/get_image'
# #             return jsonify({'status': 200, 'imageUrl': image_url}), 200
# #         else:
# #             return jsonify({'status': 404, 'message': 'User not found'}), 404
# #     else:
# #         return jsonify({'status': 400, 'message': 'File type not allowed'}), 400


# # @ routes.route('/get_profile', methods=['GET'])
# # @ login_required
# # def get_profile():
# #     try:
# #         user = User.query.filter_by(id=current_user.id).first()
# #         if user is None:
# #             return jsonify({"error": "User not found"}), 404

# #         # Fetch user details
# #         user_details = User_details.query.filter_by(
# #             user_id=user.id).first()
# #         user_info = {
# #             "first_name": getattr(user_details, "first_name", ""),
# #             "last_name": getattr(user_details, "last_name", ""),
# #             "email": getattr(user_details, "email", ""),
# #             "phone_number": getattr(user_details, "phone_number", ""),
# #             "role": getattr(user_details, "role", ""),
# #             "profile_pic": base64.b64encode(user_details.profile_pic).decode('utf-8') if user_details and user_details.profile_pic else "",
# #         }

# #         # Fetch address details
# #         address = Address.query.filter_by(user_id=current_user.id).first()

# #         address_info = {
# #             "street": getattr(address, "street", ""),
# #             "city": getattr(address, "city", ""),
# #             "state": getattr(address, "state", ""),
# #             "country": getattr(address, "country", ""),
# #             "zip": getattr(address, "zip", "")
# #         }

# #         # Fetch documents list
# #         user_documents = Documents.query.filter_by(
# #             user_id=current_user.id).all()

# #         documents_list = []
# #         for doc in user_documents:
# #             documents_list.append({
# #                 "id": doc.id,
# #                 "filename": doc.filename,
# #                 "filetype": doc.filetype,
# #                 "uploaded_on": doc.uploaded_on.strftime('%Y-%m-%d %H:%M:%S')
# #             })

# #         # Fetch notification settings
# #         notification_settings = NotificationSettings.query.filter_by(
# #             user_id=current_user.id).first()
# #         notification_info = {
# #             "receive_email_alerts": notification_settings.receive_email_alerts if notification_settings else False,
# #             "job_match_alerts": notification_settings.job_match_alerts if notification_settings else False,
# #             "application_status_updates": notification_settings.application_status_updates if notification_settings else False,
# #             "newsletter_subscription": notification_settings.newsletter_subscription if notification_settings else False,
# #             "receive_sms_alerts": notification_settings.receive_sms_alerts if notification_settings else False,
# #             "sms_job_match_alerts": notification_settings.sms_job_match_alerts if notification_settings else False,
# #             "sms_application_status_updates": notification_settings.sms_application_status_updates if notification_settings else False,
# #             "enable_push_notifications": notification_settings.enable_push_notifications if notification_settings else False,
# #             "push_job_match_alerts": notification_settings.push_job_match_alerts if notification_settings else False,
# #             "push_application_status_updates": notification_settings.push_application_status_updates if notification_settings else False,
# #             "frequency": notification_settings.frequency if notification_settings else "",
# #             "do_not_disturb": notification_settings.do_not_disturb if notification_settings else False,
# #             "start_time": notification_settings.start_time if notification_settings else "",
# #             "end_time": notification_settings.end_time if notification_settings else "",
# #         }

# #         # Fetch settings
# #         settings = Settings.query.filter_by(user_id=current_user.id).first()
# #         settings_info = {
# #             "auto_apply": settings.auto_apply if settings else False,
# #             "job_fetching_schedule": settings.job_fetching_schedule.isoformat() if settings and settings.job_fetching_schedule else "",
# #             "webscrape_sites": settings.webscrape_sites if settings else "",
# #             "match_score_cutoff": settings.match_score_cutoff if settings else 0
# #         }

# #         response = {
# #             "user_info": user_info,
# #             "address": address_info,
# #             "notification_settings": notification_info,
# #             "settings": settings_info,
# #             "documents": documents_list
# #         }

# #         return jsonify(response), 200

# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error updating profile: %s", e, exc_info=True)
# #         print(f"Exception occurred: {e}")
# #         return jsonify({"error": "An error occurred while fetching the profile"}), 500


# # @ routes.route('/update_profile', methods=['POST'])
# # @ login_required
# # def update_profile():
# #     try:
# #         data = request.form.to_dict()

# #         if (data != None):
# #             # json_data = json.loads(data)
# #             if data.get('user_info'):

# #                 user_data = json.loads(data.get('user_info', '{}'))

# #                 # if DEBUG:
# #                 #     print("Inside user_info, user_data:", user_data)

# #                 user = User.query.filter_by(id=current_user.id).first()

# #                 if not user:
# #                     return jsonify({'error': 'No user exist'}), 500

# #                 user_details = User_details.query.filter_by(
# #                     user_id=user.id).first()

# #                 user_details.first_name = user_data.get('first_name')
# #                 user_details.last_name = user_data.get('last_name')
# #                 user_details.role = user_data.get('role')
# #                 user_details.phone_number = user_data.get('phone_number')
# #                 user_details.updated_on = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

# #             if data.get('address'):
# #                 address_data = json.loads(data.get('address', '{}'))

# #                 # if DEBUG:
# #                 #     print("Inside address, address_data:", address_data)

# #                 # for address in address_data:
# #                 addr = Address.query.filter_by(
# #                     user_id=user.id).first()

# #                 if not addr:
# #                     addr = Address(user_id=user.id,
# #                                    street=address_data.get('street'),
# #                                    city=address_data.get('city'),
# #                                    state=address_data.get('state'),
# #                                    country=address_data.get('country'),
# #                                    zip=address_data.get('zip')
# #                                    )
# #                     db.session.add(addr)
# #                 else:
# #                     addr.street = address_data.get('street'),
# #                     addr.city = address_data.get('city'),
# #                     addr.state = address_data.get('state'),
# #                     addr.country = address_data.get('country'),
# #                     addr.zip = address_data.get('zip')

# #             if data['settings'] != 'undefined':
# #                 settings_data = json.loads(data.get('settings', '{}'))

# #                 if DEBUG:
# #                     print("settings_data", settings_data)

# #                 settings = Settings.query.filter_by(user_id=user.id).first()

# #                 if not settings:
# #                     settings = Settings(user_id=user.id)
# #                     db.session.add(settings)

# #                 for key, value in settings_data.items():
# #                     if key == "job_fetching_schedule" and value == "":
# #                         value = None  # Convert empty string to None

# #                     setattr(settings, key, value)

# #             if data.get('notification_settings') != 'undefined':
# #                 notification_settings_data = json.loads(
# #                     data.get('notification_settings', '{}'))

# #                 if DEBUG:
# #                     print("Inside notification_settings, notification_settings_data",
# #                           notification_settings_data)

# #                 # Fetch or create NotificationSettings record for the user
# #                 notification_settings = NotificationSettings.query.filter_by(
# #                     user_id=user.id).first()
# #                 if not notification_settings:
# #                     if DEBUG:
# #                         print("record is not present")

# #                     notification_settings = NotificationSettings(
# #                         user_id=user.id)
# #                     db.session.add(notification_settings)

# #                 # Update the NotificationSettings record with the new data
# #                 for key, value in notification_settings_data.items():
# #                     if DEBUG:
# #                         print("record is present, key:",
# #                               key, ", value:", value)
# #                     if hasattr(notification_settings, key):
# #                         setattr(notification_settings, key, value)

# #             # Check if resume file is in the request
# #             if 'resume' in request.files:
# #                 resume_file = request.files['resume']
# #                 resume_filename = secure_filename(resume_file.filename)
# #                 resume_data = resume_file.read()

# #                 # Query for existing resume
# #                 existing_resume = Documents.query.filter_by(
# #                     user_id=user.id, filetype='resume').first()

# #                 if existing_resume:
# #                     # Update existing resume record
# #                     existing_resume.filename = resume_filename
# #                     existing_resume.data = resume_data
# #                     existing_resume.uploaded_on = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
# #                 else:
# #                     # Create new resume record
# #                     resume = Documents(
# #                         user_id=user.id,
# #                         filename=resume_filename,
# #                         filetype='resume',
# #                         data=resume_data,
# #                         uploaded_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
# #                     )
# #                     db.session.add(resume)

# #             # Check if cover letter file is in the request
# #             if 'coverLetter' in request.files:
# #                 cover_file = request.files['coverLetter']
# #                 cover_filename = secure_filename(cover_file.filename)
# #                 cover_data = cover_file.read()

# #                 # Query for existing cover letter
# #                 existing_cover_letter = Documents.query.filter_by(
# #                     user_id=user.id, filetype='coverLetter').first()

# #                 if existing_cover_letter:
# #                     # Update existing cover letter record
# #                     existing_cover_letter.filename = cover_filename
# #                     existing_cover_letter.data = cover_data
# #                     existing_cover_letter.uploaded_on = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
# #                 else:
# #                     # Create new cover letter record
# #                     cover_letter = Documents(
# #                         user_id=user.id,
# #                         filename=cover_filename,
# #                         filetype='coverLetter',
# #                         data=cover_data,
# #                         uploaded_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
# #                     )
# #                     db.session.add(cover_letter)

# #             # Commit the changes to the database
# #             db.session.commit()
# #             db.session.close()

# #             if DEBUG:
# #                 print("Exiting profile updation after commit..")

# #         else:
# #             print("Data was null so Exiting profile updation without commit..")

# #         return jsonify({'message': 'Profile updated successfully'}), 200

# #     except Exception as e:
# #         current_app.logger.error(
# #             "Error updating profile: %s", e, exc_info=True)
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500


# @ routes.route('/logout', methods=['POST'])
# @ login_required
# def logout():
#     logout_user()
#     return jsonify({"message": "Logged out successfully"}), 200

#     # @routes.route('/')
#     # def index():
#     #     if DEBUG:
#     #         print("Inside index, entering...")

#     #     # login_form = LoginForm()

#     #     # success = session.pop('registration_success', None)

#     #     if DEBUG:
#     #         print("Inside index, exiting...")

#     #     # , login_form=login_form, success=success)
#     #     return send_from_directory('static', 'index.html')

#     # @routes.route('/home')
#     # def home():
#     #     if DEBUG:
#     #         print("Inside home, entering...")

#     #     # login_form = LoginForm()

#     #     # success = session.pop('registration_success', None)

#     #     if DEBUG:
#     #         print("Inside home, exiting...")

#     #     # , login_form=login_form, success=success)
#     #     return send_from_directory('static', 'home.html')

#     # Serve other static files (like CSS and JS) directly

#     # @routes.route('/<path:filename>')
#     # def serve_static(filename):
#     #     try:
#     #         print("filename:", filename)
#     #         return send_from_directory('static', filename)
#     #     except FileNotFoundError:
#     #         abort(404)

#     # @routes.route('/upload_resume', methods=['POST'])
#     # @login_required
#     # def upload_resume():
#     #     if DEBUG:
#     #         print("Entering upload_file...")

#     #     if 'resume' not in request.files:
#     #         return redirect(request.url)

#     #     file = request.files['resume']
#     #     if file.filename == '':
#     #         return redirect(request.url)

#     #     if file:
#     #         new_file = Resume(user_id=current_user.id,
#     #                           filename=file.filename, data=file.read())
#     #         db.session.add(new_file)
#     #         db.session.commit()
#     #         return 'File uploaded successfully'

#     # @routes.route('/logout')
#     # @login_required
#     # def logout():
#     #     logout_user()
#     #     session.pop('loggedin', None)
#     #     session.pop('username', None)

#     #     return redirect(url_for('index'))

#     # @routes.route('/register', methods=['GET', 'POST'])
#     # def register():
#     #     if DEBUG:
#     #         print("Inside register, entering...")

#     #     form_register = RegisterForm(prefix='register')
#     #     login_form = LoginForm()

#     #     # if form.validate_on_submit():
#     #     if form_register.submit.data:
#     #         if DEBUG:
#     #             print("Inside register, validate_on_submit...")
#     #         try:
#     #             hashed_password = bcrypt.generate_password_hash(
#     #                 form_register.password.data)
#     #             new_user = User(username=form_register.username.data,
#     #                             password=hashed_password,
#     #                             email=form_register.email.data)
#     #             if DEBUG:
#     #                 print("Inside register, new_user:", new_user)

#     #             db.session.merge(new_user)
#     #             db.session.commit()
#     #             session['registration_success'] = True
#     #             db.session.close()

#     #             if DEBUG:
#     #                 print("Inside register, data committed...")

#     #             return redirect(url_for('index'))

#     #         except Exception as e:
#     #             reason = e.orig.args[1]

#     #             print("Inside register, Exception raised, reason:", reason)

#     #             session['registration_success'] = False

#     #             if "Duplicate entry" in reason:
#     #                 print("Duplicate entry")

#     #                 return render_template('index.html', form_register=form_register, success=False)

#     #     if DEBUG:
#     #         print("Inside register, exiting...")

#     #     return render_template('index.html', form_register=form_register, login_form=login_form)

#     # @routes.route('/home')
#     # # @login_required
#     # def home():
#     #     if DEBUG:
#     #         print("Inside home, entering...")

#     #     # print("current user:", current_user.id)

#     #     if DEBUG:
#     #         print("Inside home, exiting...")

#     #     return send_from_directory('static', 'home.html')

#     # @routes.route('/dashboard')
#     # @login_required
#     # def dashboard():

#     #     fetched_applications = Application.query.filter_by(
#     #         user_id=current_user.id)

#     #     return render_template('dashboard.html', fetched_applications=fetched_applications)

#     # @routes.route('/settings', methods=['GET', 'POST'])
#     # @login_required
#     # def settings():
#     #     user_id = current_user.id
#     #     user_settings = Settings.query.filter_by(user_id=user_id).first()

#     #     if request.method == 'POST':
#     #         try:
#     #             auto_apply = 'auto_apply' in request.form
#     #             job_fetching_schedule = datetime.strptime(
#     #                 request.form['job_fetching_schedule'], '%Y-%m-%dT%H:%M')
#     #             webscrape_sites = ','.join(request.form.getlist('webscrape_sites'))
#     #             match_score_cutoff = int(request.form['match_score_cutoff'])

#     #             if user_settings:
#     #                 user_settings.auto_apply = auto_apply
#     #                 user_settings.job_fetching_schedule = job_fetching_schedule
#     #                 user_settings.webscrape_sites = webscrape_sites
#     #                 user_settings.match_score_cutoff = match_score_cutoff
#     #             else:
#     #                 user_settings = Settings(user_id=user_id, auto_apply=auto_apply,
#     #                                          job_fetching_schedule=job_fetching_schedule, webscrape_sites=webscrape_sites,
#     #                                          match_score_cutoff=match_score_cutoff)
#     #                 db.session.add(user_settings)

#     #             db.session.commit()
#     #             flash('Settings updated successfully', 'success')
#     #         except Exception as e:
#     #             db.session.rollback()
#     #             flash('Failed to update settings', 'danger')

#     #         return redirect(url_for('settings'))

#     #     return render_template('settings.html', settings=user_settings)

#     # @routes.route('/fetch_jobs', methods=['POST'])
#     # @login_required
#     # def fetch_jobs():
#     #     job_listings = getJobListings()

#     #     insertJobListings(job_listings)

#     #     return jsonify({'status': 'success'}), 200

#     # @routes.route('/analytics')
#     # @login_required
#     # def analytics():
#     #     if DEBUG:
#     #         print("Entering analytics...")

#     #     return render_template('analytics.html')

#     # @routes.route('/archive')
#     # @login_required
#     # def archive():
#     #     if DEBUG:
#     #         print("Entering archive...")

#     #     fetched_applications = Application.query.all()

#     #     job_description_list = []

#     #     for applicaftion in fetched_applications:
#     #         # desc = str(applicaftion.job_desc, 'utf-8')
#     #         job_description_list.append(applicaftion.job_desc)

#     #     # match_scores = performSimilarityMatch(job_description_list)

#     #     applications_data = [
#     #         {
#     #             'job_id': applicaftion.job_id,
#     #             'user': applicaftion.user_id,
#     #             'job_title': applicaftion.job_title,
#     #             'company_name': applicaftion.company_name,
#     #             'job_desc': applicaftion.job_desc,
#     #             'salary': applicaftion.salary,
#     #             'location': applicaftion.location,
#     #             'posted': applicaftion.posted,
#     #             'platform': applicaftion.platform,
#     #             'applied_on': applicaftion.applied_on,
#     #             'match_score': applicaftion.match_score,
#     #             'status': applicaftion.status,
#     #             'apply_link': applicaftion.apply_link
#     #         }
#     #         for applicaftion in fetched_applications
#     #     ]

#     #     if DEBUG:
#     #         print("Exiting archive...")

#     #     return render_template('archives.html', applications_data=jsonify(applications_data))

#     # @routes.route('/get_listings', methods=['GET'])
#     # @login_required
#     # def get_listings():
#     #     if DEBUG:
#     #         print("Entering get_listings...")
#     #     user_id = current_user.id
#     #     fetched_applications = Application.query.all()

#     #     job_description_list = []

#     #     for applicaftion in fetched_applications:
#     #         # desc = str(applicaftion.job_desc, 'utf-8')
#     #         job_description_list.append(applicaftion.job_desc)

#     #     resume_blob = fetch_resume(user_id)
#     #     match_scores = performSimilarityMatch(resume_blob, job_description_list)

#     #     applications_data = [
#     #         {
#     #             'job_id': applicaftion.job_id,
#     #             'user': applicaftion.user_id,
#     #             'job_title': applicaftion.job_title,
#     #             'company_name': applicaftion.company_name,
#     #             'job_desc': applicaftion.job_desc,
#     #             'salary': applicaftion.salary,
#     #             'location': applicaftion.location,
#     #             'posted': applicaftion.posted,
#     #             'platform': applicaftion.platform,
#     #             'applied_on': applicaftion.applied_on,
#     #             'match_score': round(mscore * 100),
#     #             'status': applicaftion.status,
#     #             'apply_link': applicaftion.apply_link
#     #         }
#     #         for applicaftion, mscore in zip(fetched_applications, match_scores)
#     #     ]

#     #     if DEBUG:
#     #         print("Exiting get_listings...")

#     #     return jsonify(applications_data)

#     # @routes.route('/job-details/<string:job_id>')
#     # @login_required
#     # def job_details(job_id):
#     #     # fetched_applications = Application.query.all()
#     #     job_info = {}
#     #     if DEBUG:
#     #         print("Inside job_details, job_id:", job_id)

#     #     fetched_applications = Application.query.filter_by(
#     #         user_id=current_user.id, job_id=job_id).first()

#     #     if DEBUG:
#     #         print("Inside job_details, fetched_applications:",
#     #               fetched_applications.job_id)

#     #     job_info = {
#     #         'job_id': fetched_applications.job_id,
#     #         'user': fetched_applications.user_id,
#     #         'job_title': fetched_applications.job_title,
#     #         'company_name': fetched_applications.company_name,
#     #         'job_desc': fetched_applications.job_desc,
#     #         'salary': fetched_applications.salary,
#     #         'location': fetched_applications.location,
#     #         'posted': fetched_applications.posted,
#     #         'platform': fetched_applications.platform,
#     #         'applied_on': fetched_applications.applied_on,
#     #         'match_score': fetched_applications.match_score,
#     #         'status': fetched_applications.status,
#     #         'apply_link': fetched_applications.apply_link
#     #     }
#     #     # JSON response
#     #     return job_info

#     # @routes.route('/uploads/<filename>')
#     # def uploaded_file(filename):
#     #     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

#     # @routes.route('/generate_cover_letter', methods=['POST'])
#     # def generate_cover_letter():
#     #     if request.is_json:
#     #         data = request.json
#     #         resume_text = data.get('resume_text')
#     #         job_description_text = data.get('job_description_text')

#     #         model_name = "gpt2"  # You can choose a TensorFlow-compatible model

#     #         tokenizer = setup_tokenizer(model_name)
#     #         model = TFAutoModelForCausalLM.from_pretrained(model_name)

#     #         prompt = (
#     #             "Generate a cover letter based on the following resume and job description:\n\n"
#     #             f"Resume:\n{resume_text}\n\n"
#     #             f"Job Description:\n{job_description_text}\n\n"
#     #             "Cover Letter:"
#     #         )

#     #         # Tokenize input prompt
#     #         inputs = tokenizer(prompt, return_tensors="tf",
#     #                            max_length=512, truncation=True, padding="max_length")

#     #         # Ensure attention_mask is included
#     #         attention_mask = inputs["attention_mask"]
#     #         input_ids = inputs["input_ids"]

#     #         # Generate text
#     #         outputs = model.generate(input_ids, attention_mask=attention_mask, max_length=1000,
#     #                                  num_return_sequences=1, pad_token_id=tokenizer.pad_token_id)

#     #         # Decode generated text
#     #         cover_letter = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     #         # return cover_letter

#     #         # response = openai.ChatCompletion.create(
#     #         #     model="gpt-4-turbo",
#     #         #     messages=[
#     #         #         {"role": "system", "content": "You are a helpful assistant."},
#     #         #         {"role": "user", "content": prompt}
#     #         #     ],
#     #         #     max_tokens=300,
#     #         #     temperature=0.7,
#     #         #     n=1,
#     #         #     stop=None
#     #         # )

#     #         # cover_letter = response.choices[0].message['content'].strip()

#     #         # return jsonify({"cover_letter": cover_letter})
#     #         # # Generate cover letter using LLM or your logic
#     #         # cover_letter = generate_cover_letter_from_text(
#     #         #     resume_text, job_description_text)
#     #         print("cover_letter:", cover_letter)
#     #         return jsonify({'cover_letter': cover_letter})
#     #     else:
#     #         return 'Unsupported Media Type', 415
