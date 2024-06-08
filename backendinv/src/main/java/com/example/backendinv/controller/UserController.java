package com.example.backendinv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.example.backendinv.dto.LoginDTO;
import com.example.backendinv.entity.OrderItem;
import com.example.backendinv.entity.UserEntity;
import com.example.backendinv.repository.OrderItemRepository;
import com.example.backendinv.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	

	@GetMapping("/helo")
	public String greet() {
		return "Hello World";

	}

	@GetMapping("/users")
	public List<UserEntity> viewUsers() {
		return userService.viewUsers();
	}
	
	@GetMapping("/{email}")
	UserEntity getUserById(@PathVariable String email) {
		return userService.findByEmail(email);
	}
	


	
	@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        if (userService.userExists(user.getEmail())) {
            return ResponseEntity.status(400).body("Email already exists");
        }
        userService.addUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
	
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
		UserEntity user = userService.findByEmail(loginDTO.getEmail());
        if (user == null) {
            return ResponseEntity.status(404).body("User hasn't registered yet");
        }
        boolean isAuthenticated = userService.authenticate(loginDTO.getEmail(), loginDTO.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid password");
        }
    }
	
	@PostMapping("/approve/{id}")
    public ResponseEntity<?> approveOrder(@PathVariable Long id) {
        try {
            userService.makeAdmin(id);
            return ResponseEntity.ok("Role changed Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
	
	
	
	  
	

}
