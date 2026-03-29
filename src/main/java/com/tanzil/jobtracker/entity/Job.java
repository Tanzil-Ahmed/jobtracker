package com.tanzil.jobtracker.entity;

import jakarta.persistence.*;
import com.tanzil.jobtracker.enums.Status;

// This annotation tells Spring boot: this class = database table
@Entity

// Optional: specify table name
@Table(name = "jobs")
public class Job {

    // Primary key (UD column)
    @Id

    // Auto increment ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    //Company name column
    private String company;

    //job role
    private String role;

    @Enumerated(EnumType.STRING)
    //Application status
    private Status status;

    // constructor
    public Job(){}

    // parameterized constructor
    public Job(String company, String role, Status status){
        this.company = company;
        this.role = role;
        this.status = status;
    }

    //getters & setters

    public Long getId(){
        return id;
    }

    public String getCompany(){
        return company;
    }
    public void setCompany(String company){
        this.company = company;
    }

    public String getRole(){
        return role;
    }
    public void setRole(String role){
        this.role = role;
    }

    public Status getStatus(){
        return status;
    }
    public void setStatus(Status status){
        this.status = status;
    }
}
