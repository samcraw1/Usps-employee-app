package com.usps.schedule.controller;

import com.usps.schedule.model.ShiftStatus;

/**
 * One row of the supervisor dashboard's coverage table.
 *
 * A flat DTO rather than the Schedule entity, for two reasons: serializing an
 * entity with a lazy @ManyToOne either throws or drags the whole Employee
 * graph into the response, and record components give lowercase JSON names
 * (route, carrier, bt, status) instead of the entity's all-caps BT/NS.
 *
 * @param carrier the employee's name, or "" when the route is unassigned
 */
public record RosterRow(
        String route,
        String carrier,
        String bt,
        ShiftStatus status) {
}
