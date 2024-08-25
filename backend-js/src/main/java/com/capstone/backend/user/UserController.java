package com.capstone.backend.user;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;

@RestController
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private ProfileService profileService;
	
	@Autowired
    private ImageService imageService;
	
	@GetMapping("/get_image")
    public ResponseEntity<?> getImage() {
		
        try {
            return imageService.getImage();
        } catch (Exception e) {
            logger.error("Exception raised in getImage: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while fetching the profile"));
        }
    }
	
	@GetMapping("/get_profile")
    public ResponseEntity<Map<String, Object>> getProfile() {
        try {
        	Map<String, Object> profile = profileService.getProfile();
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
        	logger.error("Exception raised in getProfile: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while fetching the profile"));
        }
    }
	
	@PostMapping("/upload_image")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile file) {
		try {
	        if (file.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body(Map.of("status", 400, "message", "No file part"));
	        }
	
	        if (file.getOriginalFilename().isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body(Map.of("status", 400, "message", "No selected file"));
	        }
	
	        Map<String, Object> response = imageService.uploadImage(file);
	        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
	        return new ResponseEntity<>(response, status);
		} catch (Exception ex) {
			logger.error("Exception raised in uploadImage: ", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while uploading the image"));
		}
    }
	
	@PostMapping("/update_profile")
    @Transactional
    public ResponseEntity<?> updateProfile(@RequestParam Map<String, String> formData,
                                           @RequestParam(value = "resume", required = false) MultipartFile resumeFile,
                                           @RequestParam(value = "coverLetter", required = false) MultipartFile coverLetterFile) {
		 
		 try {
			 profileService.updateProfileSvc(formData, resumeFile, coverLetterFile);
			 return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
		 } catch (Exception e) {
			 logger.error("Exception raised in updateProfile: ", e);
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
		 }
    }
}