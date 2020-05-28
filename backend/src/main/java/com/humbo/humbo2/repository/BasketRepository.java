package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.Basket;
import com.humbo.humbo2.domain.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<Basket, Long>{

	Optional<Basket> findByCustomer(Customer customer);

	Optional<Basket> findByCustomerAndActive(Customer user, boolean b);

}