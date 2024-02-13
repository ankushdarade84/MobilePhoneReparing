package com.mobileApp.demo.ServiceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobileApp.demo.Pojo.CompanyTicket;
import com.mobileApp.demo.Pojo.TicketPojo;
import com.mobileApp.demo.model.Component;
import com.mobileApp.demo.model.Technician;
import com.mobileApp.demo.model.Ticket;
import com.mobileApp.demo.model.User;
import com.mobileApp.demo.repo.ComponentRepo;
import com.mobileApp.demo.repo.TechnicianRepo;
import com.mobileApp.demo.repo.TicketRepo;
import com.mobileApp.demo.repo.UserRepo;
import com.mobileApp.demo.service.TicketService;

@Service
public class TicketSeviceImplementation implements TicketService {
	final static Logger logger = LoggerFactory.getLogger(TicketSeviceImplementation.class);

	@Autowired
	TicketRepo ticketRepo;

	@Autowired
	UserRepo userRepo;

	@Autowired
	TechnicianServiceImpl TechnicianImpl;
	@Autowired
	TechnicianRepo techRepo;

	@Autowired
	ComponentRepo componentRepo;
	
	
	@Override
	public String saveTicket(TicketPojo ticket) {
		try {
			Optional<User> user = userRepo.findById(ticket.getCustomerId());
			System.out.print(user.toString());
			if (user.isPresent()) {
				User newUser = user.get();
				Ticket newTicket = new Ticket();
				newTicket.setCustomerId(newUser);
				newTicket.setMobileModel(ticket.getMobileModel());
				newTicket.setMobileCompany(ticket.getMobileCompany());
				newTicket.setProblemDescription(ticket.getProblemDescription());
				newTicket.setRegDate(new Date());
				Technician technician = techRepo.findTechnician();
				newTicket.setTechId(technician);
				int count = technician.getTicketcount();
				technician.setTicketcount(count + 1);
				int activeCount = technician.getActiveTicketCount();
				technician.setActiveTicketCount(activeCount+1);
				techRepo.save(technician);
				newTicket.setStatus("Allocated");

				List<Integer> componentIdList = ticket.getComponentId();

				if ((componentIdList!=null)) {
					Set<Component> ComponentList = new HashSet<>();
					for (int id : componentIdList) {
						Optional<Component> component = componentRepo.findById(id);
						if (component.isPresent()) {
							ComponentList.add(component.get());
						} else {
							logger.error("Component not found");
							throw new RuntimeException("Component not found");
						}
					}
					newTicket.setComponentId(ComponentList);
				}
				Ticket ticketSaved = ticketRepo.save(newTicket);
				logger.info("Ticket saved with ID {}", ticketSaved);
				return (ticketSaved.toString());

			} else {
				logger.error("User not found");
				throw new RuntimeException("User not found");
			}
//			Ticket ticketSaved=ticketRepo.save(ticket);

		} catch (Exception e) {
			logger.error("Error occurred while Sending Ticket details {}", e.getMessage());
			throw new RuntimeException("Ticket Error");
		}
	}


	@Override
	public String updateTicket(int ticketId, TicketPojo ticket) {
		try {
			Optional<Ticket> newTicket = ticketRepo.findById(ticketId);
			if (newTicket.isPresent()) {
				Ticket existingTicket = newTicket.get();
				existingTicket.setMobileModel(ticket.getMobileModel());
				existingTicket.setProblemDescription(ticket.getProblemDescription());
				existingTicket.setResponse(ticket.getResponse());
				existingTicket.setNewDate(new Date());
				List<Integer> componentIdList = ticket.getComponentId();
				if (!(componentIdList.isEmpty())) {
					Set<Component> ComponentList = new HashSet<>();
					for (int id : componentIdList) {
						Optional<Component> component = componentRepo.findById(id);
						if (component.isPresent()) {
							ComponentList.add(component.get());
						} else {
							logger.error("Component not found");
							throw new RuntimeException("Component not found");
						}
					}
					existingTicket.setComponentId(ComponentList);
				}
	

				logger.info("Ticket details updated successfully for user with id {}", existingTicket.getTicketId());
				return (ticketRepo.save(existingTicket).toString());
			} else {
				logger.error("Error occurred while updating Ticket details for user with id {}: {}", ticketId);
				throw new RuntimeException("Ticket Error");
			}
		} catch (Exception e) {
			logger.error("Error occurred while updating Ticket details for user with id {}: {}", ticket.getTicketId(),
					e.getMessage());
			throw new RuntimeException("Ticket Error");
		}
	}

	@Override
	public List<Ticket> getAllTicket() {
		try {
			logger.info("Retrieved all tickets successfully. {} ", ticketRepo.findAll());
			return ticketRepo.findAll();
		} catch (Exception e) {
			logger.error("Error occurred while Getting All Ticket details {}", e.getMessage());
			throw new RuntimeException("Ticket Error");
		}

	}

	@Override
	public List<Ticket> getTicketByTechId(int id) {
		try {
			logger.info("Getting ticket by tech ID: {}", id);
		Technician tech=	TechnicianImpl.getTechnician(id);
		System.out.print(tech.toString());
			return ticketRepo.findByTechId(tech);

		} catch (Exception e) {
			logger.error("Error occurred while Getting Ticket by Techniaian Id {}", e.getMessage());
			throw new RuntimeException("Ticket Error from getTicketByTechId");
		}

	}

	@Override
	public Ticket getTicketById(int id) {
		try {
			logger.info("Retrieving ticket with ID {}", id);
			return ticketRepo.findById(id).get();
		} catch (Exception e) {
			logger.error("Error occurred while Getting Ticket by Technician Id {}", e.getMessage());
			throw new RuntimeException("Ticket Error");
		}

	}

	@Override
	public String updateticketstatus(int id, String status) {
		try {
			Optional<Ticket> ticket = ticketRepo.findById(id);
			if (ticket.isPresent()) {
				Ticket newTicket = ticket.get();
				String oldStatus = newTicket.getStatus();
				if (oldStatus.equals(status)) {
					logger.info("Ticket with id {} status has been already updated", id);
					return "already updated";
				} else {
					if (status.equals("Closed")) {
						Technician technician = newTicket.getTechId();
						int sum=technician.getPartPrice();
						int counter=technician.getPartUsed();
						Set<Component> componentList=newTicket.getComponentId();
						List<Component> newComponentList=new ArrayList<>();
						if(componentList!=null) {
							for(Component component:componentList) {
								sum=sum+component.getPrice();
								counter=counter+1;
								int stockcount=component.getInStock();
								component.setInStock(stockcount-1);
								newComponentList.add(component);
								
							}
						}
						componentRepo.saveAll(newComponentList);
						technician.setPartPrice(sum);
						technician.setPartUsed(counter);
						int count = technician.getActiveTicketCount();
						if (count > 0) {
							technician.setActiveTicketCount(count - 1);
						}
						techRepo.save(technician);
					}
					newTicket.setNewDate(new Date());
					newTicket.setStatus(status);
					ticketRepo.save(newTicket);
					logger.info("Ticket with id {} has been Status has been updated-deleted successfully.", id);
					return "updated Success";
				}
			} else {
				logger.error("Error occurred while updating status as Deleted Ticket by Id ");
			}

		} catch (Exception e) {
			logger.error("Error occurred while updating status as Deleted Ticket by Id {}", e.getMessage());
			throw new RuntimeException("Ticket Error");
		}
		return "Error";
	}


	public JSONObject getTicketByCompany() {
	List<CompanyTicket> list=	ticketRepo.findticketByCompany();
	JSONObject response = new JSONObject();
	response.put("tikcets",list);
	return response;
	}
@Override
	public List<Ticket> getTicketByUserId(int id) {
		try {
		Optional<User> user=userRepo.findById(id);
		if(user.isPresent()) {
			return ticketRepo.findByCustomerId(user.get());
		}

		}
		catch(Exception e) {
			logger.error("Error while getting ticked based on userid", e.getMessage());
			throw new RuntimeException("Ticket Error");
		}
		return null;
	}

}
