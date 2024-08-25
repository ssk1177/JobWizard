package com.capstone.backend.documents;

import java.time.LocalDateTime;

import com.capstone.backend.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Documents {
		    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "userName", nullable = false)
	private String userName;
	
	@Column(name = "filename")
	private String filename;
	
	@Column(name = "filetype")
	private String filetype;
	
	@Lob
	@Column(name = "data", columnDefinition="MEDIUMBLOB")
	private byte[] data;
	
	@Column(name = "uploadedOn")
	private LocalDateTime uploadedOn;
	
	public Documents() {
		
	}

	public Documents(String userName, String filename, String filetype, byte[] data, LocalDateTime uploadedOn) {
		this.userName = userName;
		this.filename = filename;
		this.filetype = filetype;
		this.data = data;
		this.uploadedOn = uploadedOn;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public LocalDateTime getUploadedOn() {
		return uploadedOn;
	}

	public void setUploadedOn(LocalDateTime uploadedOn) {
		this.uploadedOn = uploadedOn;
	}
	
}
