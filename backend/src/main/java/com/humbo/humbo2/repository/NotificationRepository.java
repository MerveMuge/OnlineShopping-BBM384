package com.humbo.humbo2.repository;

import com.humbo.humbo2.domain.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

}