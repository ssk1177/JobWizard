package com.capstone.backend.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.backend.userDetails.UserDetails;
import com.capstone.backend.userDetails.UserDetailsRepository;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class ImageService {
	
	private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    
    @Autowired
    private ProfileService profileService;

    public Map<String, Object> uploadImage(MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        
        String username = profileService.getUserName();
        

            try {

                UserDetails userDetails = userDetailsRepository.findByUserName(username);
                        //.orElse(new UserDetails(userId, null, null));
                
                userDetails.setProfilePicName(file.getOriginalFilename());
                userDetails.setProfilePicType(file.getContentType());
                userDetails.setProfilePic(file.getBytes());
                userDetailsRepository.save(userDetails);

                response.put("status", 200);

            } catch (Exception e) {
            	logger.error("Exception raised in uploadImage: "+e);
                response.put("status", 500);
                response.put("message", e.getMessage());
            }
        

        return response;
    }
    
    public ResponseEntity<?> getImage() {
    	try {
        
        String username = profileService.getUserName();

        UserDetails userDetails = userDetailsRepository.findByUserName(username);
        
        if (userDetails != null && userDetails.getProfilePic() != null) {

        	return ResponseEntity.ok()
                        .contentType(MediaType.valueOf(userDetails.getProfilePicType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + userDetails.getProfilePicName() + "\"")
                        .body(userDetails.getProfilePic());
        } else {
        	logger.error("Either userDetail or getProfilepic return null ");

        }
    	}catch (Exception ex) {
    		logger.error("Exception raised in getImage", ex);
    		
    	}
    	return ResponseEntity.ok().body(""); // TODO
	}
}
