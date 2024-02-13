package com.mobileApp.demo.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobileApp.demo.Pojo.ComponentPojo;
import com.mobileApp.demo.model.Component;
import com.mobileApp.demo.model.Technician;
import com.mobileApp.demo.repo.ComponentRepo;
import com.mobileApp.demo.repo.TechnicianRepo;
@Service
public class ComponentServiceImpl {

	final static Logger logger = LoggerFactory.getLogger(ComponentServiceImpl.class);
	
	@Autowired
	TechnicianRepo techrepo;
	
	@Autowired
	private ComponentRepo componentRepo;
	
	public JSONObject createComponent(ComponentPojo component) {
		int id=component.getTechid();
		logger.info("Create a Component started");
		JSONObject response = new JSONObject();
		try {
		Optional<Technician> tech=techrepo.findById(id);
		if(tech.isEmpty())
		{
			throw new RuntimeException("technician Doesn't exist");
		}
		else {
			System.out.println(tech.toString());
			Component newComponent=new Component();
			newComponent.setComponentTitle(component.getComponentTitle());
			newComponent.setDescription(component.getDescription());
			newComponent.setId(tech.get());
			newComponent.setInStock(component.getInStock());
			newComponent.setQty(component.getQty());
			newComponent.setRequestingCompany(component.getRequestingCompany());
			newComponent.setPrice(component.getPrice());
			newComponent.setRequiredDate(component.getRequiredDate());
			componentRepo.save(newComponent);
			logger.info("Creation a Component completed successfully");
			response.put("Status", true);
			response.put("Message", "Creation Successful");
			return response;
		}

			

		} catch (Exception e) {
			logger.error("Creation method failed with exception: {}", e.getMessage());
			throw new RuntimeException("Component Creation Error");
		}

	}

	public JSONObject getAllComponent() {
		JSONObject response = new JSONObject();
		try {
			List<Component> componentList = componentRepo.findAll();
			response.put("Status", true);
			response.put("Components", componentList);
			return response;
		} catch (Exception e) {
			logger.error("getAll method failed with exception: {}", e.getMessage());			
			throw new RuntimeException("Component getAll Error");
		}

	}
}
