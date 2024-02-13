package com.mobileApp.demo.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.ServiceImpl.UserServiceImplementation;
import com.mobileApp.demo.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	private UserServiceImplementation userServiceImpl;

	@PostMapping(value = "/signUp")
	public ResponseEntity<String> SignUp(@RequestBody User a) {

		JSONObject response = userServiceImpl.SignUP(a);

		if ((boolean) response.get("Status")) {
			return new ResponseEntity<>((String) response.get("Message"), HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>((String) response.get("Message"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping(value = "/login")
	public ResponseEntity<String> login(@RequestBody UserPojo user) {
		JSONObject response= userServiceImpl.Login(user);
		System.out.println(response.toString());
		if(((String) response.get("Message")).equalsIgnoreCase("Invalid Credentials")) {
			return new ResponseEntity<String>(response.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>(response.toString(),HttpStatus.ACCEPTED);
	}

	@PostMapping(value = "/validateemail")
	public ResponseEntity<String> validateEmail(@RequestParam String email) {
		JSONObject response= userServiceImpl.ValidateEmail(email);
		if(response.getBoolean("Status")) {
			System.out.println("entered");
			return new ResponseEntity <>(response.toString(),HttpStatus.ACCEPTED);
		}
		return new ResponseEntity <>(response.toString(),HttpStatus.ALREADY_REPORTED);
	}

	@PutMapping(value = "/resetpassword")
	public String resetPassword(@RequestBody UserPojo user) {
		return userServiceImpl.ResetPassword(user);
	}

	@GetMapping(value = "/getdetailsbyid/{id}")
	public User getDetailsById(@PathVariable int id) {
		return userServiceImpl.GetDetailsById(id);
	}

	@PutMapping(value = "/updateuserdetails/{id}")
	public String updateUserDetails(@PathVariable int id, @RequestBody User user) {
		return userServiceImpl.UpdateUserDetails(id, user);
	}

	@GetMapping(value = "/getuserbytype/{type}")
	public List<User> getUserByType(@PathVariable String type) {
		return userServiceImpl.getUserByType(type);
	}

	@DeleteMapping(value = "/deleteuserbyid/{id}")
	public String deleteUserById(@PathVariable int id) {

		return userServiceImpl.deleteUserById(id);
	}

}
