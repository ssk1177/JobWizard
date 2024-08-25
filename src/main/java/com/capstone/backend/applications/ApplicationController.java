package com.capstone.backend.applications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

	@Autowired
	public ApplicationRepository applicationsRepository;
	
	@GetMapping("/get_listings")
	public List<Application> getListings() {
		
		List<Application> apps = new ArrayList<>();
		
		applicationsRepository.findAll().forEach(apps::add);
		
		return apps;
	}	
}