package com.capstone.backendJ.user;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

	// Verifies if the hashed password matches the provided plain password
	public Boolean checkHashPass(String hashedPass, String plainPass) {
		return BCrypt.checkpw(plainPass, hashedPass);
	}
	
	// Hashes a plain password
    public String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
	
}