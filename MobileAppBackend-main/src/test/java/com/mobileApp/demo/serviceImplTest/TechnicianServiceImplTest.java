package com.mobileApp.demo.serviceImplTest;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.mobileApp.demo.Pojo.TechnicianPartsUsed;
import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.ServiceImpl.TechnicianServiceImpl;
import com.mobileApp.demo.model.Technician;
import com.mobileApp.demo.repo.TechnicianRepo;
import com.mobileApp.demo.util.Utilities;

class TechnicianServiceImplTest {

    @Mock
    private TechnicianRepo techRepo;

    @InjectMocks
    private TechnicianServiceImpl technicianService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSignup_Successful() {
        Technician technician = new Technician();
        technician.setEmail("test@example.com");
        technician.setPassword("password");
        technician.setType("Technician");

        when(techRepo.save(any(Technician.class))).thenReturn(technician);

        JSONObject response = technicianService.signup(technician);

        assertTrue(response.getBoolean("Status"));
        assertEquals("SignUp Successful", response.getString("Message"));
    }

    @Test
    void testSignup_Exception() {
        Technician technician = new Technician();
        technician.setEmail("test@example.com");
        technician.setPassword("password");
        technician.setType("Technician");

        when(techRepo.save(any(Technician.class))).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> technicianService.signup(technician));
    }

    @Test
    void testLogin_ValidCredentials() {
        UserPojo loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("test@example.com");
        loginUser.setPassword("password");

        Technician technician = new Technician();
        technician.setEmail("test@example.com");
        technician.setPassword(Utilities.hashPassword("password"));

        List<Technician> userList = new ArrayList<>();
        userList.add(technician);

        when(techRepo.findByEmail(loginUser.getEmail().toLowerCase())).thenReturn(userList);

        JSONObject response = technicianService.Login(loginUser);

        assertEquals("Login Successful", response.getString("Message"));
        assertEquals(technician.getId(), response.getInt("LoginId"));
    }

    @Test
    void testLogin_InvalidCredentials() {
        UserPojo loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("test@example.com");
        loginUser.setPassword("password");

        when(techRepo.findByEmail(loginUser.getEmail().toLowerCase())).thenReturn(new ArrayList<>());

        JSONObject response = technicianService.Login(loginUser);

        assertEquals("Invalid Credentials", response.getString("Message"));
    }

    @Test
    void testTechnicianPartDetails() {
        List<TechnicianPartsUsed> partsUsedList = new ArrayList<>();
        // Add test data to the list

        when(techRepo.findTechnicianPartDetails()).thenReturn(partsUsedList);

        JSONObject response = technicianService.TechnicianPartDetails();

        assertEquals(partsUsedList, response.get("Details"));
    }

    @Test
    void testGetTechnician_ExistingTechnician() {
        int id = 1;
        Technician technician = new Technician();
        technician.setId(id);

        Optional<Technician> optionalTechnician = Optional.of(technician);
        when(techRepo.findById(id)).thenReturn(optionalTechnician);

        Technician result = technicianService.getTechnician(id);

        assertEquals(technician, result);
    }

    @Test
    void testGetTechnician_NonExistingTechnician() {
        int id = 1;
        when(techRepo.findById(id)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> technicianService.getTechnician(id));
    }

    @Test
    void testGetAllTechnician() {
        List<Technician> technicianList = new ArrayList<>();
        // Add test data to the list

        when(techRepo.findAll()).thenReturn(technicianList);

        List<Technician> result = technicianService.getAllTechnician();

        assertEquals(technicianList, result);
    }

    @Test
    void testUpdateTechStatus_ExistingTechnician() {
        int id = 1;
        String status = "Active";

        Technician technician = new Technician();
        technician.setId(id);
        technician.setStatus("Inactive");

        Optional<Technician> optionalTechnician = Optional.of(technician);
        when(techRepo.findById(id)).thenReturn(optionalTechnician);
        when(techRepo.save(any(Technician.class))).thenReturn(technician);

        String result = technicianService.updateTechStatus(id, status);

        assertEquals("success", result);
        assertEquals(status, technician.getStatus());

        verify(techRepo, times(1)).findById(id);
        verify(techRepo, times(1)).save(technician);
    }

    @Test
    void testUpdateTechStatus_NonExistingTechnician() {
        int id = 1;
        String status = "Active";

        when(techRepo.findById(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> technicianService.updateTechStatus(id, status));
    }

    @Test
    void testGetTechStatus_ExistingTechnician() {
        int id = 1;
        String status = "Active";

        Technician technician = new Technician();
        technician.setId(id);
        technician.setStatus(status);

        Optional<Technician> optionalTechnician = Optional.of(technician);
        when(techRepo.findById(id)).thenReturn(optionalTechnician);

        String result = technicianService.getTechStatus(id);

        assertEquals(status, result);
    }

    @Test
    void testGetTechStatus_NonExistingTechnician() {
        int id = 1;

        when(techRepo.findById(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> technicianService.getTechStatus(id));
    }
}
