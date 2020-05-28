package com.humbo.humbo2.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Customer extends CustomUser implements Serializable{

    private static final long serialVersionUID = 1L;

    @OneToMany(targetEntity = ProductOrder.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER, mappedBy = "seller")
    @JsonIgnore
    private Set<ProductOrder> orders;

    @OneToOne(targetEntity = Basket.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER, mappedBy = "customer")
    @JsonIgnore
    private Basket basket;

    public Customer(){
        super();
    }

    public Customer(String email, String password, String name, String phone, String birthdate, String... roles){
        super(email, password, name, phone, birthdate, roles);
    }
}