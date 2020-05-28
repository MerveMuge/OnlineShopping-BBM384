package com.humbo.humbo2.controller;

import java.util.HashMap;
import java.util.Optional;

import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.domain.Customer;

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
@RequestMapping("/api/c")
public class CustomerController{

    private CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @GetMapping("")
    public ResponseEntity<Customer> getCustomer(){
        Optional<Customer> customer = this.customerRepository.findById(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        return customer.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/password")
    public ResponseEntity<?> updateCustomerPassword(@RequestParam String password){
        HashMap<String, String> response = new HashMap<>();
        Optional<Customer> customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if(customer.isPresent()){ 
            customer.get().setPassword(password);
            response.put("message", "Password is updated successfully!");
            this.customerRepository.save(customer.get());
        }else{
            response.put("message", "Password is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/phone")
    public ResponseEntity<?> updateCustomerPhone(@RequestParam String phone){
        HashMap<String, String> response = new HashMap<>();
        Optional<Customer> customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if(customer.isPresent()){ 
            customer.get().setPhone(phone);
            response.put("message", "Phone is updated successfully!");
            this.customerRepository.save(customer.get());
        }else{
            response.put("message", "Phone is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/birthdate")
    public ResponseEntity<?> updateCustomerBirthdate(@RequestParam String birthdate){
        HashMap<String, String> response = new HashMap<>();
        Optional<Customer> customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if(customer.isPresent()){ 
            customer.get().setBirthdate(birthdate);
            response.put("message", "Birthdate is updated successfully!");
            this.customerRepository.save(customer.get());
        }else{
            response.put("message", "Birthdate is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/name")
    public ResponseEntity<?> updateCustomerName(@RequestParam String name){
        HashMap<String, String> response = new HashMap<>();
        Optional<Customer> customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        if(customer.isPresent()){ 
            customer.get().setName(name);
            response.put("message", "Name is updated successfully!");
            this.customerRepository.save(customer.get());
        }else{
            response.put("message", "Name is not updated!");
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/all")
    public Page<Customer> getAllCustomer(Pageable pageable){
        return customerRepository.findAll(pageable);
    }
    @GetMapping("/search")
    public Page<Customer> searchCustomer(@RequestParam String searchToken, Pageable pageable){
        return customerRepository.search(searchToken, pageable);
    }

}