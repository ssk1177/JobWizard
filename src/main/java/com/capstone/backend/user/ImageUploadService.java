package com.capstone.backend.user;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.zip.Deflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.backend.userDetails.UserDetails;
import com.capstone.backend.userDetails.UserDetailsRepository;

@Service
public class ImageUploadService {

    @Autowired
    private UserRepository userRepository;

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
                
                userDetails.setProfilePic(file.getBytes());
                userDetailsRepository.save(userDetails);
                
//                System.out.println("Entering  uploadImage, userDetails: "+userDetails);
//                // Compress the image data
//                byte[] compressedImageData = compressImage(file);
//
//                System.out.println("Entering  uploadImage..1");
//                
//                userDetails.setProfilePic(compressedImageData);
//                
//                System.out.println("Entering  uploadImage..2");
//                
//                userDetailsRepository.save(userDetails);
//                
//                System.out.println("Entering  uploadImage..3");

                response.put("status", 200);
                response.put("imageUrl", "/get_image");
//                
//                System.out.println("Exiting  uploadImage");
            } catch (Exception e) {
                response.put("status", 500);
                response.put("message", e.getMessage());
            }
        

        return response;
    }

    private byte[] compressImage(MultipartFile file) throws IOException {
        byte[] data = file.getBytes();
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        outputStream.close();
        return outputStream.toByteArray();
    }
}
