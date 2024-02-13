package com.mobileApp.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mobileApp.demo.Pojo.TechnicianPartsUsed;
import com.mobileApp.demo.model.Technician;
//u.partUsed,u.id,u.partPrice,
@Repository
public interface TechnicianRepo extends JpaRepository<Technician,Integer>{
	
	@Query("SELECT u from Technician u WHERE status='Active' ORDER BY activeTicketCount ASC LIMIT 1")
	Technician findTechnician();
	@Query("SELECT new com.mobileApp.demo.Pojo.TechnicianPartsUsed(u.partUsed,u.id,u.partPrice,u.name) from Technician u WHERE status='Active' ORDER BY partUsed DESC")
	List<TechnicianPartsUsed> findTechnicianPartDetails();
	
	List<Technician> findByEmail(String email);
	
}
