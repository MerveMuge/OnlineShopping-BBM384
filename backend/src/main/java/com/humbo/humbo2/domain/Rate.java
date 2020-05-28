package com.humbo.humbo2.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
public class Rate{

    public Rate(){};

    public Rate(Customer customer, Seller seller, Double rating) {
        this.customer = customer;
        this.seller = seller;
        this.rate = rating;
	}

	@Id @GeneratedValue private Long id;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @NotNull
    private Customer customer;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @NotNull
    private Seller seller;

    @NotNull
    private Double rate;
}