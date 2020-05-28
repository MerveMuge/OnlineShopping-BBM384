package com.humbo.humbo2.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.humbo.humbo2.domain.Address;
import com.humbo.humbo2.domain.CustomUser;

public interface AddressRepository extends JpaRepository<Address, Long>{
    Page<Address> findAllByUser(CustomUser user, Pageable pageable);
}