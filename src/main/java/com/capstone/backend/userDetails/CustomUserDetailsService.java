package com.capstone.backend.userDetails;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.capstone.backend.user.UserRepository;
//import com.capstone.backend.userDetails.*;
import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private UserDetailsRepository userDetailsRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {
    	
    	try {
	    	System.out.print("Inside loadUserByUsername...");
	    	
	    	com.capstone.backend.user.User user = userRepo.findByUserName(username);
	        
	        System.out.print("Inside loadUserByUsername...user:"+ user.getUsername()+ ", pass:" +user.getPassword() + ", aut:" + user.getAuthorities());
	        
	    	System.out.print("Inside loadUserByUsername...user exist..");
	
	        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());   
    	} catch (Exception ex) {
    		
    		throw new RuntimeException("Exception raised in loadUserByUsername");
    	}
    	
    }

	public void createUser(com.capstone.backend.user.User addedUser) {
		userDetailsRepo.save(new com.capstone.backend.userDetails.UserDetails(addedUser.getUser_id(), addedUser.getUsername(), addedUser.getEmail()));
	}
    	
}