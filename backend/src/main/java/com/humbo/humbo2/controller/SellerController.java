package com.humbo.humbo2.controller;

import java.util.HashMap;
import java.util.Optional;

import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/s")
public class SellerController {

    private SellerRepository sellerRepository;
    private CustomUserRepository customUserRepository;

    public SellerController(SellerRepository sellerRepository, CustomUserRepository customRepository) {
        this.sellerRepository = sellerRepository;
        this.customUserRepository = customRepository;
    }

    @GetMapping("")
    public ResponseEntity<Seller> getSeller() {
        Optional<Seller> seller = this.sellerRepository.findById(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        return seller.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/balance")
    public ResponseEntity<?> getMoney(){
        Seller seller = this.sellerRepository.findById(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        Double balance = seller.getBalance();
        seller.setBalance(0.0);
        this.sellerRepository.save(seller);
        return ResponseEntity.ok().body(String.format("%f sent to your iban: %s", balance, seller.getIban()));
    }

    @PutMapping("/password")
    public ResponseEntity<?> updateSellerPassword(@RequestParam String password) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            seller.get().setPassword(password);
            response.put("message", "Password is updated successfully!");
            this.sellerRepository.save(seller.get());
        } else {
            response.put("message", "Password is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/companyname")
    public ResponseEntity<?> updateSellerCompanyName(@RequestParam String companyName) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            seller.get().setCompanyName(companyName);
            response.put("message", "Company name is updated successfully!");
            this.sellerRepository.save(seller.get());
        } else {
            response.put("message", "Company name is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/iban")
    public ResponseEntity<?> updateSellerIban(@RequestParam String iban) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            seller.get().setIban(iban);
            response.put("message", "IBAN is updated successfully!");
            this.sellerRepository.save(seller.get());
        } else {
            response.put("message", "IBAN is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/phone")
    public ResponseEntity<?> updateSellerPhone(@RequestParam String phone) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            seller.get().setPhone(phone);
            response.put("message", "Phone is updated successfully!");
            this.sellerRepository.save(seller.get());
        } else {
            response.put("message", "Phone is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/birthdate")
    public ResponseEntity<?> updateSellerBirthdate(@RequestParam String birthdate) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            seller.get().setBirthdate(birthdate);
            response.put("message", "Birthdate is updated successfully!");
            this.sellerRepository.save(seller.get());
        } else {
            response.put("message", "Birthdate is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/name")
    public ResponseEntity<?> updateSellerName(@RequestParam String name) {
        HashMap<String, String> response = new HashMap<>();
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if (seller.isPresent()) {
            Seller seller1 = seller.get();
            seller1.setName(name);
            System.out.println(seller1.getName());
            System.out.println(seller.get());
            response.put("message", "Name is updated successfully!");
            this.sellerRepository.save(seller1);
            this.customUserRepository.save(seller1);
        } else {
            response.put("message", "Name is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/all")
    public Page<Seller> getAllSeller(Pageable pageable){
        return sellerRepository.findAll(pageable);
    }

    @GetMapping("/search")
    public Page<Seller> searchSeller(@RequestParam String searchToken, Pageable pageable){
        return sellerRepository.search(searchToken, pageable);
    }
}