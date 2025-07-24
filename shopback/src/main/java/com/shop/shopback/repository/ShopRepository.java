package com.shop.shopback.repository;



import com.shop.shopback.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {}
