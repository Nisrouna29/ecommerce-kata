package com.codeonce.ecommerce.controller;

import com.codeonce.ecommerce.dto.OrderRequest;
import com.codeonce.ecommerce.dto.OrderSummaryDTO;
import com.codeonce.ecommerce.entity.Order;
import com.codeonce.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest.getProductQuantities(), orderRequest.getUsername());
        return ResponseEntity.ok("Order created successfully");
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable UUID id) {
        Order order = orderService.cancelOrder(id);
        return ResponseEntity.ok("Order cancelled successfully");
    }

    @GetMapping
    public List<OrderSummaryDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{username}")
    public List<OrderSummaryDTO> getOrdersByUsername(@PathVariable String username) {
        return orderService.getOrdersByUsername(username);
    }
} 