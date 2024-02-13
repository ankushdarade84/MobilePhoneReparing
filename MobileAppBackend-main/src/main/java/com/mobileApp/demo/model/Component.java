package com.mobileApp.demo.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Component")
public class Component {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	int componentId;
	String componentTitle;
	String requestingCompany;
	int qty;
	int price;
	Date requiredDate;
	@ManyToOne
	@JoinColumn(name="Techid")
	Technician id;
	int inStock;
	String description;
}
