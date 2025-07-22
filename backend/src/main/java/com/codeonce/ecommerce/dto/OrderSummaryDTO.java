package com.codeonce.ecommerce.dto;

import com.codeonce.ecommerce.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryDTO {
    private UUID id;
    private String status;
    private LocalDateTime createdAt;

    public OrderSummaryDTO(Order order) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
    }
}
