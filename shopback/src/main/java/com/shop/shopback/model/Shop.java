package com.shop.shopback.model;



import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ShopName;

    private String Description;

    @ElementCollection
    private List<String> Services;

    
}

