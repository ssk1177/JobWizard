package com.capstone.backend.user;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProfileService {

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;

        if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
        	org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
            // Assuming the user ID is stored in the username field; adjust as needed.
        	username = userDetails.getUsername();
        }
        
        return username;
    }

	public Map<String, Object> getProfile() {
        Map<String, Object> response = new HashMap<>();
        
        String username = this.getUserName();

        // Fetch user details
        UserDetails userDetails = userDetailsRepository.findByUserName(username);
        
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("first_name", userDetails != null ? userDetails.getFirstName() : "");
        userInfo.put("last_name", userDetails != null ? userDetails.getLastName() : "");
        userInfo.put("email", userDetails != null ? userDetails.getEmail() : "");
        userInfo.put("phone_number", userDetails != null ? userDetails.getPhoneNumber() : "");
        userInfo.put("role", userDetails != null ? userDetails.getRole() : "");
        userInfo.put("profile_pic", userDetails != null && userDetails.getProfilePic() != null ?
                Base64.getEncoder().encodeToString(userDetails.getProfilePic()) : "");

        // Fetch address details
        Address address = addressRepository.findByUserName(username);
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
                    docInfo.put("filename", doc.getFilename());
                    docInfo.put("filetype", doc.getFiletype());
                    docInfo.put("data", doc.getData());
                    docInfo.put("uploaded_on", doc.getUploadedOn().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    return docInfo;
                })
                .collect(Collectors.toList());

        // Fetch notification settings
        Notifications notificationSettings = notificationsRepository.findByUserName(username);
        	Map<String, Object> notificationInfo = new HashMap<>();
        if(notificationSettings != null) {
	        notificationInfo.put("receive_email_alerts", notificationSettings.getReceiveEmailAlerts() != null ? notificationSettings.getReceiveEmailAlerts() : false);
	        notificationInfo.put("job_match_alerts", notificationSettings.getJobMatchAlerts() != null ? notificationSettings.getJobMatchAlerts() : false);
	        notificationInfo.put("application_status_updates", notificationSettings.getApplicationStatusUpdates() != null ? notificationSettings.getApplicationStatusUpdates() : false);
	        notificationInfo.put("newsletter_subscription", notificationSettings.getNewsletterSubscription() != null ? notificationSettings.getNewsletterSubscription() : false);
	        notificationInfo.put("receive_sms_alerts", notificationSettings.getReceiveSmsAlerts() != null ? notificationSettings.getReceiveSmsAlerts() : false);
	        notificationInfo.put("sms_job_match_alerts", notificationSettings.getSmsJobMatchAlerts() != null ? notificationSettings.getSmsJobMatchAlerts() : false);
	        notificationInfo.put("sms_application_status_updates", notificationSettings.getSmsApplicationStatusUpdates() != null ? notificationSettings.getSmsApplicationStatusUpdates() : false);
	        notificationInfo.put("enable_push_notifications", notificationSettings.getEnablePushNotifications() != null ? notificationSettings.getEnablePushNotifications() : false);
	        notificationInfo.put("push_job_match_alerts", notificationSettings.getPushJobMatchAlerts() != null ? notificationSettings.getPushJobMatchAlerts() : false);
	        notificationInfo.put("push_application_status_updates", notificationSettings.getPushApplicationStatusUpdates() != null ? notificationSettings.getPushApplicationStatusUpdates() : false);
	        notificationInfo.put("frequency", notificationSettings.getFrequency() != null ? notificationSettings.getFrequency() : "");
	        notificationInfo.put("do_not_disturb", notificationSettings.getDoNotDisturb() != null ? notificationSettings.getDoNotDisturb() : false);
	        notificationInfo.put("start_time", notificationSettings.getStartTime() != null ? notificationSettings.getStartTime() : "");
	        notificationInfo.put("end_time", notificationSettings.getEndTime() != null ? notificationSettings.getEndTime() : "");
        }

        // Fetch settings
        Settings settings = settingsRepository.findByUserName(username);
        Map<String, Object> settingsInfo = new HashMap<>();
        settingsInfo.put("auto_apply", settings != null ? settings.getAutoApply() : false);
        settingsInfo.put("job_fetching_schedule", settings != null && settings.getJobFetchingSchedule() != null ?
                settings.getJobFetchingSchedule() : "");
        settingsInfo.put("webscrape_sites", settings != null ? settings.getWebscrapeSites() : "");
        settingsInfo.put("match_score_cutoff", settings != null ? settings.getMatchScoreCutoff() : 0);

        response.put("user_info", userInfo);
        response.put("address", addressInfo);
        response.put("documents", documentsList);
        response.put("notifications", notificationInfo);
        response.put("settings", settingsInfo);        

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

    public ResponseEntity<?> updateProfileSvc(Map<String, String> formData,
                                            MultipartFile resumeFile,
                                            MultipartFile coverLetterFile) {
        try {
            String username = getUserName();
            ObjectMapper objectMapper = new ObjectMapper(); // Initialize ObjectMapper here


            // Update user info
            if (formData.containsKey("user_info")) {
                Map<String, String> userInfo = objectMapper.readValue(formData.get("user_info"), Map.class);

                UserDetails userDetails = userDetailsRepository.findByUserName(username);

                userDetails.setFirstName(userInfo.get("first_name"));
                userDetails.setLastName(userInfo.get("last_name"));
                userDetails.setRole(userInfo.get("role"));
                userDetails.setPhoneNumber(userInfo.get("phone_number"));
                userDetails.setUpdatedOn(LocalDateTime.now());
                userDetailsRepository.save(userDetails);
            }

            // Update address
            if (formData.containsKey("address")) {
                Map<String, String> addressData = objectMapper.readValue(formData.get("address"), Map.class);

                Address address = addressRepository.findByUserName(username);
                if (address == null) {
                    address = new Address(username, addressData.get("street"), addressData.get("city"),
                            addressData.get("state"), addressData.get("country"), addressData.get("zip"));
                } else {
                    address.setStreet(addressData.get("street"));
                    address.setCity(addressData.get("city"));
                    address.setState(addressData.get("state"));
                    address.setCountry(addressData.get("country"));
                    address.setZip(addressData.get("zip"));
                }
                addressRepository.save(address);
            }

            // Update settings
            if (formData.containsKey("settings")) {
                Map<String, Object> settingsData = objectMapper.readValue(formData.get("settings"), Map.class);

                Settings settings = settingsRepository.findByUserName(username);
                if (settings == null) {
                    settings = new Settings(username, settingsData.get("auto_apply"), settingsData.get("job_fetching_schedule"),
                    		settingsData.get("webscrape_sites"), settingsData.get("match_score_cutoff"));
                } else {
                	settings.setUserName(username);
                	settings.setAutoApply(settingsData.get("auto_apply"));
                	settings.setJobFetchingSchedule(settingsData.get("job_fetching_schedule"));
                	settings.setWebscrapeSites(settingsData.get("webscrape_sites"));
                	settings.setMatchScoreCutoff(settingsData.get("match_score_cutoff"));
                }
                settingsRepository.save(settings);
            }

            // Update notification settings
            if (formData.containsKey("notifications")) {
                Map<String, Object> notificationSettingsData = objectMapper.readValue(formData.get("notifications"), Map.class);

                Notifications notificationSettings = notificationsRepository.findByUserName(username);
                if (notificationSettings == null) {
                    notificationSettings = new Notifications(username, 
                    		(Boolean) notificationSettingsData.get("receive_email_alerts"),
                    		(Boolean) notificationSettingsData.get("job_match_alerts"),
                    		(Boolean) notificationSettingsData.get("application_status_updates"),
                    		(Boolean) notificationSettingsData.get("newsletter_subscription"),
                    		(Boolean) notificationSettingsData.get("receive_sms_alerts"),
                    		(Boolean) notificationSettingsData.get("sms_job_match_alerts"),
                    		(Boolean) notificationSettingsData.get("sms_application_status_updates"),
                    		(Boolean) notificationSettingsData.get("enable_push_notifications"),
                    		(Boolean) notificationSettingsData.get("push_job_match_alerts"),
                    		(Boolean) notificationSettingsData.get("push_application_status_updates"),
                    		(String) notificationSettingsData.get("frequency"),
                    		(Boolean) notificationSettingsData.get("do_not_disturb"),
                    		(String) notificationSettingsData.get("start_time"),
                    		(String) notificationSettingsData.get("end_time")
                    		);
                } else {
                	notificationSettings.setReceiveEmailAlerts((Boolean) notificationSettingsData.get("receive_email_alerts"));
                	notificationSettings.setJobMatchAlerts((Boolean) notificationSettingsData.get("job_match_alerts"));
                	notificationSettings.setApplicationStatusUpdates((Boolean) notificationSettingsData.get("application_status_updates"));
                	notificationSettings.setNewsletterSubscription((Boolean) notificationSettingsData.get("newsletter_subscription"));
                	notificationSettings.setReceiveSmsAlerts((Boolean) notificationSettingsData.get("receive_sms_alerts"));
                	notificationSettings.setSmsJobMatchAlerts((Boolean) notificationSettingsData.get("sms_job_match_alerts"));
                	notificationSettings.setSmsApplicationStatusUpdates((Boolean) notificationSettingsData.get("sms_application_status_updates"));
                	notificationSettings.setEnablePushNotifications((Boolean) notificationSettingsData.get("enable_push_notifications"));
                	notificationSettings.setPushJobMatchAlerts((Boolean) notificationSettingsData.get("push_job_match_alerts"));
                	notificationSettings.setPushApplicationStatusUpdates((Boolean) notificationSettingsData.get("push_application_status_updates"));
                	notificationSettings.setFrequency((String) notificationSettingsData.get("frequency"));
                	notificationSettings.setDoNotDisturb((Boolean) notificationSettingsData.get("do_not_disturb"));
                	notificationSettings.setStartTime((String) notificationSettingsData.get("start_time"));
                	notificationSettings.setEndTime((String) notificationSettingsData.get("end_time"));
                }
                notificationsRepository.save(notificationSettings);
            }

            // Update or add resume
            if (resumeFile != null && !resumeFile.isEmpty()) {
                Documents resume = documentsRepository.findByUserNameAndFiletype(username, "resume");
                if (resume == null) {
                    resume = new Documents(username, resumeFile.getOriginalFilename(), "resume", resumeFile.getBytes(), LocalDateTime.now());
                } else {
                    resume.setFilename(resumeFile.getOriginalFilename());
                    resume.setData(resumeFile.getBytes());
                    resume.setUploadedOn(LocalDateTime.now());
                }
                documentsRepository.save(resume);
            }

            // Update or add cover letter
            if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
                Documents coverLetter = documentsRepository.findByUserNameAndFiletype(username, "coverLetter");
                if (coverLetter == null) {
                    coverLetter = new Documents(username, coverLetterFile.getOriginalFilename(), "coverLetter", coverLetterFile.getBytes(), LocalDateTime.now());
                } else {
                    coverLetter.setFilename(coverLetterFile.getOriginalFilename());
                    coverLetter.setData(coverLetterFile.getBytes());
                    coverLetter.setUploadedOn(LocalDateTime.now());
                }
                documentsRepository.save(coverLetter);
            }

            return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error processing files"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

}
