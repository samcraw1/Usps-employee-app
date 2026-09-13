package com.usps.schedule.controller;

import com.usps.schedule.model.Employee;
import com.usps.schedule.model.Schedule;
import com.usps.schedule.model.ShiftStatus;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import com.usps.schedule.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.Comparator;
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

    /**
     * Coverage roster for one day, flattened for the supervisor dashboard.
     * Defaults to today when no date is given.
     */
    @GetMapping("/roster")
    public List<RosterRow> getRoster(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        LocalDate day = (date != null) ? date : LocalDate.now();

        return scheduleRepository.findRosterByDate(day).stream()
                .map(ScheduleController::toRow)
                .sorted(Comparator.comparing(RosterRow::route))
                .toList();
    }

    private static RosterRow toRow(Schedule schedule) {
        Employee employee = schedule.getEmployee();

        return new RosterRow(
                schedule.getRoute(),
                (employee != null) ? employee.getName() : "",
                schedule.getBT(),
                statusOf(schedule));
    }

    /**
     * Rows written before `status` existed have it null, so fall back to the
     * NS flag rather than serializing a null the dashboard can't style.
     */
    private static ShiftStatus statusOf(Schedule schedule) {
        if (schedule.getStatus() != null) {
            return schedule.getStatus();
        }
        return schedule.isNS() ? ShiftStatus.NS : ShiftStatus.ON_DUTY;
    }
}
