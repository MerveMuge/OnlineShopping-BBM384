package com.humbo.humbo2.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentWrapper {
    private String cardNumber;
    private String nameOnCard;
    private Integer month;
    private Integer year;
    private Integer cvv;
    private Long addressId;
}