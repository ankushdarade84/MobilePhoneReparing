package com.mobileApp.demo.model;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Technician")
public class Technician {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String name;
	private String address;
	private long mobileNo;
	private String email;
	private String password;
	private String type;
	private int ticketcount;
	private float efficiency;
	private int activeTicketCount;
	private int partUsed;
	private int partPrice;
	private String status;
}
