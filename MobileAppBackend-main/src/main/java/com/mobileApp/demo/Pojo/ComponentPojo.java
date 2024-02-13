package com.mobileApp.demo.Pojo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComponentPojo {


	String componentTitle;
	String requestingCompany;
	int qty;
	Date requiredDate;
	int techid;
	int inStock;
	String description;
	int price;
	
	
}
