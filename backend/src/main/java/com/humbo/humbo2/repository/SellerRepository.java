package com.humbo.humbo2.repository;

import com.humbo.humbo2.domain.Seller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SellerRepository extends JpaRepository<Seller, String>{
    Optional<Seller> findByEmail(String email);

    @Query(
        value = "SELECT DISTINCT seller.email, seller.avg_rating, seller.balance, seller.company_name, seller.iban, custom_user.birthdate, custom_user.name, custom_user.phone, custom_user.password, custom_user.roles FROM seller, custom_user WHERE seller.email = custom_user.email and seller.email ILIKE %:searchToken%" ,
        countQuery = "SELECT count(*) FROM seller, custom_user WHERE seller.email = custom_user.email and seller.email ILIKE %:searchToken%", 
        nativeQuery = true
    )

    Page<Seller> search(@Param("searchToken") String searchToken, Pageable pageable) ;

}