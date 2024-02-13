package com.mobileApp.demo.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mobileApp.demo.Pojo.ComponentPojo;
import com.mobileApp.demo.ServiceImpl.ComponentServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ComponentController {

	@Autowired
	ComponentServiceImpl componentImpl;

	@PostMapping(value = "/createcomponent")
	public  ResponseEntity<String> createcomponent(@RequestBody ComponentPojo component) {
		try {
			JSONObject response =componentImpl.createComponent(component);
			return new ResponseEntity<>(response.toString(),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			JSONObject response = new JSONObject();
			response.put("Status", true);
			response.put("Message", "Creation Error");
			return new ResponseEntity<>(response.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/getallcomponent")
	public  ResponseEntity<String> getAllComponent() {
	
		
		try {
			JSONObject response= componentImpl.getAllComponent();
			return new ResponseEntity<>(response.toString(),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			JSONObject response = new JSONObject();
			response.put("Status", true);
			response.put("Message", "getall Error");
			return new ResponseEntity<>(response.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
