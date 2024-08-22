package com.capstone.backend.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
//	@Autowired
//	private UserRepository userRepo;
	
//	@PostMapping("/register")
//	public ResponseEntity<?> register(@RequestBody User newUser) {
//
//		String message  = "";
//		int status = 200;
//		try {
//			if(userService.isUserExist(newUser.getUsername(), newUser.getEmail())) {
//				message = "User exist, try with different email or username";
//				status = 500;
//			} else {
//				message = userService.registerUser(newUser);
//
//				//message = "User registered Successfully!!";
//			}
//		} catch (Exception ex) {
//			message = "User registeration Failed, " + ex.getMessage();
//			status = 500;
//		}
//		return ResponseEntity.ok().body("{\"message\":\"" + message + "\", \"status\":\"" + status + "\"}");
//	}
	
//	@PostMapping("/login")
//	public ResponseEntity<?> Login(@RequestBody LoginRequest data) {
//		
//		try {
//			String message = userService.login(data);
//			return ResponseEntity.ok().body("{\"message\":\"" + message + "\"}");
//		} catch (Exception ex) {
//			String errorMsg = ex.getMessage() + ", User Login failed";
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"" + errorMsg + "\"}");
//		}
//	}
	
	@GetMapping("/get_user_profile")
	public ResponseEntity<?> get_user_profile() {
		List ret = new ArrayList<>();
		String message ="";
		int status = 200;
		
		try {
		
			message = userService.getUserProfile();//userId);
			return ResponseEntity.ok().body("{\"message\":\"" + message + "\"}");
		
		} catch (Exception ex) {
			message = "Fetch user profile Failed, " + ex.getMessage();
			status = 500;
		}
		return ResponseEntity.ok().body("{\"message\":\"" + message + "\", \"status\":\"" + status + "\"}");
	}
	
	
}