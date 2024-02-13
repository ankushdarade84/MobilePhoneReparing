package com.mobileApp.demo.service;

import org.json.JSONObject;

import com.mobileApp.demo.Pojo.UserPojo;
import com.mobileApp.demo.model.User;

public interface UserService {
	public JSONObject SignUP(User a);

	public JSONObject Login(UserPojo loginUser);

	public JSONObject ValidateEmail(String email);

	public String ResetPassword(UserPojo user);

	public User GetDetailsById(int id);

	public String UpdateUserDetails(int id, User user);

	public Object getUserByType(String string);

	public String deleteUserById(int id);

}
