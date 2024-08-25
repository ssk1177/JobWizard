package com.capstone.backend.resume;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ResumeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ResumeController.class);
	@Autowired
	private ScanResume scanResume;
	
	@PostMapping("/scan_resume")
	public ResponseEntity<?> scanResume(
            @RequestParam(value = "resumeBrowse", required = false) MultipartFile resumeBrowse,
            @RequestParam("job_description") String job_description) {
		
		try {
			scanResume.callPythonApi(resumeBrowse, job_description);
		
			return ResponseEntity.ok().body("Inside Response Entity");
		} catch (Exception ex) {
			logger.error("Exception raised in scanResume: "+ex);
			return ResponseEntity.status(500).body("Exception raised in scanResume: "+ex);
		}	
	}
}
