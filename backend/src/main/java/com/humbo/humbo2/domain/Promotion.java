package com.humbo.humbo2.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Promotion implements Serializable{

private static final long serialVersionUID = 1L;
@Id
@GeneratedValue
private Long id;
private Float discount;
private String picture; 
private String promotionSlogan;

@JsonBackReference
@NonNull
@OneToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH }, fetch = FetchType.LAZY)
private Category category;
private String category_slug;

public Promotion(Float discount, String picture,String promotionSlogan, Category category ,String category_slug){
    this.discount = discount;
    this.picture = picture;
    this.promotionSlogan = promotionSlogan;
    this.category =category;
    this.category_slug = category_slug;
}

}