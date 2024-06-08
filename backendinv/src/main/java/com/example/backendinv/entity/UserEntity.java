package com.example.backendinv.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

    

@Entity
@Data 
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User")
public class UserEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
	private Long id;
	
	
	
	@Column(nullable = false)
	private String name;
	

	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String contact;
	
	@Column(nullable = false)
	private String role;
	
	@Column(nullable = false)
	private LocalDate dob;
	
	@Column(nullable = false)
	private String password;


	
	

}
