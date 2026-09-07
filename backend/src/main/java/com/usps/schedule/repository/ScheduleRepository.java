package com.usps.schedule.repository;

import com.usps.schedule.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository

        extends JpaRepository <Schedule, Long >{
    }

