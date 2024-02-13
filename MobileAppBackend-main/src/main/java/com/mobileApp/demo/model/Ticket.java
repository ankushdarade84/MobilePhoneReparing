package com.mobileApp.demo.model;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Ticket")
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int ticketId;
	@ManyToOne
	@JoinColumn(name = "UserId")
	private User customerId;
	private String mobileModel;
	private String mobileCompany;
	private String problemDescription;
	private Date regDate;
	private String response;
	private Date newDate;
	@ManyToOne
	@JoinColumn(name = "TechId")
	private Technician techId;
	@ManyToMany
	@JoinTable(name = "TicketComponentTable" ,joinColumns=@JoinColumn(name="ticketId") ,inverseJoinColumns=@JoinColumn(name="ComponentId"))
	private Set<Component> componentId;
	private String status;
	public Ticket(User customerId, String mobileModel, String mobileCompany, String problemDescription, Date regDate,
			String response, Date newDate, Technician techId, Set<Component> componentId, String status) {
		super();
		this.customerId = customerId;
		this.mobileModel = mobileModel;
		this.mobileCompany = mobileCompany;
		this.problemDescription = problemDescription;
		this.regDate = regDate;
		this.response = response;
		this.newDate = newDate;
		this.techId = techId;
		this.componentId = componentId;
		this.status = status;
	}
	public Ticket() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getTicketId() {
		return ticketId;
	}
	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}
	public User getCustomerId() {
		return customerId;
	}
	public void setCustomerId(User customerId) {
		this.customerId = customerId;
	}
	public String getMobileModel() {
		return mobileModel;
	}
	public void setMobileModel(String mobileModel) {
		this.mobileModel = mobileModel;
	}
	public String getMobileCompany() {
		return mobileCompany;
	}
	public void setMobileCompany(String mobileCompany) {
		this.mobileCompany = mobileCompany;
	}
	public String getProblemDescription() {
		return problemDescription;
	}
	public void setProblemDescription(String problemDescription) {
		this.problemDescription = problemDescription;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public Date getNewDate() {
		return newDate;
	}
	public void setNewDate(Date newDate) {
		this.newDate = newDate;
	}
	public Technician getTechId() {
		return techId;
	}
	public void setTechId(Technician techId) {
		this.techId = techId;
	}
	public Set<Component> getComponentId() {
		return componentId;
	}
	public void setComponentId(Set<Component> componentId) {
		this.componentId = componentId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
	
}
