package com.humbo.humbo2.controller;

import javax.validation.Valid;

import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.repository.AddressRepository;
import com.humbo.humbo2.domain.Address;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private CustomUserRepository customUserRepository;
    private AddressRepository addressRepository;

    public AddressController(CustomUserRepository customUserRepository, AddressRepository addressRepository){
        this.customUserRepository = customUserRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping("")
    public Page<Address> getAddress(Pageable pageable){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        return addressRepository.findAllByUser(user, pageable);
    }

    @PostMapping("")
    public ResponseEntity<?> postAddress(@Valid @RequestBody Address address){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        address.setUser(user);
        this.addressRepository.save(address);
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/{id}")
    public Set<Address> postAddress(@PathVariable Long id, @Valid @RequestBody Address address){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        this.addressRepository.save(address);
        return user.getAddress();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> postAddress(@PathVariable Long id){
        this.addressRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAddresses(@RequestParam String[] ids){
        for(String id:ids){
            this.addressRepository.delete(this.addressRepository.findById(Long.parseLong(id)).get());
        }
        return ResponseEntity.ok().build();
    }

}