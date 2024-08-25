package com.capstone.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;
	
	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody LoginRequest data) {
		
		try {
			String message = userService.login(data);
			return ResponseEntity.ok().body("{\"message\":\"" + message + "\"}");
		} catch (Exception ex) {
			String errorMsg = ex.getMessage() + ", User Login failed";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"" + errorMsg + "\"}");
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User newUser) {
		
//		if DEBUG:
//	        print("Inside register, entering...")
//
//	    try:
//	        data = request.json
//
//	        print("Inside register, data:", data)
//
//	        hashed_password = genHashPass(data.get('password'))
//
//	        new_user = User(username=data.get('username'),
//	                        password=hashed_password,
//	                        email=data.get('email'),
//	                        created_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
//
//	        db.session.merge(new_user)
//	        db.session.commit()
//
//	        # Verify if user is created
//	        fetched_user = db.session.query(User).filter_by(
//	            email=data.get('email')).first()
//
//	        if fetched_user:
//	            print("new user id:", fetched_user.id)
//	            # Create user_details for the registered user
//	            db.session.add(User_details(user_id=fetched_user.id,
//	                                        profile_pic=compressImg(
//	                                            'static/images/profile-default-icon.png'),
//	                                        email=fetched_user.email,
//	                                        updated_on=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')))
//
//	            # Add basic settings
//	            db.session.add(Settings(user_id=fetched_user.id,
//	                                    auto_apply=False,
//	                                    webscrape_sites='Indeed',
//	                                    match_score_cutoff=45))
//
//	            db.session.commit()
//	        else:
//	            print("User creation failed")
//
//	        db.session.close()
//
//	        return jsonify({"message": "User registered successfully!"}), 200
//
//	    except Exception as e:
//	        current_app.logger.error(
//	            "Error registering profile: %s", e, exc_info=True)
//	        print("Inside register, Exception raised, reason:", e)
//
//	        msg = "{reason} User registeration failed!".format(reason=e)
//	        return jsonify({"message": msg}), 500
		
		String message  = "";
		int status = 200;
		try {
			if(userService.isUserExist(newUser.getUsername(), newUser.getEmail())) {
				message = "User exist, try with different email or username";
				status = 500;
			} else {
				userRepo.save(newUser);
				message = "User registered Successfully!!";
			}
		} catch (Exception ex) {
			message = "User registeration Failed, " + ex.getMessage();
			status = 500;
		}
		return ResponseEntity.ok().body("{\"message\":\"" + message + "\", \"status\":\"" + status + "\"}");
	}
}