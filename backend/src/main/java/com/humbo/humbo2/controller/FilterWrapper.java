package com.humbo.humbo2.controller;

import java.util.Set;

import lombok.Data;

@Data
public class FilterWrapper {
    private Double minPrice;
    private Double maxPrice;
    private Set<String> colors;
    private Set<String> sellers;
    private Set<String> brands;
    private Double minRate;

    public FilterWrapper(){}

    public FilterWrapper(Double minPrice, Double maxPrice, Set<String> colors, Set<String> sellers, Set<String> brands, Double minRate){
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.colors = colors;
        this.sellers = sellers;
        this.brands = brands;
        this.minRate = minRate;
    }
}