package com.capstone.backend.applications;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long job_id;

    @Column(name = "userName", nullable = false, unique = true)
	private String userName;

    @Column(name = "jobTitle", length = 255, nullable = false)
    private String jobTitle;

    @Column(name = "companyName", length = 250, nullable = false)
    private String companyName;

    @Column(name = "jobDesc")
    private String jobDesc;

    @Column(name = "salary", length = 50)
    private String salary;

    @Column(name = "location", length = 100)
    private String location;
    
    @Column(name = "posted", length = 100)
    private String posted;
    
    @Column(name = "platform", length = 100)
    private String platform;
    
    @Column(name = "appliedOn")
    private LocalDateTime appliedOn;

    @Column(name = "matchScore")
    private Long matchScore;
    
    @Column(name = "status")
    private String status;
    
    @Column(name = "applyLink")
    private String applyLink;

	public Long getJob_id() {
		return job_id;
	}

	public void setJob_id(Long job_id) {
		this.job_id = job_id;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPosted() {
		return posted;
	}

	public void setPosted(String posted) {
		this.posted = posted;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public LocalDateTime getAppliedOn() {
		return appliedOn;
	}

	public void setAppliedOn(LocalDateTime appliedOn) {
		this.appliedOn = appliedOn;
	}

	public Long getMatchScore() {
		return matchScore;
	}

	public void setMatchScore(Long matchScore) {
		this.matchScore = matchScore;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApplyLink() {
		return applyLink;
	}

	public void setApplyLink(String applyLink) {
		this.applyLink = applyLink;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}