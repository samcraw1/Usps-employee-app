package com.usps.schedule.config;

import com.usps.schedule.model.Employee;
import com.usps.schedule.model.Schedule;
import com.usps.schedule.model.ShiftStatus;
import com.usps.schedule.repository.EmployeeRepository;
import com.usps.schedule.repository.ScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Seeds a station's worth of carriers and today's shifts on startup, so a
 * fresh database isn't an empty dashboard.
 *
 * Does nothing once employees exist, which makes restarts safe. Delete the
 * rows in MySQL if you want it to run again.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final ScheduleRepository scheduleRepository;

    public DataSeeder(EmployeeRepository employeeRepository,
                      ScheduleRepository scheduleRepository) {
        this.employeeRepository = employeeRepository;
        this.scheduleRepository = scheduleRepository;
    }

    /** One seed row: carrier name, route, begin tour, status. */
    private record Seed(String name, String route, String bt, ShiftStatus status) {
    }

    // Deliberately covers every status — without a called-out, late, and
    // uncovered row the dashboard's alert styling never gets exercised.
    private static final List<Seed> SEEDS = List.of(
            // Sam first, so this employee gets id 1 — the mobile profile
            // screen hardcodes GET /api/employees/1.
            new Seed("Sam Crawford", "03", "08:00", ShiftStatus.ON_DUTY),
            new Seed(null, "12", null, ShiftStatus.UNCOVERED),
            new Seed("M. Ortiz", "08", "08:00", ShiftStatus.CALLED_OUT),
            new Seed("R. Blake", "14", "08:00", ShiftStatus.LATE),
            new Seed("J. Reyes", "05", "08:00", ShiftStatus.ON_DUTY),
            new Seed("T. Nguyen", "07", "09:30", ShiftStatus.ON_DUTY),
            new Seed("L. Okafor", "09", "09:30", ShiftStatus.ON_DUTY),
            new Seed("C. Silva", "11", "10:00", ShiftStatus.ON_DUTY),
            new Seed("B. Hoang", "15", "10:00", ShiftStatus.ON_DUTY),
            new Seed("A. Patel", "02", null, ShiftStatus.NS),
            new Seed("D. Kim", "04", null, ShiftStatus.NS),
            new Seed("P. Moreau", "06", null, ShiftStatus.NS));

    @Override
    public void run(String... args) {
        if (employeeRepository.count() > 0) {
            return;
        }

        LocalDate today = LocalDate.now();

        for (Seed seed : SEEDS) {
            Employee employee = null;

            // An uncovered route has no carrier, so no employee row either.
            if (seed.name() != null) {
                employee = employeeRepository.save(new Employee(seed.name()));
            }

            Schedule schedule = new Schedule();
            schedule.setDate(today);
            schedule.setRoute(seed.route());
            schedule.setBT(seed.bt());
            schedule.setNS(seed.status() == ShiftStatus.NS);
            schedule.setStatus(seed.status());
            schedule.setEmployee(employee);

            scheduleRepository.save(schedule);
        }

        System.out.println("Seeded " + SEEDS.size() + " shifts for " + today);
    }
}
