package com.humbo.humbo2.controller;

import java.util.Optional;

import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private SellerRepository sellerRepository;
    private CustomerRepository customerRepository;

    public UserController(SellerRepository sellerRepository, CustomerRepository customerRepository) {
        this.sellerRepository = sellerRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/api/userinfo")
    public ResponseEntity<?> returnUser() {
        System.out.println("------------------------------------"
                + SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        Optional<Seller> seller = sellerRepository.findByEmail(username);
        if (seller.isPresent()) {
            return ResponseEntity.ok().body(seller);
        }
        return ResponseEntity.ok().body(customerRepository.findByEmail(username));
    }
}