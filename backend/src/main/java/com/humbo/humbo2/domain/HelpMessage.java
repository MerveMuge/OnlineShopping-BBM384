package com.humbo.humbo2.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HelpMessage{
@Id
@GeneratedValue
private Long id;
private String message;
@ManyToOne(cascade={CascadeType.REFRESH, CascadeType.DETACH}, fetch=FetchType.EAGER)
private CustomUser user;


}