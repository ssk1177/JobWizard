package com.capstone.backend.user;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;

import com.capstone.backend.address.Address;
import com.capstone.backend.address.AddressRepository;
import com.capstone.backend.documents.Documents;
import com.capstone.backend.documents.DocumentsRepository;
import com.capstone.backend.notifications.Notifications;
import com.capstone.backend.notifications.NotificationsRepository;
import com.capstone.backend.settings.Settings;
import com.capstone.backend.settings.SettingsRepository;
import com.capstone.backend.userDetails.UserDetails;
import com.capstone.backend.userDetails.UserDetailsRepository;

@Service
public class ProfileService {

	@Autowired
    private UserRepository userRepository;

	@Autowired
    private UserDetailsRepository userDetailsRepository;

	@Autowired
    private AddressRepository addressRepository;

    @Autowired
    private DocumentsRepository documentsRepository;

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private SettingsRepository settingsRepository;

    
    public String getUserName() {
    	System.out.println("Entering profileservice.getUserId...");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Entering profileservice.getUserId...1");
        String username = null;

        if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
        	System.out.println("Entering profileservice.getUserId...2");
        	org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
            // Assuming the user ID is stored in the username field; adjust as needed.
        	username = userDetails.getUsername();
        }
        System.out.println("Entering profileservice.getUserId...3");
        
        return username;
    }

	public Map<String, Object> getProfile() {
        Map<String, Object> response = new HashMap<>();
        
        System.out.println("Entering profileservice.getProfile...");
        
        String username = this.getUserName();
        
        System.out.println("Entering profileservice.getProfile..., username:"+ username);

        // Fetch user details
        UserDetails userDetails = userDetailsRepository.findByUserName(username);
        
        System.out.println("userDetails:"+userDetails);
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("first_name", userDetails != null ? userDetails.getFirstName() : "");
        userInfo.put("last_name", userDetails != null ? userDetails.getLastName() : "");
        userInfo.put("email", userDetails != null ? userDetails.getEmail() : "");
        userInfo.put("phone_number", userDetails != null ? userDetails.getPhoneNumber() : "");
        userInfo.put("role", userDetails != null ? userDetails.getRole() : "");
        userInfo.put("profile_pic", userDetails != null && userDetails.getProfilePic() != null ?
                Base64.getEncoder().encodeToString(userDetails.getProfilePic()) : "");

        // Fetch address details
        Address address = addressRepository.findByUserName(username).orElse(null);
        Map<String, Object> addressInfo = new HashMap<>();
        addressInfo.put("street", address != null ? address.getStreet() : "");
        addressInfo.put("city", address != null ? address.getCity() : "");
        addressInfo.put("state", address != null ? address.getState() : "");
        addressInfo.put("country", address != null ? address.getCountry() : "");
        addressInfo.put("zip", address != null ? address.getZip() : "");

        // Fetch documents list
        List<Documents> userDocuments = (List<Documents>) documentsRepository.findByUserName(username);
        List<Map<String, Object>> documentsList = userDocuments.stream()
                .map(doc -> {
                    Map<String, Object> docInfo = new HashMap<>();
                    docInfo.put("id", doc.getId());
                    docInfo.put("filename", doc.getFilename());
                    docInfo.put("filetype", doc.getFiletype());
                    docInfo.put("uploaded_on", doc.getUploadedOn().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    return docInfo;
                })
                .collect(Collectors.toList());

        // Fetch notification settings
        Notifications notificationSettings = notificationsRepository.findByUserName(username);
        Map<String, Object> notificationInfo = new HashMap<>();
        notificationInfo.put("receive_email_alerts", notificationSettings != null ? notificationSettings.getReceiveEmailAlerts() : false);
        notificationInfo.put("job_match_alerts", notificationSettings != null ? notificationSettings.getJobMatchAlerts() : false);
        notificationInfo.put("application_status_updates", notificationSettings != null ? notificationSettings.getApplicationStatusUpdates() : false);
        notificationInfo.put("newsletter_subscription", notificationSettings != null ? notificationSettings.getNewsletterSubscription() : false);
        notificationInfo.put("receive_sms_alerts", notificationSettings != null ? notificationSettings.getReceiveSmsAlerts() : false);
        notificationInfo.put("sms_job_match_alerts", notificationSettings != null ? notificationSettings.getSmsJobMatchAlerts() : false);
        notificationInfo.put("sms_application_status_updates", notificationSettings != null ? notificationSettings.getSmsApplicationStatusUpdates() : false);
        notificationInfo.put("enable_push_notifications", notificationSettings != null ? notificationSettings.getEnablePushNotifications() : false);
        notificationInfo.put("push_job_match_alerts", notificationSettings != null ? notificationSettings.getPushJobMatchAlerts() : false);
        notificationInfo.put("push_application_status_updates", notificationSettings != null ? notificationSettings.getPushApplicationStatusUpdates() : false);
        notificationInfo.put("frequency", notificationSettings != null ? notificationSettings.getFrequency() : "");
        notificationInfo.put("do_not_disturb", notificationSettings != null ? notificationSettings.getDoNotDisturb() : false);
        notificationInfo.put("start_time", notificationSettings != null ? notificationSettings.getStartTime() : "");
        notificationInfo.put("end_time", notificationSettings != null ? notificationSettings.getEndTime() : "");

        // Fetch settings
        Settings settings = settingsRepository.findByUserName(username);
        Map<String, Object> settingsInfo = new HashMap<>();
        settingsInfo.put("auto_apply", settings != null ? settings.getAutoApply() : false);
        settingsInfo.put("job_fetching_schedule", settings != null && settings.getJobFetchingSchedule() != null ?
                ((LocalDateTime) settings.getJobFetchingSchedule()).toLocalDate().toString() : "");
        settingsInfo.put("webscrape_sites", settings != null ? settings.getWebscrapeSites() : "");
        settingsInfo.put("match_score_cutoff", settings != null ? settings.getMatchScoreCutoff() : 0);

        response.put("user_info", userInfo);
        response.put("address", addressInfo);
        response.put("documents", documentsList);
        response.put("notification_settings", notificationInfo);
        response.put("settings", settingsInfo);        

        return response;
    }
	
	@GetMapping("/get_user_profile")
	public Map<String, Object> getUserProfile() {
        Map<String, Object> response = new HashMap<>();
        
        String username = this.getUserName();

        UserDetails userDetails = userDetailsRepository.findByUserName(username);

        if (userDetails != null) {
        	
            Map<String, Object> userData = new HashMap<>();
            userData.put("username", userDetails.getUserName());
            userData.put("role", userDetails.getRole() != null ? userDetails.getRole() : "");

            if (userDetails != null && userDetails.getProfilePic() != null) {
                try {
                    byte[] decompressedImageData = decompress(userDetails.getProfilePic());
                    // Assuming the decompression is needed as in Flask
                    //String imageUrl = "http://localhost:5000/get_image";
                    userData.put("imageUrl", decompressedImageData);
                } catch (DataFormatException e) {
                    throw new RuntimeException("Error decompressing image data", e);
                }
            } else {
                userData.put("imageUrl", null);
            }

            response.put("status", 200);
            response.put("data", userData);
        } else {
            response.put("status", 404);
            response.put("message", "User data not found");
        }

        return response;
    }

    private byte[] decompress(byte[] data) throws DataFormatException {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!inflater.finished()) {
            int count = inflater.inflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
			outputStream.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return outputStream.toByteArray();
    }
}
