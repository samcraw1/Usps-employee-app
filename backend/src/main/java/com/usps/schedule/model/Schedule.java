package com.usps.schedule.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String BT;
    private boolean NS;
    private LocalDate date;

    /**
     * Null when a route is scheduled but nobody is assigned to it — that is
     * what UNCOVERED means. Lazy so that loading a schedule does not always
     * drag the employee with it; never serialize this entity directly as a
     * result (see RosterRow).
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    /** Delivery route, e.g. "03". */
    private String route;

    @Enumerated(EnumType.STRING)
    private ShiftStatus status;

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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public ShiftStatus getStatus() {
        return status;
    }

    public void setStatus(ShiftStatus status) {
        this.status = status;
    }
}
