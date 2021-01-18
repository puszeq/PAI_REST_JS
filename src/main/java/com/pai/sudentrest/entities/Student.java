package com.pai.sudentrest.entities;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonView
    private String name;
    @JsonView
    private String surname;
    @JsonView
    private double average;

}
