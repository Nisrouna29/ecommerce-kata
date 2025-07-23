package com.codeonce.ecommerce.repository;

import com.codeonce.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    // find by username
    @Query("SELECT o FROM Order o WHERE o.user.username = :username ORDER BY o.createdAt DESC")
    List<Order> findOrdersByUsernameOrderByCreatedAtDesc(@Param("username") String username);
}