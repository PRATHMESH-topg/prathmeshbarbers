package com.shop.shopback.controller;




import com.shop.shopback.model.Deal;
import com.shop.shopback.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = "*")
public class DealController {

    @Autowired
    private DealRepository dealRepository;

    // Save a deal
    @PostMapping("/confirm")
    public Deal confirmDeal(@RequestBody Deal deal) {
        return dealRepository.save(deal);
    }

    // Get all deals
    @GetMapping("/all")
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Get deals by shop
    @GetMapping("/shop/{shopName}")
    public List<Deal> getDealsByShop(@PathVariable String shopName) {
        return dealRepository.findByShopName(shopName);
    }

     @DeleteMapping("/delete-all")
    public String deleteAllDeals() {
        dealRepository.deleteAll();
        return "✅ All deals deleted successfully.";
    }
}
