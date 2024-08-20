package com.capstone.backend.user;

import java.time.LocalDateTime;

//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "createdOn")
	private LocalDateTime createdOn;
	
	//constructor
	public User() {
		this.createdOn = LocalDateTime.now();
	}
	
	public User(String username, String password, String email) {
		this.username = username;
		this.password = password;//new BCryptPasswordEncoder().encode(password);
		this.email = email;
		this.createdOn = LocalDateTime.now();
	}
	
	
	public Integer getUser_id() {
		return userId;
	}
	
	public void setUser_id(Integer userId) {
		this.userId = userId;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setusername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;//new BCryptPasswordEncoder().encode(password);
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public LocalDateTime getCreatedOn() {
		return createdOn;
	}
	
	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}
	
	@Override
	public int hashCode() {
		return userId != null ? userId.hashCode() : 0;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        User user = (User) obj;
        return userId != null && userId.equals(user.userId);
	}
	
	@Override
	public String toString() {
		return "User [user_id=" + userId + ", username=" + username + ", email=" + email + ", createdOn=" + createdOn
				+ "]";
	}
}