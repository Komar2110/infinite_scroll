import {
    Scheduler
} from "./helperScheduler.js";

export class Lightbox {

    static get FULL_LIGHTBOX() {
        return [{
            name: "Subject",
            height: 22,
            width: 50,
            map_to: "subject",
            type: "textarea",
        }, {
            name: "Description",
            height: 50,
            map_to: "text",
            type: "textarea",
            focus: true
        }, {
            name: "Users",
            height: 32,
            map_to: "user",
            type: "multiselect",
            options: Scheduler.USERS,
        }, {
            name: "Type",
            height: 22,
            map_to: "type",
            type: "select",
            options: Scheduler.CUSTOM_TABS,
        }, {
            name: "time",
            height: 72,
            type: "time",
            map_to: "auto"
        }];
    }

    static get SHORT_LIGHTBOX() {
        return [{
            name: "Description",
            height: 50,
            map_to: "text",
            type: "textarea",
            focus: true
        }, {
            name: "Users",
            height: 32,
            map_to: "user",
            type: "multiselect",
            options: Scheduler.USERS,
        }, {
            name: "Type",
            height: 22,
            map_to: "type",
            type: "select",
            options: Scheduler.CUSTOM_TABS,
        }, {
            name: "time",
            height: 72,
            type: "time",
            map_to: "auto"
        }];
    }
}