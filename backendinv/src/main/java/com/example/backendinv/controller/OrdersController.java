package com.example.backendinv.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendinv.entity.Inventory;
import com.example.backendinv.entity.OrderItem;
import com.example.backendinv.entity.Orders;
import com.example.backendinv.entity.UserEntity;
import com.example.backendinv.repository.OrderItemRepository;
import com.example.backendinv.service.OrderService;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")

public class OrdersController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderItemRepository orderItemRepo;

	@GetMapping
	public ResponseEntity<List<Inventory>> viewInventories() {
		List<Inventory> inventories = orderService.viewItems();
		return ResponseEntity.ok().body(inventories);
	}
	
	@GetMapping("/pen")
	public List<OrderItem> orderPending(){
		List<OrderItem> orders = orderItemRepo.findAll();
		return orders;
	}

	@GetMapping("/view")
	public ResponseEntity<List<Orders>> viewOrders() {
		List<Orders> orders = orderService.viewOrders();
		return ResponseEntity.ok().body(orders);
	}

	@GetMapping("/list")
	public ResponseEntity<List<OrderItem>> viewOrderList() {
		List<OrderItem> orders = orderService.viewOrderList();
		return ResponseEntity.ok().body(orders);
	}

	@GetMapping("/{name}")
	List<OrderItem> getOrderByName(@PathVariable String name) {
		List<OrderItem> orders = orderItemRepo.findByName(name);
		return orders;

	}

	@PostMapping
	public ResponseEntity<?> placeOrder(@RequestParam String username, @RequestBody List<OrderItem> items) {
		try {
			Orders order = orderService.placeOrder(username, items);

			return ResponseEntity.ok(order);
		} catch (Exception e) {
			return ResponseEntity.status(400).body(e.getMessage());
		}
	}

	@PostMapping("/send")
	public ResponseEntity<?> sendEmail() {
		try {
			orderService.sendEmail();
			return ResponseEntity.ok("Email sent successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
		}
	}

	@PostMapping("/approve/{id}")
	public ResponseEntity<?> approveOrder(@PathVariable Long id) {
		try {
			orderService.approveOrder(id);
			return ResponseEntity.ok("Order approved successfully");
		} catch (Exception e) {
			return ResponseEntity.status(400).body(e.getMessage());
		}
	}

}
