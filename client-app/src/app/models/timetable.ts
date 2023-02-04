import { Class } from "./class";
import { Subject } from "./subject";

export interface Timetable {
    id: string;
    classId: string;
    class: Class;
    weekDaySchedules: WeekDaySchedule[];
}

export interface WeekDaySchedule {
    weekDayScheduleId: string;
    day: number;
    schedules: Schedule[];
}

export interface Schedule {
    scheduleId: string;
    subjectId: string;
    subject: Subject;
    time: string;
}

export class Timetable implements Timetable {
    constructor(init?: TimetableFormValues) {
        Object.assign(this, init);
    }
}

export class TimetableFormValues {
    id: string = '';
    classId: string = '';
    weekDayschedules = [{
        day: 0,
        schedules: [{
            subjectId: '',
            time: ''
        }]
    }]

    constructor(timetable?: TimetableFormValues) {
        if (timetable) {
            this.id = timetable.id;
            this.classId = timetable.classId;
            this.weekDayschedules = [];
            for (let i = 0; i < timetable.weekDayschedules.length; i++) {
                this.weekDayschedules[i] = {
                    day: timetable.weekDayschedules[i].day,
                    schedules: []
                };
                for (let j = 0; j < timetable.weekDayschedules[i].schedules.length; j++) {
                    this.weekDayschedules[i].schedules[j] = {
                        subjectId: timetable.weekDayschedules[i].schedules[j].subjectId,
                        time: timetable.weekDayschedules[i].schedules[j].time
                    };
                }
            }
        };
    }
}

