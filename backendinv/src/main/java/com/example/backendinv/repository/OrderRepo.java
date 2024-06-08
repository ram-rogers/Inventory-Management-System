package com.example.backendinv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.backendinv.entity.Orders;

@Repository
public interface OrderRepo extends JpaRepository<Orders, Long>{

}

