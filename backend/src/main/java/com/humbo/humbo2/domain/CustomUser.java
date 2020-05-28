package com.humbo.humbo2.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(exclude = "address")
public class CustomUser implements Serializable{
    
    private static final long serialVersionUID = 1L;

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String name;

    @JsonIgnore
    private String[] roles;

    private String phone;

    private String birthdate;

    @OneToMany(targetEntity = Address.class, cascade={CascadeType.REFRESH, CascadeType.DETACH, CascadeType.REMOVE}, fetch=FetchType.EAGER, mappedBy="user")
    @JsonIgnore
    private Set<Address> address;

    @ManyToMany(targetEntity = Notification.class, cascade={CascadeType.REFRESH, CascadeType.DETACH, CascadeType.REMOVE}, fetch=FetchType.LAZY, mappedBy="to")
    private Set<Notification> notifications;

    private Boolean newNotification;

    public void setPassword(String password){
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public CustomUser(String email, String password, String name, String phone, String birthdate, String ...roles){
        this.email = email;
        setPassword(password);
        this.name = name;
        this.phone = phone;
        this.birthdate = birthdate;
        this.roles = roles;
        this.newNotification = false;
    }
}