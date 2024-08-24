package com.capstone.backend.user;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.backend.userDetails.UserDetails;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
    private ImageUploadService imageUploadService;
	
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
	
//	@GetMapping("/get_user_profile")
//	public ResponseEntity<?> get_user_profile() {
//		List ret = new ArrayList<>();
//		String message ="";
//		int status = 200;
//		
//		try {
//		
//			message = userService.getUserProfile();//userId);
//			return ResponseEntity.ok().body("{\"message\":\"" + message + "\"}");
//		
//		} catch (Exception ex) {
//			message = "Fetch user profile Failed, " + ex.getMessage();
//			status = 500;
//		}
//		return ResponseEntity.ok().body("{\"message\":\"" + message + "\", \"status\":\"" + status + "\"}");
//	}
	
	@GetMapping("/get_profile")
    public ResponseEntity<Map<String, Object>> getProfile() {
        try {
        	System.out.print("Entering getProfile...");
            Map<String, Object> profile = profileService.getProfile();
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            // Log error and return error response
            // Use logger in actual implementation
            System.err.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while fetching the profile"));
        }
    }
	
	@GetMapping("/get_user_profile")
    @PreAuthorize("isAuthenticated()")  // Spring Security annotation for login required
    public ResponseEntity<Map<String, Object>> getUserProfile() {
        try {
            Map<String, Object> profileData = profileService.getUserProfile();
            return new ResponseEntity<>(profileData, HttpStatus.OK);
        } catch (Exception e) {
            // Log error and return error response
            // Use logger in actual implementation
            System.err.println("Error fetching profile data: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", 500);
            errorResponse.put("message", "Exception raised in backend:get_user_profile");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/upload_image")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile file,
                                                           @AuthenticationPrincipal UserDetails userDetails) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", 400, "message", "No file part"));
        }

        if (file.getOriginalFilename().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", 400, "message", "No selected file"));
        }

        Map<String, Object> response = imageUploadService.uploadImage(file, userDetails.getId());
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }
}