package com.shop.shopback.service;


import com.shop.shopback.model.Shop;
import com.shop.shopback.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository repository;

    @Override
    public Shop createShop(Shop shop) {
        return repository.save(shop);
    }

    @Override
    public List<Shop> getAllShops() {
        return repository.findAll();
    }

    @Override
    public Shop getShopById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Shop updateShop(Long id, Shop updatedShop) {
        Shop existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setShopName(updatedShop.getShopName());
            existing.setServices(updatedShop.getServices());
            return repository.save(existing);
        }
        return null;
    }

    @Override
    public boolean deleteShop(Long id) {
        repository.deleteById(id);
        return false;
    }
}
