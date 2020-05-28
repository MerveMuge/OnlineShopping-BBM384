package com.humbo.humbo2.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(exclude = "to")
@JsonIgnoreProperties(value = "to")
@NoArgsConstructor
@AllArgsConstructor
public class Notification{
    @Id @GeneratedValue private Long id;
    private String message;
    
    @ManyToMany(cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private Set<CustomUser> to;

    private Date createDate; 

}