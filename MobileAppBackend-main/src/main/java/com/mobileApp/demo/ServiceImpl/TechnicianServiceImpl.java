package com.mobileApp.demo.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobileApp.demo.Pojo.TechnicianPartsUsed;
import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.model.Technician;
import com.mobileApp.demo.repo.TechnicianRepo;
import com.mobileApp.demo.util.Utilities;
@Service
public class TechnicianServiceImpl {
	@Autowired
	TechnicianRepo techRepo;
	
	final static Logger logger = LoggerFactory.getLogger(TechnicianServiceImpl.class);
	public JSONObject signup(Technician a) {
		logger.info("SignUP method started");
		a.setEmail(a.getEmail().toLowerCase());
		JSONObject response = new JSONObject();

		String password = Utilities.hashPassword(a.getPassword());
		a.setPassword(password);
		if (a.getType() == null)
			a.setType("Technician");

		try {
			techRepo.save(a).toString();
			response.put("Status", true);
			response.put("Message", "SignUp Successful");
			logger.info("SignUP method completed successfully");
			return response;

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("SignUP method failed with exception: {}", e.getMessage());
			response.put("Status", false);
			response.put("Message", "SignUp Error");
			throw new RuntimeException("User Error");
		}

	}
	
	public JSONObject Login(UserPojo loginUser) {
		logger.info("Login method started");
JSONObject response=new JSONObject();
		List<Technician> userList = techRepo.findByEmail(loginUser.getEmail().toLowerCase());
		try {
			if (userList.isEmpty()) {
				logger.warn("Invalid Credentials");
				response.put("Message","Invalid Credentials");
				return response;
			}

			String password = Utilities.hashPassword(loginUser.getPassword());
			loginUser.setPassword(password);

			if (userList.get(0).getPassword().equals(loginUser.getPassword())) {
				logger.info("Login Successful with mail {} : {}", loginUser.getEmail(), loginUser.getPassword());
				response.put("Message","Login Successful");
				response.put("LoginId", userList.get(0).getId());
				return response;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("An error occurred while logging in: {}", e.getMessage());
			throw new RuntimeException("User Error");

		}
		logger.warn("Incorrect Password");
		response.put("Message","Incorrect Password");
		return response;
	

	}
	
	public JSONObject TechnicianPartDetails() {
		List<TechnicianPartsUsed>list=techRepo.findTechnicianPartDetails();
		JSONObject response=new JSONObject();
		return response.put("Details", list);
	}
	
	public Technician getTechnician(int id) {
		
		 Optional<Technician> tech=techRepo.findById(id);
		 if(tech.isPresent()) {
		return tech.get();
		 }
		 logger.error("Technician not found");
		 throw new RuntimeException("Technician not found");
		
		
	}
	public List<Technician> getAllTechnician(){
		return techRepo.findAll();
	}
	public String updateTechStatus(int id,String status) {
		try {
		 Optional<Technician> tech=techRepo.findById(id);
		 if(tech.isPresent()) {
			 Technician techNew	=tech.get();
			 techNew.setStatus(status);
			 techRepo.save(techNew);
		 }
		return "sucess";
		}
		catch(Exception e)
		{
			 logger.error("Technician not found");
			 throw new RuntimeException("Technician not found");
		}
	}
	public String getTechStatus(int id) {
		try {
		 Optional<Technician> tech=techRepo.findById(id);
		 if(tech.isPresent()) {
			 return tech.get().getStatus();
		 }
		}
		catch(Exception e)
		{
			 logger.error("Technician not found");
			 throw new RuntimeException("Technician not found");
		}
		return "Error";
	}
	
	
}
