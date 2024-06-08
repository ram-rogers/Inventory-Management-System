package com.example.backendinv.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "order_items") // Use lowercase for table name
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "materialId", nullable = false)
    private String materialId;

    @Column(name = "quantity", nullable = false)
    private int quantity;
    
    @Column(name = "orderedBy", nullable = false)
    private String name;
    
    @Column(name = "status", nullable = false)
    private String status;
    
    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;
      
    

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;
}