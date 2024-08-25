package com.capstone.backendJ.settings;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Settings {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name = "userName", nullable = false, unique = true)
	private String userName;

    @Column(name="autoApply")
    private Boolean autoApply;

    @Column(name="jobFetchingSchedule")
    private String jobFetchingSchedule;

    @Column(name="webscrapeSites")
    private String webscrapeSites;

    @Column(name="matchScoreCutoff")
    private Integer matchScoreCutoff;

	public Settings() {

	}
	
	
//
//	public Settings(String userName, Boolean autoApply, String jobFetchingSchedule, String webscrapeSites, Integer matchScoreCutoff) {
//		this.userName = userName;
//		this.autoApply = autoApply;
//		this.jobFetchingSchedule = jobFetchingSchedule;
//		this.webscrapeSites = webscrapeSites;
//		this.matchScoreCutoff = matchScoreCutoff;
//	}



	public Settings(String userName, Object autoApply, Object jobFetchingSchedule, Object webscrapeSites, Object matchScoreCutoff) {
		this.userName = userName;
		this.autoApply = (Boolean) autoApply;
		this.jobFetchingSchedule = (String) jobFetchingSchedule;
		this.webscrapeSites = (String) webscrapeSites;
		this.matchScoreCutoff = (Integer) matchScoreCutoff;
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

	public Boolean getAutoApply() {
		return autoApply;
	}

	public void setAutoApply(Boolean autoApply) {
		this.autoApply = autoApply;
	}

	public String getWebscrapeSites() {
		return webscrapeSites;
	}

	public void setWebscrapeSites(String webscrapeSites) {
		this.webscrapeSites = webscrapeSites;
	}
	
	public void setWebscrapeSites(Object object) {
		this.webscrapeSites = (String) object;
	}

	public Integer getMatchScoreCutoff() {
		return matchScoreCutoff;
	}

	public void setMatchScoreCutoff(Integer matchScoreCutoff) {
		this.matchScoreCutoff = matchScoreCutoff;
	}
	
	public void setMatchScoreCutoff(Object object) {
		this.matchScoreCutoff = (Integer) object;
	}

	public String getJobFetchingSchedule() {
		return this.jobFetchingSchedule;
		
	}


	public void setJobFetchingSchedule(String jobFetchingSchedule) {
		this.jobFetchingSchedule = jobFetchingSchedule;
	}
	
	public void setJobFetchingSchedule(Object object) {
		this.jobFetchingSchedule = (String) object;
	}


	public void setAutoApply(Object object) {
		// TODO Auto-generated method stub
		this.autoApply = (Boolean) object;
		
	}
}