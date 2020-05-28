package com.humbo.humbo2.controller;

import java.util.Optional;

import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.Rate;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.RateRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rate")
public class RateController {
    private SellerRepository sellerRepository;
    private CustomerRepository customerRepository;
    private RateRepository rateRepository;

    RateController(SellerRepository sellerRepository, CustomerRepository customerRepository,
            RateRepository rateRepository) {
        this.sellerRepository = sellerRepository;
        this.customerRepository = customerRepository;
        this.rateRepository = rateRepository;
    }

    @PostMapping("/{seller_email}")
    public ResponseEntity<?> rateSeller(@PathVariable String seller_email, @RequestParam Double rating){
        Customer customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        Seller seller = this.sellerRepository.findByEmail(seller_email).get();
        
        Optional<Rate> rate = this.rateRepository.findByCustomerAndSeller(customer, seller);
        
        if(rate.isPresent()){
            Rate temp = rate.get();
            temp.setRate(rating);
            this.rateRepository.save(temp);
        }else{
            Rate temp = new Rate(customer, seller, rating);
            this.rateRepository.save(temp);
        }

        seller.setAvg_rating(this.rateRepository.findAvgOfRateBySeller(seller));
        this.sellerRepository.save(seller);

        return ResponseEntity.ok().body("Rated");
    } 

    @GetMapping("/{seller_email}")
    public ResponseEntity<Double> getRate(@PathVariable String seller_email){
        Customer customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        Seller seller = this.sellerRepository.findByEmail(seller_email).get();
        
        Optional<Rate> rate = this.rateRepository.findByCustomerAndSeller(customer, seller);
        
        if(rate.isPresent()){
            return ResponseEntity.ok().body(rate.get().getRate());
        }else{
            return ResponseEntity.ok().body(0.0);
        }
    }
}