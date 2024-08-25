package com.capstone.backend.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordService passwordService;
	
	public String login(LoginRequest data) throws Exception {
		Optional<User> userOptional = userRepo.findByUsername(data.getUsername());
		
		if(userOptional.isPresent()) {
			User user =  userOptional.get();
			try {
				if(passwordService.checkHashPass(user.getPassword(), data.getPassword())) {
					loginUser(user);	// To handle user authentication and creation of user details
				} else {
					throw new Exception("User Login Failed: Check Credentials!!");
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			throw new Exception("User Login Failed: User doesn't Exist!!");
		}
		return "User Logged In Successfully";

	}
	
	public void loginUser(User user) {
		
	}
	
	public boolean isUserExist(String username, String email) {
		Optional<User> usernameOptional = userRepo.findByUsername(username);
		Optional<User> emailOptional = userRepo.findByEmail(email);
		
		if(usernameOptional.isPresent() || emailOptional.isPresent())
			return true;
		else
			return false;
	}

}