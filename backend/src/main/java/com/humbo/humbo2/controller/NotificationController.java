package com.humbo.humbo2.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.domain.Notification;
import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.repository.NotificationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class NotificationController {

    private NotificationRepository notificationRepository;
    private CustomUserRepository customUserRepository;

    public NotificationController(NotificationRepository notificationRepository,
            CustomUserRepository customUserRepository) {
        this.notificationRepository = notificationRepository;
        this.customUserRepository = customUserRepository;
    }

    @GetMapping("/notifications")
    List<Notification> getNotifications() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        CustomUser user = this.customUserRepository.findByEmail(username).get();
        List<Notification> temp = new ArrayList<Notification>(user.getNotifications());
        temp.sort((p1, p2) -> {
            return p1.getCreateDate().compareTo(p2.getCreateDate());
        });
        user.setNewNotification(false);
        this.customUserRepository.save(user);
        return temp;
    }

    @PostMapping("/notification")
    ResponseEntity<?> createNotification(String message, String to) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setCreateDate(Date.from(Instant.now()));
        Set<CustomUser> userList = new HashSet<>();
        switch (to) {
        case "all":
            this.customUserRepository.findAll().forEach(userList::add);
            break;
        case "seller":
            this.customUserRepository.findByRoles(new String[] { "SELLER" }).forEach(userList::add);
            break;
        case "customer":
            this.customUserRepository.findByRoles(new String[] { "CUSTOMER" }).forEach(userList::add);
            break;
        }
        System.out.println("-----------------------------------------"+userList+"-----------------------------");
        notification.setTo(userList);
        this.customUserRepository.updateNewNotification(userList);

        this.notificationRepository.save(notification);

        return ResponseEntity.ok().body(notification);
    }

}