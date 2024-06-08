package com.example.backendinv.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendinv.entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long>{

	
	boolean existsByEmail(String email);
	
	UserEntity findByName(String name);

	UserEntity findByEmail(String email);
}
 