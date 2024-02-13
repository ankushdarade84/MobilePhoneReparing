package com.mobileApp.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mobileApp.demo.Pojo.CompanyTicket;
import com.mobileApp.demo.model.Technician;
import com.mobileApp.demo.model.Ticket;
import com.mobileApp.demo.model.User;
	
@Repository
public interface TicketRepo extends JpaRepository<Ticket, Integer> {

	List<Ticket> findByTechId(Technician tech);

	Ticket findByTicketId(int ticketId);
	

        long countByTechId(User user);
        
      @Query("SELECT new com.mobileApp.demo.Pojo.CompanyTicket(COUNT(*),mobileCompany ) FROM Ticket  group by mobileCompany")
      List<CompanyTicket> findticketByCompany();

      
      List<Ticket> findByCustomerId(User user);

}
