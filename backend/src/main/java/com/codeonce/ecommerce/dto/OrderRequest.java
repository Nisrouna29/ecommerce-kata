package com.codeonce.ecommerce.dto;

import lombok.Data;
import java.util.Map;
import java.util.UUID;

@Data
public class OrderRequest {
    private Map<UUID, Integer> productQuantities;
    private String username;
} 