package com.mobileApp.demo.serviceImplTest;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.model.User;
import com.mobileApp.demo.repo.UserRepo;
import com.mobileApp.demo.util.Utilities;
import com.mobileApp.demo.ServiceImpl.UserServiceImplementation;

@RunWith(MockitoJUnitRunner.class)
class UserServiceImplementationTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserServiceImplementation userService;

    private User user;
    private UserPojo loginUser;
    private UserPojo resetUser;

    @Before
    public void setup() {
        user = new User();
        user.setId(2);
        user.setName("test user");
        user.setEmail("testuser@gmail.com");
        user.setPassword("testuser");
        user.setMobileNo(1234567890);
        user.setType("Customer");

        loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("testuser@gmail.com");
        loginUser.setPassword("testuser");

        resetUser = new UserPojo(null, null, null);
        resetUser.setEmail("testuser@gmail.com");
        resetUser.setPassword("testpass");
        resetUser.setConfirmPassword("testpass");
    }

    @Test
    public void testSignUP() {
        when(userRepo.save(any(User.class))).thenReturn(user);

        JSONObject response = userService.SignUP(user);

        verify(userRepo, times(1)).save(any(User.class));
        assertEquals(true, response.getBoolean("Status"));
        assertEquals("SignUp Successful", response.getString("Message"));
    }
    
    @Test(expected = RuntimeException.class)
    public void testSignUP_Exception() {
        User user = new User();
        user.setName("John Doe");
        user.setEmail("johndoe@example.com");
        user.setPassword("password");

        doThrow(new RuntimeException("Error saving user")).when(userRepo).save(any(User.class));

        userService.SignUP(user);
    }

    @Test
    public void testLogin() {
    	User user = new User();
        user.setId(1);
        user.setEmail("johndoe@example.com");
        user.setPassword(Utilities.hashPassword("password"));
        user.setType("Customer");

        UserPojo loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("johndoe@example.com");
        loginUser.setPassword("password");

        when(userRepo.findByEmail(anyString())).thenReturn(Collections.singletonList(user));

        JSONObject response = userService.Login(loginUser);

        verify(userRepo, times(1)).findByEmail(anyString());
        assertEquals("Login Successful", response.getString("Message"));
        assertEquals("Customer", response.getString("UserType"));
        assertEquals(1, response.getInt("LoginId"));
    }

    @Test
    public void testLogin_IncorrectPassword() {
        User invalidPasswordUser = new User();
        invalidPasswordUser.setId(2);
        invalidPasswordUser.setName("Jane Doe");
        invalidPasswordUser.setEmail("janedoe@example.com");
        invalidPasswordUser.setPassword("wrongpassword");
        invalidPasswordUser.setType("Customer");

        when(userRepo.findByEmail(anyString())).thenReturn(Collections.singletonList(invalidPasswordUser));

        JSONObject response = userService.Login(loginUser);

        verify(userRepo, times(1)).findByEmail(anyString());
        assertEquals("Incorrect Password", response.getString("Message"));
    }
    @Test
    public void testLogin_InvalidCredentials() {
        UserPojo loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("johndoe@example.com");
        loginUser.setPassword("password");

        when(userRepo.findByEmail(anyString())).thenReturn(Collections.emptyList());

        JSONObject response = userService.Login(loginUser);

        verify(userRepo, times(1)).findByEmail(anyString());
        assertEquals("Invalid Credentials", response.getString("Message"));
    }

    @Test(expected = RuntimeException.class)
    public void testLogin_Exception() {
        UserPojo loginUser = new UserPojo(null, null, null);
        loginUser.setEmail("johndoe@example.com");
        loginUser.setPassword("password");

        when(userRepo.findByEmail(anyString())).thenThrow(new RuntimeException("Error logging in"));

        userService.Login(loginUser);
    }

    @Test
    public void testValidateEmail() {
        when(userRepo.findByEmail(anyString())).thenReturn(Collections.emptyList());

        JSONObject response = userService.ValidateEmail("newuser@example.com");

        verify(userRepo, times(1)).findByEmail(anyString());
        assertTrue(response.getBoolean("Status"));
        assertEquals("Email registration successful", response.getString("Message"));
    }

    @Test
    public void testValidateEmail_EmailAlreadyPresent() {
        when(userRepo.findByEmail(anyString())).thenReturn(Collections.singletonList(user));

        JSONObject response = userService.ValidateEmail("johndoe@example.com");
        verify(userRepo, times(1)).findByEmail(anyString());
        assertEquals(false, response.getBoolean("Status"));
        assertEquals("Failed! Email Already Present", response.getString("Message"));
    }

    @Test
    public void testResetPassword() {
        when(userRepo.findByEmail(anyString())).thenReturn(Collections.singletonList(user));

        String result = userService.ResetPassword(resetUser);

        verify(userRepo, times(1)).findByEmail(anyString());
        verify(userRepo, times(1)).save(any(User.class));
        assertEquals("Password Reset Successful", result);
    }

    @Test
    public void testResetPassword_InvalidCredentials() {
        when(userRepo.findByEmail(anyString())).thenReturn(Collections.emptyList());

        String result = userService.ResetPassword(resetUser);

        verify(userRepo, times(1)).findByEmail(anyString());
        assertEquals("Invalid Credentials", result);
    }

    @Test
    public void testResetPassword_PasswordDoNotMatch() {
        resetUser.setConfirmPassword("wrongpassword");

        String result = userService.ResetPassword(resetUser);

        assertEquals("Password Do not match", result);
    }

    @Test
    public void testGetDetailsById() {
        when(userRepo.findById(anyInt())).thenReturn(Optional.of(user));

        User result = userService.GetDetailsById(1);

        verify(userRepo, times(1)).findById(anyInt());
        assertNotNull(result);
        assertEquals(user, result);
    }

    @Test
    public void testGetDetailsById_UserNotFound() {
        when(userRepo.findById(anyInt())).thenReturn(Optional.empty());

        User result = userService.GetDetailsById(2);

        verify(userRepo, times(1)).findById(anyInt());
        assertEquals(null, result);
    }

    @Test
    public void testUpdateUserDetails() {
        when(userRepo.findById(anyInt())).thenReturn(Optional.of(user));
        when(userRepo.save(any(User.class))).thenReturn(user);

        String result = userService.UpdateUserDetails(1, user);

        verify(userRepo, times(1)).findById(anyInt());
        verify(userRepo, times(1)).save(any(User.class));
        assertEquals("Success", result);
    }

    @Test(expected = RuntimeException.class)
    public void testUpdateUserDetails_UserNotFound() {
        when(userRepo.findById(anyInt())).thenReturn(Optional.empty());

        userService.UpdateUserDetails(2, user);
    }

    @Test
    public void testGetUserByType() {
        List<User> userList = Collections.singletonList(user);
        when(userRepo.findByType(anyString())).thenReturn(userList);

        List<User> result = userService.getUserByType("Customer");

        verify(userRepo, times(1)).findByType(anyString());
        assertEquals(userList, result);
    }

    @Test(expected = RuntimeException.class)
    public void testGetUserByType_Error() {
        when(userRepo.findByType(anyString())).thenThrow(new RuntimeException());

        userService.getUserByType("Admin");
    }

    @Test
    public void testDeleteUserById() {
        userService.deleteUserById(1);

        verify(userRepo, times(1)).deleteById(anyInt());
    }

    @Test(expected = RuntimeException.class)
    public void testDeleteUserById_Error() {
        doThrow(new RuntimeException()).when(userRepo).deleteById(anyInt());

        userService.deleteUserById(2);
    }
}

