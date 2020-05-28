package com.humbo.humbo2.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.humbo.humbo2.domain.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Long>{
    
    Page<Promotion> findAll(Pageable pageable);
}
    
