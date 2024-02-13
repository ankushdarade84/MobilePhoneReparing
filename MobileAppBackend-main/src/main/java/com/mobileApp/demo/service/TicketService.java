package com.mobileApp.demo.service;

import java.util.List;

import com.mobileApp.demo.Pojo.TicketPojo;
import com.mobileApp.demo.model.Ticket;

public interface TicketService {




	public List<Ticket> getAllTicket();

	public List<Ticket> getTicketByTechId(int id);



	public Ticket getTicketById(int id);



public String saveTicket(TicketPojo ticket);

public String updateticketstatus(int id, String status);

public String updateTicket(int ticketId, TicketPojo ticket);

List<Ticket> getTicketByUserId(int id);

}
