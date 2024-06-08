package com.example.backendinv.service;

import java.util.List;

import com.example.backendinv.entity.UserEntity;
import com.example.backendinv.response.Response;

public interface UserService {

	
	UserEntity addUser(UserEntity user);
	
	List<UserEntity> viewUsers();
	
	UserEntity findByEmail(String email);
	
	boolean userExists(String email);
	
	boolean authenticate(String email, String password);
	
	void makeAdmin(Long id) throws Exception;
	
}
