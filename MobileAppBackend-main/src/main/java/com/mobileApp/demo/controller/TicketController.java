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

import com.mobileApp.demo.Pojo.TicketPojo;
import com.mobileApp.demo.ServiceImpl.TicketSeviceImplementation;
import com.mobileApp.demo.model.Ticket;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TicketController {

	@Autowired
	private TicketSeviceImplementation ticketServiceImpl;

	@PostMapping(value = "/sentticket")
	public String ticketData(@RequestBody TicketPojo ticket) {
		return ticketServiceImpl.saveTicket(ticket);
	}

	@PutMapping(value = "/updateticket/{ticketId}")
	public String updateTicket(@PathVariable int ticketId, @RequestBody TicketPojo ticket) {
		return ticketServiceImpl.updateTicket(ticketId, ticket);
	}

	@GetMapping(value = "/getallticket")
	public List<Ticket> getAllTicket() {
		return ticketServiceImpl.getAllTicket();
	}

	@GetMapping(value="/getticketbyuserid/{userid}")
	public List<Ticket> getticketbyuserid(@PathVariable int userid){
		return ticketServiceImpl.getTicketByUserId(userid);
	}
	
	@GetMapping(value = "/getticketbytechnicainid/{id}")
	public List<Ticket> getTicketByTechId(@PathVariable int id) {
		return ticketServiceImpl.getTicketByTechId(id);
	}

	@GetMapping(value = "/getticketbyid/{id}")
	public Ticket getTicketById(@PathVariable int id) {
		return ticketServiceImpl.getTicketById(id);
	}

	@PutMapping(value = "/updateticketstatus/{id}/{status}")
	public String updateticketstatus(@PathVariable int id,@PathVariable String status) {
		return ticketServiceImpl.updateticketstatus(id,status);
	}

	@GetMapping(value="/getticketcountbasedoncompany")
	public ResponseEntity<String> getTicketByCompany(){
		JSONObject response =ticketServiceImpl.getTicketByCompany();
	return	new ResponseEntity<>(response.toString(),HttpStatus.ACCEPTED);
		
	}
//	 @PostMapping("/{ticketId}/assign")
//	    public Ticket assignTechnician(@PathVariable int ticketId) {
//	        return ticketServiceImpl.assignTechnician(ticketId);
//	    }
//	

}
