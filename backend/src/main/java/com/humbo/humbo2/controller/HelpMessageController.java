package com.humbo.humbo2.controller;

import javax.validation.Valid;

import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.domain.HelpMessage;
import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.repository.HelpMessageRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/help")
public class HelpMessageController {
private HelpMessageRepository helpMessageRepository;
private CustomUserRepository customUserRepository;

HelpMessageController(HelpMessageRepository helpMessageRepository, CustomUserRepository customUserRepository){
    this.helpMessageRepository = helpMessageRepository;
    this.customUserRepository = customUserRepository;
}

@GetMapping("")
public Page<HelpMessage> getHelpMessages(Pageable pageable) {
    return helpMessageRepository.findAll(pageable);
}

@PostMapping("/create")
public ResponseEntity<?> postHelpMessage(@Valid@RequestBody HelpMessage message){
    CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
    message.setUser(user);
    return ResponseEntity.ok().body(helpMessageRepository.save(message));
}

}
