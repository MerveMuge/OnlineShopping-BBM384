package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.Rate;
import com.humbo.humbo2.domain.Seller;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RateRepository extends CrudRepository<Rate, Long>{
    @Query(value= "SELECT AVG(rate) FROM rate WHERE seller_email = :seller", nativeQuery = true)
    Double findAvgOfRateBySeller(Seller seller);

	Optional<Rate> findByCustomerAndSeller(Customer customer, Seller seller);
}