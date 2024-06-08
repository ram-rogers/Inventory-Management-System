package com.example.backendinv.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Inventory")
public class Inventory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
//	@Column(name = "LocationNbr", nullable = false)
//	private int locationNbr;
	
	@Column(name = "MaterialId", length = 255, nullable = false)
	private String materialId;
	
//	@Column(name = "ResetQty", nullable = false)
//	private int resetQty;
//	
	@Column(name = "TotalSales",length = 255, nullable = false)
	private Integer totalSales = 0;
	
	@Column(name = "AvailableQuantity", nullable = false)
	private int availableQuantity;
	
	@Column(name = "UpdateDateTime", nullable = false)
	private String updateDateTime;  

   
}
