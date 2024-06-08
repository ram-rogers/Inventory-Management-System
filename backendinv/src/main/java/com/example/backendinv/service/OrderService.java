package com.example.backendinv.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.backendinv.entity.Inventory;
import com.example.backendinv.entity.OrderItem;
import com.example.backendinv.entity.Orders;
import com.example.backendinv.repository.InventoryRepo;
import com.example.backendinv.repository.OrderItemRepository;
import com.example.backendinv.repository.OrderRepo;

@Service
public class OrderService {
	
	@Autowired
    private OrderRepo orderRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepo;

    @Autowired
    private InventoryRepo inventoryRepository;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    
    
    
    public List<Inventory> viewItems() {
        return inventoryRepository.findAll();
    }
    
    public List<Orders> viewOrders() {
        return orderRepository.findAll();
    }
    
    public List<OrderItem> viewOrderList() {
        return orderItemRepo.findAll();
    }
    
    

    
    public void sendEmail() {
    	SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("ram23rogers@gmail.com");
        message.setSubject("Approve Pending Orders in Inventory Management System");
        message.setText("Dear Admin,\r\n"
        		+ "\r\n"
        		+ "I hope this email finds you well. As part of our ongoing inventory management process, I would like to kindly remind you to review and approve the pending orders in our system. These orders are crucial for maintaining accurate stock levels and ensuring timely fulfillment for our customers.\r\n"
        		+ "\r\n"
        		+ "Action Required:\r\n"
        		+ "\r\n"
        		+ "Log in to the inventory management system.\r\n"
        		+ "Navigate to the “Pending Orders” section.\r\n"
        		+ "Review each order carefully.\r\n"
        		+ "Approve or reject the orders based on availability, pricing, and other relevant factors.\r\n"
        		+ "By promptly approving these orders, we can avoid delays in product delivery and maintain efficient operations. If you have any questions or need assistance, please feel free to reach out to me.\r\n"
        		+ "\r\n"
        		+ "Thank you for your attention to this matter. Your cooperation is greatly appreciated.\r\n"
        		+ "\r\n\n\n");
        javaMailSender.send(message);
    }  
    
    
    
    
    @Scheduled(fixedRate= 1*60*1000)
    public void checkPendingOrdrrs() {
    	System.out.println("function calling");

    	List<OrderItem> ordersCreated = orderItemRepo.findAll();
    	String mail = "";
    	
    	
    	for(OrderItem order : ordersCreated) {
    		if(order.getCreatedAt().minusMinutes(30) != null && order.getStatus().equalsIgnoreCase("Pending")) {
    			mail = "send";
    			System.out.println(mail);
    			break;
    		}
    				
    	}  
    	  
    	if(mail.equalsIgnoreCase("send")) {  
    		sendEmail();
    		System.out.println("Mail Sent");
    	}
    	  
    }  
    
    
    public Orders placeOrder(String username, List<OrderItem> items) throws Exception {
        for (OrderItem item : items) {
            Inventory inventory = inventoryRepository.findByMaterialId(item.getMaterialId());
            item.setName(username);
            item.setStatus("Pending");
            item.setCreatedAt(LocalDateTime.now());
            if (inventory == null || inventory.getAvailableQuantity() < item.getQuantity()) {
                throw new Exception("Item not available or insufficient quantity");
            }
            inventory.setAvailableQuantity(inventory.getAvailableQuantity() - item.getQuantity());
            inventory.setTotalSales(inventory.getTotalSales() + item.getQuantity());
            inventoryRepository.save(inventory);
            
        }
  
        Orders order = new Orders();
        order.setUsername(username);
        order.setItems(items);
        order.setOrderDateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        return orderRepository.save(order);
    }
    
    
    public void approveOrder(Long id) throws Exception {
        OrderItem orderItem = orderItemRepo.findById(id)
                .orElseThrow(() -> new Exception("Order item not found"));
//        Orders order = orderItem.getOrder();
//        if (order == null) {
//            throw new Exception("Order not associated with this item");
//        }
        orderItem.setStatus("Approved");; // Set order to approve
        orderItemRepo.save(orderItem);
    }
    

}
