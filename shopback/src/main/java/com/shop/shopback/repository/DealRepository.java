package com.shop.shopback.repository;


import com.shop.shopback.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByShopName(String shopName);
}
