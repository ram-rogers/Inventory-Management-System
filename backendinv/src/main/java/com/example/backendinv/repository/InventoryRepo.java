package com.example.backendinv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendinv.entity.Inventory;
import com.example.backendinv.entity.Orders;
import com.example.backendinv.entity.UserEntity;


@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Integer> {
	
	Inventory findByMaterialId(String materialId);

	Orders save(Orders order);



}
