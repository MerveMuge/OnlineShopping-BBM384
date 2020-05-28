package com.humbo.humbo2.controller;

import com.humbo.humbo2.domain.Product;

import lombok.Data;

@Data
public class ProductResponseWrapper{
    Product product;
    Iterable<Product> like;
    
    public ProductResponseWrapper(Product product, Iterable<Product> like){
        this.product = product;
        this.like = like;
    }
}