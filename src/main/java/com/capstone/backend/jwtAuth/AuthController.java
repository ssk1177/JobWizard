package com.capstone.backend.jwtAuth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.capstone.backend.user.RegisterRequest;
import com.capstone.backend.user.User;
import com.capstone.backend.user.UserRepository;
import com.capstone.backend.userDetails.CustomUserDetailsService;

//import com.capstone.backend.userDetails.*;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) throws Exception {
    	String message = "";
    	try {
	        // Check if the username or email already exists
	        if (userRepository.existsByUserName(registerRequest.getUsername())) {
	            //throw new Exception("Username already taken");
	            message = "Username already taken";
	        } else {
	        
		        // Create a new user entity
		        User user = new User();
		        user.setusername(registerRequest.getUsername());
		        
		        // Hash the password before saving
		        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		        
		        user.setEmail(registerRequest.getEmail());
		        // Save the user to the database
		        User addedUser = userRepository.save(user);
		        
		        /* Create Entry in User_details */
		        userDetailsService.createUser(addedUser);
		        
		        message = "User registered successfully";
	        }
    	} catch(Exception ex) {
    		
    		throw new Exception("user registration failed", ex);
    	}
    	return ResponseEntity.ok().body(message);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
    	try {
    		System.out.print("Entering login...");
    		Authentication authentication = authenticationManager.authenticate(
    				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
    				);
    	} catch (BadCredentialsException ex) {
    		throw new Exception("Incorrect Credentials", ex);
    	}
    	
    	System.out.print("user exist...");
    	
    	UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername()); 
    			//(UserDetails) authentication.getPrincipal();
    	
    	System.out.print("generating token...");
    	
    	String jwtTok = jwtUtil.generateToken(userDetails);  
        
    	return ResponseEntity.ok().body(new AuthResponse(jwtTok));
    }
}




