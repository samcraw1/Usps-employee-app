package com.usps.schedule.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String BT;
    private boolean NS;
    private LocalDate date;

    public Schedule() {
    }

    public Schedule(String BT, boolean NS, LocalDate date) {
        this.BT = BT;
        this.NS = NS;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getBT() {
        return BT;
    }

    public void setBT(String BT) {
        this.BT = BT;
    }

    public boolean isNS() {
        return NS;
    }

    public void setNS(boolean NS) {
        this.NS = NS;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}