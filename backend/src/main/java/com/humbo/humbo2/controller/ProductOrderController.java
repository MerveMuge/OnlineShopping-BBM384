package com.humbo.humbo2.controller;

import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.ProductOrder;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.ProductOrderRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/order")
public class ProductOrderController{
    private ProductOrderRepository orderRepository;
    private SellerRepository sellerRepository;
    private CustomerRepository customerRepository;

    public ProductOrderController(ProductOrderRepository orderRepository, SellerRepository sellerRepository, CustomerRepository customerRepository){
        this.orderRepository = orderRepository;
        this.sellerRepository = sellerRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/seller")
    public Page<ProductOrder> getOrderofSeller(Pageable pageable){
        Seller seller = this.sellerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        Page<ProductOrder> orders = this.orderRepository.findSellerOrders(seller, pageable);
        return orders;
    }

    @PutMapping("/seller")
    public ResponseEntity<ProductOrder> setOrderStatus(@RequestParam Long orderId, @RequestParam String status){
        ProductOrder order = this.orderRepository.findById(orderId).get();
        order.setStatus(status);
        this.orderRepository.save(order);
        return ResponseEntity.ok().body(order);
    }

    @GetMapping("/customer")
    public Page<ProductOrder> getOrderofCustomer(Pageable pageable){
        Customer customer = this.customerRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        Page<ProductOrder> orders = this.orderRepository.findCustomerOrders(customer, pageable);
        return orders;
    }
}