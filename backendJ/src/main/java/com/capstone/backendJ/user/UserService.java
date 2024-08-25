package com.capstone.backendJ.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
    private UserRepository userRepository;
	
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