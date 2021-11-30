import {
    Scheduler
} from "./helperScheduler.js";

const customScheduler = new Scheduler("init");

const days = 10;
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

let timeline = scheduler.getView("timeline");
if (timeline.scrollable) {

    scheduler.date.hour_start = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
    };
    scheduler.date.minute_start = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    }

    timeline.attachEvent("onScroll", function (left, top) {
        console.log(left);

        let widthCalHeader = Number(getComputedStyle(document.querySelector('.dhx_cal_header')).width.replace('px', ''));
        let scrollElem = document.querySelector('.dhx_timeline_scrollable_data');

        let range = scheduler.getState();
        let nextCenterDate;
        let moveScroll;
        if (left + scrollElem.clientWidth >= widthCalHeader) {
            
            nextCenterDate = scheduler.date.add(range.date, 1, timeline.x_unit);
            moveScroll = 1;
            changeCalData(left, nextCenterDate, moveScroll);
        }
        if (left == 0) {
            nextCenterDate = scheduler.date.add(range.date, -1, timeline.x_unit);
            moveScroll = -1;
            changeCalData(left, nextCenterDate, moveScroll);
        }
    });
}

function changeCalData(left, nextDate, moveScroll) {
    setTimeout(function () {
        scheduler.setCurrentView(nextDate);
        timeline.scrollTo(left - moveScroll);
    }, 50);
}