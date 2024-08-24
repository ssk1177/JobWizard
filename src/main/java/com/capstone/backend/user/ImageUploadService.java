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

    public Map<String, Object> uploadImage(MultipartFile file, Long userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            try {
                User user = userOptional.get();
                UserDetails userDetails = userDetailsRepository.findByUserName(user.getUsername());
                        //.orElse(new UserDetails(userId, null, null));

                // Compress the image data
                byte[] compressedImageData = compressImage(file);

                userDetails.setProfilePic(compressedImageData);
                userDetailsRepository.save(userDetails);

                response.put("status", 200);
                response.put("imageUrl", "/get_image");
            } catch (Exception e) {
                response.put("status", 500);
                response.put("message", e.getMessage());
            }
        } else {
            response.put("status", 404);
            response.put("message", "User not found");
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
