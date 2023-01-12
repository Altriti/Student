import { Professor } from "./professor";
import { Student } from "./student"
import { Subject } from "./subject"

export interface Grade{
    id: string;
    studentId: string;
    student: Student;
    subjectId: string;
    subject: Subject;
    grade: number;
    mainGrade: boolean;
    professor: Professor;
}