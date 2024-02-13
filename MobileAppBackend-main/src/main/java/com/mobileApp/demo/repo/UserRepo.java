package com.mobileApp.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mobileApp.demo.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	List<User> findByEmail(String email);

	List<User> findByType(String type);


}
