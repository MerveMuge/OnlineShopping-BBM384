package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.Customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, String>{
    Optional<Customer> findByEmail(String email);

    @Query(
        value = "SELECT DISTINCT customer.email, custom_user.birthdate, custom_user.name, custom_user.phone, custom_user.password, custom_user.roles FROM customer, custom_user WHERE customer.email = custom_user.email and customer.email ILIKE %:searchToken%" ,
        countQuery = "SELECT count(*) FROM customer, custom_user WHERE customer.email = custom_user.email and customer.email ILIKE %:searchToken%", 
        nativeQuery = true
    )

    Page<Customer> search(@Param("searchToken") String searchToken, Pageable pageable) ;
}