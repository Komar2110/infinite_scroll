import {
    Scheduler
} from "./helperScheduler.js";

const customScheduler = new Scheduler("init");

const days = 3;
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "hour",
    x_date: "%H:%i",
    x_step: 1,
    x_size: 24 * days,
    y_unit: Scheduler.CUSTOM_TABS,
    y_property: "type",
    render: "bar",
    scrollable: true,
    column_width: 100,
    second_scale: {
        x_unit: "day",
        x_date: "%F %d"
    }
});

customScheduler.init();

customScheduler.load("sources/data.json");

var timeline = scheduler.getView("timeline");
if (timeline.scrollable) {
    var ignoreNext = false;

    scheduler.date.hour_start = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
    };
    scheduler.date.minute_start = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    }

    timeline.dateFromPos = function (x) { // TODO: add API method
        return scheduler._timeline_drag_date(timeline, x);
    };

    timeline.attachEvent("onScroll", function (left, top) {
        console.log(left);
        if (ignoreNext) {
            return;
        }
        if (left === 0) {
            return; // don't do anything on initial scroll position
        }
        var range = scheduler.getState();
        var visibleWidth = scheduler.$container.querySelector(".dhx_timeline_scrollable_data").offsetWidth;
        var screenLeftDate = timeline.dateFromPos(left);
        var screenRightDate = timeline.dateFromPos(left + visibleWidth);

        var visiblePortionDuration = screenRightDate - screenLeftDate;
        var loadedTimelineDuration = range.max_date - range.min_date;

        var scrollThreshold = 0.1; // load new portion when gantt is scrolled to 4/5 of visible range to the right or 1/5 to the left
        if (visiblePortionDuration / loadedTimelineDuration >= 1 - scrollThreshold) {
            return; // if the size of the visible portion is to close to the size of the loaded range for this threshold value which could cause infinite loop - disable infinite scroll
        }

        var extendRight = ((range.max_date - screenRightDate) / loadedTimelineDuration < scrollThreshold);
        var extendLeft = ((screenLeftDate - range.min_date) / loadedTimelineDuration < scrollThreshold);

        if (extendRight || extendLeft) {
            var unitsRange = timeline.x_size * timeline.x_step;
            var scrollAmount = Math.max(Math.round((unitsRange * scrollThreshold) / 2), 1);

            var ignoreNext = true;
            var timelineStart = scheduler.date[timeline.name + "_start"];
            var nextCenterDate;
            if (extendRight) {
                var nextCenterDate = scheduler.date.add(range.date, 1, timeline.x_unit);
                // debugger
            } else if (extendLeft) {
                var nextCenterDate = scheduler.date.add(range.date, -1, timeline.x_unit);
            }
            requestAnimationFrame(function () {
                scheduler.setCurrentView(nextCenterDate);
                timeline.scrollTo(screenLeftDate);
                setTimeout(function () {
                    ignoreNext = false;
                });
            })

        }

    });
}