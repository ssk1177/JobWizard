package com.capstone.backend.settings;

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

    @Column(nullable = false)
    private Boolean autoApply;

    @Column(nullable = false)
    private String webscrapeSites;

    @Column(nullable = false)
    private Integer matchScoreCutoff;

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

	public Integer getMatchScoreCutoff() {
		return matchScoreCutoff;
	}

	public void setMatchScoreCutoff(Integer matchScoreCutoff) {
		this.matchScoreCutoff = matchScoreCutoff;
	}

	public Object getJobFetchingSchedule() {
		// TODO Auto-generated method stub
		return null;
	}
}