package com.capstone.backend.user;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.backend.userDetails.UserDetails;

import jakarta.transaction.Transactional;

@RestController
public class UserController {
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
    private ImageService imageService;
	
	@GetMapping("/get_image")
    public ResponseEntity<?> getImage() {
        try {
        	System.out.print("Entering getProfile...");
            return imageService.getImage();
        } catch (Exception e) {
            // Log error and return error response
            // Use logger in actual implementation
            System.err.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while fetching the profile"));
        }
    }
	
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
	
//	@GetMapping("/get_user_profile")
//    @PreAuthorize("isAuthenticated()")  // Spring Security annotation for login required
//    public ResponseEntity<Map<String, Object>> getUserProfile() {
//        try {
//            Map<String, Object> profileData = profileService.getUserProfile();
//            return new ResponseEntity<>(profileData, HttpStatus.OK);
//        } catch (Exception e) {
//            // Log error and return error response
//            // Use logger in actual implementation
//            System.err.println("Error fetching profile data: " + e.getMessage());
//            Map<String, Object> errorResponse = new HashMap<>();
//            errorResponse.put("status", 500);
//            errorResponse.put("message", "Exception raised in backend:get_user_profile"+e);
//            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
	
	@PostMapping("/upload_image")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile file) {
		System.out.println("Entering  Usercontroller.uploadImage ");
        if (file.isEmpty()) {
        	System.out.println("Entering  Usercontroller.uploadImage, file empty ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", 400, "message", "No file part"));
        }

        if (file.getOriginalFilename().isEmpty()) {
        	System.out.println("Entering  Usercontroller.uploadImage, file name empty ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", 400, "message", "No selected file"));
        }
        
        System.out.println("Entering  Usercontroller.uploadImage, file exist ");

        Map<String, Object> response = imageService.uploadImage(file);
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }
	
	@PostMapping("/update_profile")
    @Transactional
    public ResponseEntity<?> updateProfile(@RequestParam Map<String, String> formData,
                                           @RequestParam(value = "resume", required = false) MultipartFile resumeFile,
                                           @RequestParam(value = "coverLetter", required = false) MultipartFile coverLetterFile) {
		 
		 try {
			 System.out.println("Entering updateProfile..");
			 profileService.updateProfileSvc(formData, resumeFile, coverLetterFile);
			 return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
		 } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
		 }
    }
}