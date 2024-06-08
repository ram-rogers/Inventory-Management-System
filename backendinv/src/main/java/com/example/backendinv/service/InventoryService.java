package com.example.backendinv.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendinv.entity.Inventory;
import com.example.backendinv.repository.InventoryRepo;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepo inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(int id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventory(Inventory inventory) {
    	inventory.setUpdateDateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy  HH:mm:ss")));
        return inventoryRepository.save(inventory);  
    }  

    public Inventory updateInventory(int id, Inventory inventoryDetails) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {
            existingInventory.setMaterialId(inventoryDetails.getMaterialId());
            existingInventory.setUpdateDateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy  HH:mm:ss")));           
            existingInventory.setAvailableQuantity(inventoryDetails.getAvailableQuantity());
            return inventoryRepository.save(existingInventory);
        } else {
            return null; // Or handle as needed (throw exception, return ResponseEntity with error message, etc.)
        }
    }

    public void deleteInventory(int id) {
        inventoryRepository.deleteById(id);
    }
    
    
    
    
}