package com.capstone.backend.resume;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ResumeController {
	
	@Autowired
	private ScanResume scanResume;
	
	@PostMapping("/scan_resume")
	public ResponseEntity<?> scanResume(
            @RequestParam(value = "resumeBrowse", required = false) MultipartFile resumeBrowse,
            @RequestParam("job_description") String job_description) {
		System.out.println("Entering scanResume...");
		try {
			scanResume.callPythonApi(resumeBrowse, job_description);
		
			return ResponseEntity.ok().body("Inside Response Entity");
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Exception raised in scanResume: "+ex);
		}	
	}
}
