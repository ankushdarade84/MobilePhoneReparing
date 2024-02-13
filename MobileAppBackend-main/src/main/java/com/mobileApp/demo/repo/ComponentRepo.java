package com.mobileApp.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mobileApp.demo.model.Component;
@Repository
public interface ComponentRepo extends JpaRepository<Component,Integer>{

}
