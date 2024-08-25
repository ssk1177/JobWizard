package com.capstone.backend.notifications;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notifications {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
	
	@Column(name = "userName", nullable = false, unique=true)
	private String userName;

	@Column(name = "receiveEmailAlerts")
    private Boolean receiveEmailAlerts;
	
	@Column(name = "jobMatchAlerts")
    private Boolean jobMatchAlerts;
	
	@Column(name = "applicationStatusUpdates")
    private Boolean applicationStatusUpdates;
	
	@Column(name = "newsletterSubscription")
    private Boolean newsletterSubscription;
	
	@Column(name = "receiveSmsAlerts")
    private Boolean receiveSmsAlerts;
	
	@Column(name = "smsJobMatchAlerts")
    private Boolean smsJobMatchAlerts;
	
	@Column(name = "smsApplicationStatusUpdates")
    private Boolean smsApplicationStatusUpdates;
	
	@Column(name = "enablePushNotifications")
    private Boolean enablePushNotifications;
	
	@Column(name = "pushJobMatchAlerts")
    private Boolean pushJobMatchAlerts;
	
	@Column(name = "pushApplicationStatusUpdates")
    private Boolean pushApplicationStatusUpdates;
	
	@Column(name = "frequency")
    private String frequency;
	
	@Column(name = "doNotDisturb")
    private Boolean doNotDisturb;
	
	@Column(name = "startTime")
    private String startTime;
	
	@Column(name = "endTime")
    private String endTime;

	public Notifications() {
		super();
	}

	public Notifications(String userName, Boolean receiveEmailAlerts, Boolean jobMatchAlerts,
			Boolean applicationStatusUpdates, Boolean newsletterSubscription, Boolean receiveSmsAlerts,
			Boolean smsJobMatchAlerts, Boolean smsApplicationStatusUpdates, Boolean enablePushNotifications,
			Boolean pushJobMatchAlerts, Boolean pushApplicationStatusUpdates, String frequency, Boolean doNotDisturb,
			String startTime, String endTime) {
		super();
		this.userName = userName;
		this.receiveEmailAlerts = receiveEmailAlerts;
		this.jobMatchAlerts = jobMatchAlerts;
		this.applicationStatusUpdates = applicationStatusUpdates;
		this.newsletterSubscription = newsletterSubscription;
		this.receiveSmsAlerts = receiveSmsAlerts;
		this.smsJobMatchAlerts = smsJobMatchAlerts;
		this.smsApplicationStatusUpdates = smsApplicationStatusUpdates;
		this.enablePushNotifications = enablePushNotifications;
		this.pushJobMatchAlerts = pushJobMatchAlerts;
		this.pushApplicationStatusUpdates = pushApplicationStatusUpdates;
		this.frequency = frequency;
		this.doNotDisturb = doNotDisturb;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Boolean getReceiveEmailAlerts() {
		return receiveEmailAlerts;
	}

	public void setReceiveEmailAlerts(Boolean receiveEmailAlerts) {
		this.receiveEmailAlerts = receiveEmailAlerts;
	}

	public Boolean getJobMatchAlerts() {
		return jobMatchAlerts;
	}

	public void setJobMatchAlerts(Boolean jobMatchAlerts) {
		this.jobMatchAlerts = jobMatchAlerts;
	}

	public Boolean getApplicationStatusUpdates() {
		return applicationStatusUpdates;
	}

	public void setApplicationStatusUpdates(Boolean applicationStatusUpdates) {
		this.applicationStatusUpdates = applicationStatusUpdates;
	}

	public Boolean getNewsletterSubscription() {
		return newsletterSubscription;
	}

	public void setNewsletterSubscription(Boolean newsletterSubscription) {
		this.newsletterSubscription = newsletterSubscription;
	}

	public Boolean getReceiveSmsAlerts() {
		return receiveSmsAlerts;
	}

	public void setReceiveSmsAlerts(Boolean receiveSmsAlerts) {
		this.receiveSmsAlerts = receiveSmsAlerts;
	}

	public Boolean getSmsJobMatchAlerts() {
		return smsJobMatchAlerts;
	}

	public void setSmsJobMatchAlerts(Boolean smsJobMatchAlerts) {
		this.smsJobMatchAlerts = smsJobMatchAlerts;
	}

	public Boolean getSmsApplicationStatusUpdates() {
		return smsApplicationStatusUpdates;
	}

	public void setSmsApplicationStatusUpdates(Boolean smsApplicationStatusUpdates) {
		this.smsApplicationStatusUpdates = smsApplicationStatusUpdates;
	}

	public Boolean getEnablePushNotifications() {
		return enablePushNotifications;
	}

	public void setEnablePushNotifications(Boolean enablePushNotifications) {
		this.enablePushNotifications = enablePushNotifications;
	}

	public Boolean getPushJobMatchAlerts() {
		return pushJobMatchAlerts;
	}

	public void setPushJobMatchAlerts(Boolean pushJobMatchAlerts) {
		this.pushJobMatchAlerts = pushJobMatchAlerts;
	}

	public Boolean getPushApplicationStatusUpdates() {
		return pushApplicationStatusUpdates;
	}

	public void setPushApplicationStatusUpdates(Boolean pushApplicationStatusUpdates) {
		this.pushApplicationStatusUpdates = pushApplicationStatusUpdates;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public Boolean getDoNotDisturb() {
		return doNotDisturb;
	}

	public void setDoNotDisturb(Boolean doNotDisturb) {
		this.doNotDisturb = doNotDisturb;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	
}
