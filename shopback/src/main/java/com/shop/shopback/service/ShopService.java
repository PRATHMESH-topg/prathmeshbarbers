package com.shop.shopback.service;



import com.shop.shopback.model.Shop;

import java.util.List;

public interface ShopService {
    Shop createShop(Shop shop);
    List<Shop> getAllShops();
    Shop getShopById(Long id);
    Shop updateShop(Long id, Shop updatedShop);
    boolean deleteShop(Long id);
}
