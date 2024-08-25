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

//import com.capstone.backend.userDetails.UserDetailsRepository;
//import java.time.LocalDateTime;

@Service
public class UserService {
	
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    
	
	//@Autowired
	//private UserDetailsRepository userDetailsRepo;
	
	@Autowired
	private PasswordService passwordService;
	
//	public String login(LoginRequest data) throws Exception {
//		Optional<User> userOptional = userRepo.findByUserName(data.getUsername());
//		
//		if(userOptional.isPresent()) {
//			User user =  userOptional.get();
//			try {
//				if(passwordService.checkHashPass(user.getPassword(), data.getPassword())) {
//					loginUser(user);	// To handle user authentication and creation of user details
//				} else {
//					throw new Exception("User Login Failed: Check Credentials!!");
//				}
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		} else {
//			throw new Exception("User Login Failed: User doesn't Exist!!");
//		}
//		return "User Logged In Successfully";
//
//	}
	
	public void loginUser(User user) {
		
	}
	
	public boolean isUserExist(String username, String email) {
		User usernameOptional = userRepository.findByUserName(username);
		User emailOptional = userRepository.findByEmail(email);
		
		if(usernameOptional != null || emailOptional != null)
			return true;
		else
			return false;
	}

//	public String getUserProfile() {//int userId) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	public String registerUser(User newUser) {

		// Create entry in User table
		User addeduser = userRepository.save(newUser);
		
		
		//createUserDetails(addeduser);
		// Create entry in UserDetails table
		
		
		return null;
	}
	
	
    
    

}