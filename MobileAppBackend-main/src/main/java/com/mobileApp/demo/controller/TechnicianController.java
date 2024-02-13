package com.mobileApp.demo.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.ServiceImpl.TechnicianServiceImpl;
import com.mobileApp.demo.model.Technician;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TechnicianController {
	
	
	@Autowired
	private TechnicianServiceImpl technicianServiceImpl;
	
	@PostMapping(value = "/techniciansignup")
	public ResponseEntity<String> signup(@RequestBody Technician technician) {

		JSONObject response = technicianServiceImpl.signup(technician);

		if ((boolean) response.get("Status")) {
			return new ResponseEntity<>((String) response.get("Message"), HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>((String) response.get("Message"), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping(value = "/technicianlogin")
	public ResponseEntity<String> Login(@RequestBody UserPojo user) {
		JSONObject response= technicianServiceImpl.Login(user);
		if(((String) response.get("Message")).equalsIgnoreCase("Invalid Credentials")) {
			return new ResponseEntity<String>(response.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>(response.toString(),HttpStatus.ACCEPTED);
	}
	
	
	@GetMapping(value="/gettechnicianpartdetails")
	public ResponseEntity<String> GetTechnicianPartDetails() {
	JSONObject response=	technicianServiceImpl.TechnicianPartDetails();
	return new ResponseEntity<String>(response.toString(),HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping(value="/getalltechnician")
	public ResponseEntity<List<Technician>> getAllTechnician(){
		List<Technician> techList=technicianServiceImpl.getAllTechnician();
		return new ResponseEntity<>(techList,HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/updatetechstatus/{id}/{status}")
	public ResponseEntity<String> updatetechstatus(@PathVariable int id,@PathVariable String status) {
	String response =technicianServiceImpl.updateTechStatus(id, status);
		return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
	}
	
	@GetMapping(value = "/gettechstatus/{id}")
	public ResponseEntity<String> gettechstatus(@PathVariable int id) {
		String response =technicianServiceImpl.getTechStatus(id);
			return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
		}
}
