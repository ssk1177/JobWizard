package com.capstone.backend.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.capstone.backend.userDetails.UserDetailsRepository;
//import java.time.LocalDateTime;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
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
		User usernameOptional = userRepo.findByUserName(username);
		User emailOptional = userRepo.findByEmail(email);
		
		if(usernameOptional != null || emailOptional != null)
			return true;
		else
			return false;
	}

	public String getUserProfile() {//int userId) {
		// TODO Auto-generated method stub
		return null;
	}

	public String registerUser(User newUser) {

		// Create entry in User table
		User addeduser = userRepo.save(newUser);
		
		
		//createUserDetails(addeduser);
		// Create entry in UserDetails table
		
		
		return null;
	}

}