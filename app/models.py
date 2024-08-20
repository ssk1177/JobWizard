from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, LargeBinary
from . import db


class User(UserMixin, db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(55), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    created_on = Column(db.DateTime, nullable=False)

    addresses = db.relationship('Address', backref='user', lazy=True)
    socials = db.relationship('Social', backref='user', lazy=True)
    documents = db.relationship('Documents', backref='user', lazy=True)
    applications = db.relationship('Application', backref='user', lazy=True)
    temp_data = db.relationship('TempData', backref='user', lazy=True)
    settings = db.relationship(
        'Settings', uselist=False, backref='user', lazy=True)
    notificationSettings = db.relationship(
        'NotificationSettings', uselist=False, backref='user', lazy=True)


class User_details(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)
    email = Column(String(255), unique=True, nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    phone_number = Column(String(20))
    role = Column(String(50))
    profile_pic = Column(LargeBinary)
    updated_on = Column(db.DateTime, nullable=False)


class TempData(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(
        'user.id'), nullable=False)
    resume_filename = Column(String(150), nullable=False)
    resume_data = Column(LargeBinary, nullable=False)
    resume_text = Column(db.Text, nullable=False)
    job_description = Column(db.Text, nullable=False)
    matching_method = Column(String(50), nullable=False)
    uploaded_on = Column(db.DateTime, nullable=False)


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(100))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    zip = db.Column(db.String(10))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)


class Social(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)
    github = Column(String(100))
    linkedin = Column(String(100))


class Documents(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(
        'user.id'), nullable=False)
    filename = Column(String(200))
    filetype = Column(String(200))
    data = Column(db.LargeBinary)
    uploaded_on = Column(db.DateTime)


class NotificationSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receive_email_alerts = db.Column(db.Boolean)
    job_match_alerts = db.Column(db.Boolean)
    application_status_updates = db.Column(db.Boolean)
    newsletter_subscription = db.Column(db.Boolean)
    receive_sms_alerts = db.Column(db.Boolean)
    sms_job_match_alerts = db.Column(db.Boolean)
    sms_application_status_updates = db.Column(db.Boolean)
    enable_push_notifications = db.Column(db.Boolean)
    push_job_match_alerts = db.Column(db.Boolean)
    push_application_status_updates = db.Column(db.Boolean)
    frequency = db.Column(db.String(10))
    do_not_disturb = db.Column(db.Boolean)
    start_time = db.Column(db.String(5))
    end_time = db.Column(db.String(5))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)


class Application(db.Model):
    job_id = Column(String(250), primary_key=True)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    job_title = Column(String(250), nullable=False)
    company_name = Column(String(250), nullable=False)
    job_desc = Column(String(250), nullable=False)
    salary = Column(String(250))
    location = Column(String(250), nullable=False)
    posted = Column(String(250), nullable=False)
    platform = Column(String(250), nullable=False)
    applied_on = Column(String(50), nullable=False)
    match_score = Column(Integer, nullable=False)
    status = Column(String(250), nullable=False)
    apply_link = Column(String(250), nullable=False)


class Settings(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)
    auto_apply = Column(db.Boolean, default=False)
    job_fetching_schedule = Column(db.DateTime)
    webscrape_sites = Column(String(255))
    match_score_cutoff = Column(Integer)
