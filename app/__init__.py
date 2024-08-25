from flask import Flask, jsonify, request


def create_app():

    app = Flask(__name__)

    # Configuration settings
    # app.config.from_object('config.Config')

    # migrate = Migrate(app, db)

    # Initialize Bcrypt with the Flask app
    # bcrypt.init_app(app)
    # Initialize the database with the app
    # db.init_app(app)

    # from .models import User, User_details
    # with app.app_context():
    #     db.create_all()

    #     # Check for existing users
    #     if User.query.count() == 0:
    #         # Create first user as admin

    #         # generate_password_hash("admin")))
    #         new_user = User(username="admin", password=genHashPass("admin"),
    #                         email="admin@gmail.com",
    #                         created_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))

    #         db.session.add(new_user)
    #         db.session.commit()

    #         db.session.add(User_details(user_id=new_user.id,
    #                                     profile_pic=compressImg(
    #                                         'static/images/profile-default-icon.png'),
    #                                     email=new_user.email,
    #                                     updated_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')))
    #         db.session.commit()
    #         db.session.close()
    # db.session.add(User('admin', 'admin@example.com'))
    # db.session.add(User('guest', 'guest@example.com'))

    # Setup logging
    # logging.basicConfig(level=logging.DEBUG)

    # Initialize the login manager
    # login_manager.init_app(app)
    # # Redirects to login page if not logged in
    # login_manager.login_view = 'routes.login'
    # login_manager.login_message_category = 'info'

    # @login_manager.user_loader
    # def load_user(id):
    #     with app.app_context():
    #         from .models import User
    #         return User.query.get(int(id))

    # Enable CORS for all routes
    # CORS(app)
    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Register the Blueprint with the app
    with app.app_context():
        # Import the routes module at the end to avoid circular imports
        from .routes import routes
        app.register_blueprint(routes)

    return app
