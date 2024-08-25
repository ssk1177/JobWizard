package com.capstone.backend.userDetails;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.capstone.backend.jwtAuth.AuthController;
import com.capstone.backend.user.UserRepository;

//import com.capstone.backend.userDetails.*;
import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private UserDetailsRepository userDetailsRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {
    	
    	try {
	    	com.capstone.backend.user.User user = userRepo.findByUserName(username);
	
	        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());   
    	} catch (Exception ex) {

    		logger.error("Exception raised in loadUserByUsername:"+ex);
    		throw new RuntimeException("Exception raised in loadUserByUsername");
    	}
    	
    }

	public void createUser(com.capstone.backend.user.User addedUser) {
		userDetailsRepo.save(new com.capstone.backend.userDetails.UserDetails(addedUser.getUsername(), addedUser.getEmail()));
	}
    	
}