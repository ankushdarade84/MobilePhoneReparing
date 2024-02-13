package com.mobileApp.demo.Pojo;

public class CompanyTicket {
Long count;
String Name;
public CompanyTicket(Long count, String name) {
	super();
	this.count = count;
	Name = name;
}
public CompanyTicket(String name) {
	super();
	Name = name;
}
public CompanyTicket() {
	super();
	// TODO Auto-generated constructor stub
}
public Long getCount() {
	return count;
}
public void setCount(Long count) {
	this.count = count;
}
public String getName() {
	return Name;
}
public void setName(String name) {
	Name = name;
}


	
}
