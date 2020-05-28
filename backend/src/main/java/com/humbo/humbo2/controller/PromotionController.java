package com.humbo.humbo2.controller;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.domain.Notification;
import com.humbo.humbo2.domain.Promotion;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.repository.NotificationRepository;
import com.humbo.humbo2.repository.PromotionRepository;
import com.humbo.humbo2.storage.StorageService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    private StorageService storageService;
    private PromotionRepository promotionRepository;
    private CategoryRepository categoryRepository;
    private NotificationRepository notificationRepository;
    private CustomUserRepository customUserRepository;

    PromotionController(PromotionRepository promotionRepository, CategoryRepository categoryRepository,
            NotificationRepository notificationRepository, CustomUserRepository customUserRepository,
            StorageService storageService) {
        this.promotionRepository = promotionRepository;
        this.categoryRepository = categoryRepository;
        this.notificationRepository = notificationRepository;
        this.customUserRepository = customUserRepository;
        this.storageService = storageService;
    }

    @GetMapping("")
    public Page<Promotion> getPromotion(Pageable pageable) {
        return promotionRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Promotion getPromotion(@PathVariable Long id) {
        return promotionRepository.findById(id).get();
    }

    @PostMapping("")
    public ResponseEntity<?> createPromotion(@RequestParam(value = "file") MultipartFile file,
            @RequestParam String promotionSlogan, @RequestParam Float discount, @RequestParam String category) {
        Category temp = categoryRepository.findByName(category);
        Promotion promotion = new Promotion(discount, file.getOriginalFilename(), promotionSlogan, temp, category);
        this.promotionRepository.save(promotion);

        Notification notification = new Notification();
        notification.setMessage("Promotion :\t"+promotionSlogan);
        notification.setCreateDate(Date.from(Instant.now()));

        Set<CustomUser> userList = new HashSet<>();
        this.customUserRepository.findByRoles(new String[] { "CUSTOMER" }).forEach(userList::add);
        notification.setTo(userList);

        this.customUserRepository.updateNewNotification(userList);
        this.notificationRepository.save(notification);
        
        return ResponseEntity.ok().body(promotion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editPromotion(@PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam String promotionSlogan,
            @RequestParam Float discount, @RequestParam String category) {
        Category category_obj = this.categoryRepository.findByName(category);
        Promotion promotion = this.promotionRepository.findById(id).get();
        promotion.setCategory(category_obj);
        promotion.setCategory_slug(category);
        promotion.setDiscount(discount);
        promotion.setPromotionSlogan(promotionSlogan);
        if (file != null && !file.isEmpty()) {
            promotion.setPicture(file.getOriginalFilename());
            this.storageService.store(file);
        }
        promotionRepository.save(promotion);

        Notification notification = new Notification();
        notification.setMessage("Promotion :\t"+promotionSlogan);
        notification.setCreateDate(Date.from(Instant.now()));

        Set<CustomUser> userList = new HashSet<>();
        this.customUserRepository.findByRoles(new String[] { "CUSTOMER" }).forEach(userList::add);
        notification.setTo(userList);

        this.customUserRepository.updateNewNotification(userList);
        this.notificationRepository.save(notification);

        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotionWithId(@PathVariable Long id) {
        this.promotionRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deletePromotion(@RequestParam String[] ids) {
        for (String id : ids) {
            this.promotionRepository.delete(this.promotionRepository.findById(Long.parseLong(id)).get());
        }
        return ResponseEntity.ok().build();
    }

}
