package com.example.backendinv.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendinv.entity.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	List<OrderItem> findByName(String name);

//	List<OrderItem> findByStatusAndCreatedAt(String status, LocalDateTime minusMinutes);

	List<OrderItem> findByStatus(String status);

	List<OrderItem> findByCreatedAtBetween(LocalDateTime startTime, LocalDateTime endTime);

}