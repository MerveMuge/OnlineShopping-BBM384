package com.humbo.humbo2.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"orders", "customer"})
public class Basket{

    @Id @GeneratedValue @JsonIgnore
    private Long id;

    @OneToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
    @JsonIgnore
    private Customer customer;

    @OneToMany(targetEntity = ProductOrder.class, cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER, mappedBy = "basket")
    private Set<ProductOrder> orders;

    private Boolean active;

	public Basket(Customer customer) {
        this.customer = customer;
        orders = new HashSet<>();
        active = true;
	}
}