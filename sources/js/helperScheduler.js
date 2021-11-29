export class Scheduler {

    constructor(idElement) {
        this.idElement = idElement;
    }

    static get CUSTOM_TABS() {
        return [{
            key: "event",
            label: "Event"
        }, {
            key: "task",
            label: "Task"
        }, {
            key: "appointment",
            label: "Appointment"
        }, {
            key: "meeting",
            label: "Meeting"
        }]
    }

    static get USERS() {
        return [{
                key: "Alex",
                label: "Alex",
            },
            {
                key: "Max",
                label: "Max",
            },
            {
                key: "Bob",
                label: "Bob",
            },
            {
                key: "Tom",
                label: "Tom",
            }
        ]
    }

    static get STATUS() {
        return [{
            key: 1,
            label: "Not started"
        }, {
            key: 2,
            label: "In progress"
        }, {
            key: 3,
            label: "Completed"
        }]
    }

    init() {
        this.setConfig();
        if (!document.querySelector(this.idElement)) {
            const node = document.createElement("div");
            node.style.width = "100%";
            node.style.height = "100%";
            node.setAttribute("id", this.idElement);
            node.innerHTML = `
            <div class="dhx_cal_navline">
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date" style="font-size: 14px; left: 190px;"></div>
                <div class="dhx_cal_tab dhx_cal_tab_first" name="day_tab" style="left:15px;"></div>
                <div class="dhx_cal_tab" name="week_tab" style="left: 75px;"></div>    
                <div class="dhx_cal_tab" name="weekdays_tab" style="left:136px; width: 95px;"></div>
                <div class="dhx_cal_tab dhx_cal_tab_last" name="month_tab" style="left:232px; width: 65px;"></div>
                <div class="dhx_cal_tab" name="timeline_tab" style="left:350px; width: 100px;">Timeline</div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
            `;
            document.body.appendChild(node);
        }
        scheduler.init(this.idElement);
        this.setConfig();
    }

    setConfig() {
        scheduler.locale.labels.icon_confident = "Confidential information";
        scheduler.config.fix_tab_position = false;
        scheduler.locale.labels.weekdays_tab = "Weekdays";
        scheduler.config.details_on_dblclick = true;
        scheduler.config.details_on_create = true;
        scheduler.locale.labels.timeline_tab ="Timeline";
    }

    load(nameDataFile) {
        scheduler.load(nameDataFile);
    }
}