package com.usps.schedule.controller;

import com.usps.schedule.model.Schedule;
import org.springframework.web.bind.annotation.*;
import com.usps.schedule.repository.ScheduleRepository;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")


public class ScheduleController {

    private final ScheduleRepository scheduleRepository;

    public ScheduleController(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @GetMapping
    public List<Schedule> getSchedules() {
        return scheduleRepository.findAll();
    }

    @PostMapping
    public Schedule addSchedule(@RequestBody Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}
