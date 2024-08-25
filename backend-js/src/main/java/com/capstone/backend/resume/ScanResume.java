package com.capstone.backend.resume;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Service
public class ScanResume {

    private final RestTemplate restTemplate;

    public ScanResume() {
        this.restTemplate = new RestTemplate();
    }

    public ResponseEntity<String> callPythonApi(MultipartFile resumeBrowse, String job_description) {
    	try {
    		//String url = "http://localhost:5000/performSimilarityMatch";
    		String url = "https://backend-pf-0b1e7c97ff65.herokuapp.com/performSimilarityMatch";
    		
    		// Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "multipart/form-data");

            // Prepare body
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("resumeBrowse", new MultipartFileResource(resumeBrowse));
            body.add("job_description", job_description);

            // Prepare request entity
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Forward request to Python API
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

    		System.out.println("response:"+response.getBody());
            return ResponseEntity.ok(response.getBody());
    		
    		
    		
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Content-Type", "application/json");
//
//            // Example payload
//            String payload = "{\"key\": \"value\"}";
//
//            HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            //System.out.println("Response: " + response.getBody());
    		
    		
    		//return "working";
	        //String url = "https://backend-pf-0b1e7c97ff65.herokuapp.com/performSimilarityMatch";
//	    	String url = "http://localhost:5000/performSimilarityMatch";
//	        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//	        return response.getBody();
    	} catch (Exception ex) {
    		System.out.print("Exception raised in callPythonApi:"+ex);
    		return null;
    	}
    }
}
