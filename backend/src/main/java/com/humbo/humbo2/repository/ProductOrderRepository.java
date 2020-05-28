package com.humbo.humbo2.repository;

import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.ProductOrder;
import com.humbo.humbo2.domain.Seller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {

  @Query(value = "SELECT * FROM product_order WHERE seller_email=:seller and is_paid='t' and is_approved='t'", 
        countQuery = "SELECT count(*) FROM product_order WHERE seller_email=:seller and is_paid='t' and is_approved='t'", 
        nativeQuery = true)
  Page<ProductOrder> findSellerOrders(Seller seller, Pageable pageable);

  @Query(value = "SELECT * FROM product_order WHERE customer_email=:customer and is_paid='t' and is_approved='t'", 
        countQuery = "SELECT count(*) FROM product_order WHERE customer_email=:customer and is_paid='t' and is_approved='t'", 
        nativeQuery = true)
  Page<ProductOrder> findCustomerOrders(Customer customer, Pageable pageable);

Page<ProductOrder> findByIsPaid(boolean b, Pageable pageable);

  // Page<ProductOrder> findAll(Pageable pageable);
}