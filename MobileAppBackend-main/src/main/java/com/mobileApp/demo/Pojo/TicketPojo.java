package com.mobileApp.demo.Pojo;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class TicketPojo {
		private int ticketId;
		private int customerId;
		private String mobileModel;
		private String mobileCompany;
		private String problemDescription;
		private Date regDate;
		private String response;
		private Date newDate;
		private int techId;
		private String status;
		private List<Integer> componentId;
		
		
}
