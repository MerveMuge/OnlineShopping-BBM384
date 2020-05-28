package com.humbo.humbo2.domain;

import java.time.Instant;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"customer", "basket", "seller", "product"})
public class ProductOrder{
    @Id 
    @GeneratedValue
    private Long id;

    private String status;
    
    @ManyToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    private Customer customer;
    
    @OneToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    private Product product;

    @ManyToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    @JsonIgnore
    private Basket basket;

    @ManyToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    @JsonIgnore
    private Address address;
    
    private Integer quantity;
    
    @ManyToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    private Seller seller;
    
    private Date date;
    private Boolean isApproved;
    private Boolean isPaid;
    
    public ProductOrder(Customer user, Product product, Seller seller, Integer quantity, Address address) {
        this.customer = user;
        this.seller = seller;
        this.product = product;
        this.quantity = quantity;
        this.status = null;
        this.isApproved = false;
        this.isPaid = false;
        this.date = Date.from(Instant.now());
        this.address = address;
    }
    
}