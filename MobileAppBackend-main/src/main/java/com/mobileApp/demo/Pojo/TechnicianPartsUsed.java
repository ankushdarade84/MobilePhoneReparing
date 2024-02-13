package com.mobileApp.demo.Pojo;

public class TechnicianPartsUsed {

	int componentUsed;
	int technicianId;
	int Price;
	String Name;
	public TechnicianPartsUsed(int componentUsed, int technicianId, int price, String name) {
		super();
		this.componentUsed = componentUsed;
		this.technicianId = technicianId;
		Price = price;
		Name = name;
	}
	public TechnicianPartsUsed() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getComponentUsed() {
		return componentUsed;
	}
	public void setComponentUsed(int componentUsed) {
		this.componentUsed = componentUsed;
	}
	public int getTechnicianId() {
		return technicianId;
	}
	public void setTechnicianId(int technicianId) {
		this.technicianId = technicianId;
	}
	public int getPrice() {
		return Price;
	}
	public void setPrice(int price) {
		Price = price;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}

	
}
