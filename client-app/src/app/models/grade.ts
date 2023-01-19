import { Professor } from "./professor";
import { Profile } from "./profile";
import { Subject } from "./subject"

export interface Grade {
    id: string;
    studentId: string;
    student: Profile | null;
    subjectId: string;
    subject: Subject | null;
    grade: number;
    mainGrade: boolean;
    professor: Professor | null;
}

export class Grade implements Grade {
    constructor(init?: GradeFormValues) {
        Object.assign(this, init)
    }
}

export class GradeFormValues {
    id?: string = undefined;
    studentId: string = '';
    subjectId: string = '';
    grade: number = 0;
    mainGrade: boolean = false;

    constructor(grade?: GradeFormValues) {
        if (grade) {
            this.id = grade.id;
            this.studentId = grade.studentId;
            this.subjectId = grade.subjectId;
            this.grade = grade.grade;
            this.mainGrade = grade.mainGrade;
        }
    }
}