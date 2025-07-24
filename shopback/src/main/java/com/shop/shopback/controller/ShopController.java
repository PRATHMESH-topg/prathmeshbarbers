package com.shop.shopback.controller;



import com.shop.shopback.model.Shop;
import com.shop.shopback.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "*")  // Allow frontend calls
public class ShopController {

    @Autowired
    private ShopService service;

    @PostMapping
    public Shop registerShop(@RequestBody Shop shop) {
        return service.createShop(shop);
    }

    @GetMapping
    public List<Shop> getAllShops() {
        return service.getAllShops();
    }

    @GetMapping("/{id}")
    public Shop getShop(@PathVariable Long id) {
        return service.getShopById(id);
    }

    @PutMapping("/{id}")
    public Shop updateShop(@PathVariable Long id, @RequestBody Shop shop) {
        return service.updateShop(id, shop);
    }

   @DeleteMapping("/{id}")
public ResponseEntity<String> deleteShop(@PathVariable Long id) {
    boolean deleted = service.deleteShop(id);
    if (deleted) {
        return ResponseEntity.ok("Deleted");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Shop not found");
    }
}

}
