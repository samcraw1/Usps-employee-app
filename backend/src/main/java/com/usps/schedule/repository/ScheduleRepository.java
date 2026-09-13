package com.usps.schedule.repository;

import com.usps.schedule.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    /**
     * The roster for one day, with the employee loaded in the same query.
     *
     * A plain derived query would leave `employee` lazy and fire one extra
     * SELECT per row when the controller reads the name. LEFT join, not inner,
     * because an uncovered route has no employee and must still appear.
     */
    @Query("select s from Schedule s left join fetch s.employee where s.date = :date")
    List<Schedule> findRosterByDate(@Param("date") LocalDate date);
}
