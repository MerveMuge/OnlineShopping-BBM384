package com.humbo.humbo2.controller;

import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.domain.ProductOrder;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.ProductOrderRepository;
import com.humbo.humbo2.repository.ProductRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController{
    private SellerRepository sellerRepository;
    private CustomerRepository customerRepository;
    private ProductRepository productRepository;
    private ProductOrderRepository orderRepository;
    private CategoryRepository categoryRepository;

    @GetMapping("/orders")
    public Page<ProductOrder> getOrders(Pageable pageable){
        return this.orderRepository.findByIsPaid(true, pageable);
    }

    @PostMapping("/orders/approve") 
    public ResponseEntity<?> approveOrder(@RequestParam Long orderId, @RequestParam Boolean approve){
        ProductOrder order = this.orderRepository.findById(orderId).get();
        order.setIsApproved(approve);
        this.orderRepository.save(order);

        Seller seller = order.getSeller();
        Product product = order.getProduct();
        // Payment API (HUMBO to Seller)
        seller.setBalance(seller.getBalance() + ((product.getPrice() * ( 1 - product.getDiscount()/100)) * order.getQuantity()));
        product.setStock(product.getStock() - order.getQuantity());

        this.productRepository.save(product);
        this.sellerRepository.save(seller);

        return ResponseEntity.ok().body("Approve of "+orderId+" is change to "+approve);
    }

}