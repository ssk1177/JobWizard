package com.capstone.backend.resume;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class ScanResume {
	private static final Logger logger = LoggerFactory.getLogger(ScanResume.class);

    private final RestTemplate restTemplate;

    public ScanResume() {
        this.restTemplate = new RestTemplate();
    }

    public ResponseEntity<String> callPythonApi(MultipartFile resumeBrowse, String job_description) {
        try {
            String url = "https://backend-pf-0b1e7c97ff65.herokuapp.com/performSimilarityMatch";
        	//String url = "http://localhost:5000/performSimilarityMatch";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("resumeBrowse", new MultipartFileResource(resumeBrowse));
            body.add("job_description", job_description);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                
                // Ensure the response entity is JSON
                HttpHeaders jsonHeaders = new HttpHeaders();
                jsonHeaders.setContentType(MediaType.APPLICATION_JSON);
                return new ResponseEntity<>(response.getBody(), jsonHeaders, HttpStatus.OK);
            } else {
            	logger.error("Error response: " + response.getBody());
                
                return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
            }
        } catch (Exception ex) {
        	logger.error("Exception raised in callPythonApi: " + ex);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                 .body("{\"message\": \"Error communicating with Python API\"}");
        }
    }
}
