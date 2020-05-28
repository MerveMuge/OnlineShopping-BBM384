package com.humbo.humbo2.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.humbo.humbo2.domain.HelpMessage;

public interface HelpMessageRepository extends JpaRepository<HelpMessage, Long>{
    
    Page<HelpMessage> findAll(Pageable pageable);
}
    
