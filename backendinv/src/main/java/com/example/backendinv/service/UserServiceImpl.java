package com.example.backendinv.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backendinv.entity.OrderItem;
import com.example.backendinv.entity.UserEntity;
import com.example.backendinv.repository.UserRepo;
import com.example.backendinv.response.Response;

@Service
public class UserServiceImpl implements UserService{
	
	
	@Autowired
    private UserRepo userRepository;
    
    @Autowired   
    private BCryptPasswordEncoder passwordEncoder;
    
    @Override
	public List<UserEntity> viewUsers() {
		return userRepository.findAll();
		
	}

    
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean userExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    
    public void makeAdmin(Long id) throws Exception {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("Order item not found"));
//        Orders order = orderItem.getOrder();
//        if (order == null) {
//            throw new Exception("Order not associated with this item");
//        }
        user.setRole("admin");; // Set order to approve
        userRepository.save(user);
    }
    



    @Override
    public UserEntity addUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    
    @Override
    public boolean authenticate(String email, String password) {
        UserEntity user = findByEmail(email);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
   

}
