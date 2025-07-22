package com.codeonce.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private UUID id;
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String image;
    private double rate;
    private int ratingcount;
} 