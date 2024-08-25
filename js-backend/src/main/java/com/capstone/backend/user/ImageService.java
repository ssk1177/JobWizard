package com.capstone.backend.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.capstone.backend.userDetails.UserDetails;
import com.capstone.backend.userDetails.UserDetailsRepository;

@Service
public class ImageService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    
    @Autowired
    private ProfileService profileService;

    public Map<String, Object> uploadImage(MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        
        String username = profileService.getUserName();
        
        System.out.println("Entering  uploadImage, username: "+username);

            try {

                UserDetails userDetails = userDetailsRepository.findByUserName(username);
                        //.orElse(new UserDetails(userId, null, null));
                
                userDetails.setProfilePicName(file.getOriginalFilename());
                userDetails.setProfilePicType(file.getContentType());
                userDetails.setProfilePic(file.getBytes());
                userDetailsRepository.save(userDetails);

                response.put("status", 200);

            } catch (Exception e) {
                response.put("status", 500);
                response.put("message", e.getMessage());
            }
        

        return response;
    }
    
    public ResponseEntity<?> getImage() {
        
        String username = profileService.getUserName();

        UserDetails userDetails = userDetailsRepository.findByUserName(username);
        
    	System.out.print("Entering getImage...userDetails:"+ userDetails);
        if (userDetails != null && userDetails.getProfilePic() != null) {

        	return ResponseEntity.ok()
                        .contentType(MediaType.valueOf(userDetails.getProfilePicType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + userDetails.getProfilePicName() + "\"")
                        .body(userDetails.getProfilePic());
        } else {
                return ResponseEntity.ok().body("");
        }
	}
}
