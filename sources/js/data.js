import {
    Scheduler
} from "./helperScheduler.js";

const customScheduler = new Scheduler("init");

scheduler.locale.labels.section_custom = "Section";

var sections = [];

for (var i = 1; i < 200; i++) {
    sections.push({
        key: i,
        label: "section " + i
    })
}

const days = 3;
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "hour",
    x_date: "%H:%i",
    x_step: 1,
    x_size: 24 * days,
    y_unit: sections,
    y_property: "section_id",
    render: "bar",
    scrollable: true,
    column_width: 100,
    second_scale: {
        x_unit: "day",
        x_date: "%F %d"
    }
});

let timeline = scheduler.getView("timeline");

timeline.dateFromPos = function (x) { // TODO: add API method
    return scheduler._timeline_drag_date(timeline, x);
};

let startDate = new Date(),
    endDate = scheduler.date.add(startDate, days, 'day');

scheduler.attachEvent("onEventAdded", function (id, ev) {
    scheduler.setCurrentView();

});

scheduler.attachEvent("onViewChange", function (new_mode, new_date) {
    console.log("onViewChange");
    if (new_mode == timeline.name) {
        if (timeline.scrollable) {

            let widthCalHeader = Number(getComputedStyle(document.querySelector('.dhx_cal_header')).width.replace('px', ''));
            let scrollableData = document.querySelector(".dhx_timeline_scrollable_data");
            // scrollableData.style.overflowX = "hidden";

            let customScroll = document.querySelector(".scheduler_custom_scroll");
            customScroll.style.width = scrollableData.offsetWidth + "px";
            customScroll.style.overflowX = "auto";
            let cscroll = `<div style="width: ${widthCalHeader}px; height: 1px;"></div>`;
            customScroll.innerHTML = cscroll;

            customScroll.addEventListener("scroll", () => {

                console.log('new scroll', customScroll.scrollLeft);
                timeline.scrollTo(customScroll.scrollLeft);

                if (customScroll.scrollLeft + scrollableData.clientWidth >= widthCalHeader) {
                    let scrollPos = timeline.getScrollPosition();
                    customScroll.scrollTo(customScroll.scrollLeft - 100, scrollPos.top); // высчитать y
                    updateCalData(1, customScroll.scrollLeft);
                } if (customScroll.scrollLeft == 0) {
                    customScroll.scrollTo(100, 0); // высчитать y
                    updateCalData(-1, customScroll.scrollLeft);
                }
            });
        }
    }
});

// timeline.getScrollPosition(); // { left: 0, top: 0 }

// var top = timeline.posFromSection(section.key);

function updateCalData(i, left) {
    startDate = scheduler.date.add(startDate, i, timeline.x_unit);
    endDate = scheduler.date.add(endDate, i, timeline.x_unit);
    timeline.setRange(startDate, endDate);
    let scrollPos = timeline.getScrollPosition();
    timeline.scrollTo(left, scrollPos.top);
}

scheduler.date.hour_start = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
};
scheduler.date.minute_start = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
}

customScheduler.init();

customScheduler.load("sources/data.json");

// console.log('new scroll', customScroll.scrollLeft);
// timeline.scrollTo(customScroll.scrollLeft);

// if (customScroll.scrollLeft + scrollableData.clientWidth >= widthCalHeader) {
//     customScroll.scrollTo(customScroll.scrollLeft - 100, 0); // высчитать y
//     setTimeout(function () {
//         updateCalData(1, customScroll.scrollLeft, range);
//     });
// } else if (customScroll.scrollLeft == 0) {
//     customScroll.scrollTo(1, 0); // высчитать y
//     setTimeout(function () {
//         updateCalData(-1, customScroll.scrollLeft, range);
//     });
// }


// function updateCalData(i, left, range) {
//     let nextCenterDate = scheduler.date.add(range.date, i, timeline.x_unit);
//     scheduler.setCurrentView(nextCenterDate);
//     timeline.scrollTo(left);
// }




// timeline.scrollTo(customScroll.scrollLeft);

// var range = scheduler.getState();
// var screenLeftDate = timeline.dateFromPos(customScroll.scrollLeft);
// var screenRightDate = timeline.dateFromPos(customScroll.scrollLeft + scrollableData.offsetWidth);

// var visiblePortionDuration = screenRightDate - screenLeftDate;
// var loadedTimelineDuration = range.max_date - range.min_date;

// var scrollThreshold = 0.01; // load new portion when gantt is scrolled to 4/5 of visible range to the right or 1/5 to the left
// if (visiblePortionDuration / loadedTimelineDuration >= 1 - scrollThreshold) {
//     return; // if the size of the visible portion is to close to the size of the loaded range for this threshold value which could cause infinite loop - disable infinite scroll
// }

// var extendRight = ((range.max_date - screenRightDate) / loadedTimelineDuration < scrollThreshold);
// var extendLeft = ((screenLeftDate - range.min_date) / loadedTimelineDuration < scrollThreshold);

// if (extendRight || extendLeft) {
//     var unitsRange = timeline.x_size * timeline.x_step;
//     var scrollAmount = Math.max(Math.round((unitsRange * scrollThreshold) / 2), 1);

//     var ignoreNext = true;
//     var nextCenterDate;
//     if (extendRight) {
//         var nextCenterDate = scheduler.date.add(range.date, 1, timeline.x_unit);

//     } else if (extendLeft) {
//         var nextCenterDate = scheduler.date.add(range.date, -1, timeline.x_unit);
//     }
//     // setTimeout(() => {
//         scheduler.setCurrentView(nextCenterDate);
//         var left = timeline.posFromDate(screenLeftDate);
//         customScroll.scrollTo(left, 0);
//     // });
// }






// if (timeline.scrollable) {


//     timeline.attachEvent("onScroll", function (left, top) {
//         console.log(left);

//         let widthCalHeader = Number(getComputedStyle(document.querySelector('.dhx_cal_header')).width.replace('px', ''));
//         let scrollElem = document.querySelector('.dhx_timeline_scrollable_data');

//         let range = scheduler.getState();
//         if (left + scrollElem.clientWidth >= widthCalHeader) {
//             updateCalData(1, left, range);
//         } else if (left == 0) {
//             updateCalData(-1, left, range);
//         }
//     });
// }


// function updateCalData(i, left, range) {
//     let nextCenterDate = scheduler.date.add(range.date, i, timeline.x_unit);
//     setTimeout(function () {
//         scheduler.setCurrentView(nextCenterDate);
//         timeline.scrollTo(left - i);
//     }, 50);
// }