package com.usps.schedule.model;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * State of a single shift on a single day.
 *
 * The JSON form is hyphenated lowercase because the dashboard's TypeScript
 * union and its CSS class names (badge-on-duty, badge-called-out, ...) already
 * use exactly those strings — emitting them directly avoids a translation
 * layer on either side. The database still stores the enum name via
 * @Enumerated(EnumType.STRING).
 */
public enum ShiftStatus {

    ON_DUTY("on-duty"),
    LATE("late"),
    CALLED_OUT("called-out"),
    UNCOVERED("uncovered"),
    NS("ns");

    private final String json;

    ShiftStatus(String json) {
        this.json = json;
    }

    @JsonValue
    public String getJson() {
        return json;
    }
}
