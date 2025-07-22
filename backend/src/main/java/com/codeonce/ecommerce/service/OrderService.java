package com.codeonce.ecommerce.service;

import com.codeonce.ecommerce.entity.*;
import com.codeonce.ecommerce.repository.*;
import com.codeonce.ecommerce.dto.OrderSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private UserRepository userRepository;


    @Transactional
    public Order createOrder(Map<UUID, Integer> productQuantities, String username) {
        List<OrderItem> items = new ArrayList<>();
        for (Map.Entry<UUID, Integer> entry : productQuantities.entrySet()) {
            Product product = productRepository.findById(entry.getKey())
                .orElseThrow(() -> new RuntimeException("Product not found: " + entry.getKey()));
            OrderItem item = new OrderItem(UUID.randomUUID(), product, entry.getValue(), null);
            items.add(item);
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("username not found: username" ));
        Order order = new Order(UUID.randomUUID(), new ArrayList<>(), "CREATED", LocalDateTime.now(), user);
        order = orderRepository.save(order);
        for (OrderItem item : items) {
            item.setOrder(order);
            orderItemRepository.save(item);
        }
        order.setItems(items);
        return orderRepository.save(order);
    }

    @Transactional
    public Order cancelOrder(UUID orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        if ("CANCELLED".equals(order.getStatus())) {
            throw new RuntimeException("Order already cancelled");
        }
        order.setStatus("CANCELLED");
        return orderRepository.save(order);
    }

    public List<OrderSummaryDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAllOrdersOrderByCreatedAtDesc();
        return orders.stream()
                .map(OrderSummaryDTO::new)
                .collect(Collectors.toList());
    }

    public List<OrderSummaryDTO> getOrdersByUsername(String username) {
        List<Order> orders = orderRepository.findOrdersByUsernameOrderByCreatedAtDesc(username);
        return orders.stream()
                .map(OrderSummaryDTO::new)
                .collect(Collectors.toList());
    }
} 