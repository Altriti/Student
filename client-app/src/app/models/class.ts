import { Professor } from "./professor";
import { Profile } from "./profile";
import { Student } from "./student";
import { Subject } from "./subject";

export interface Class {
    id: string;
    className: string;
    classProfessor: Professor | null;
    subjects: Subject[];
    professors: Profile[];
    students: Student[];
}

export class Class implements Class {
    constructor(init?: ClassFormValues) {
        Object.assign(this, init);
    }
}

export class ClassFormValues {
    id?: string = undefined;
    className: string = '';

    constructor(classR?: ClassFormValues) {
        if (classR) {
            this.id = classR.id;
            this.className = classR.className;
        };
    }
}