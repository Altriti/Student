import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Student } from "../models/student";

export default class StudentStore {
    studentRegistry = new Map<string, Student>();//map get 2 arguments. Here it's getting studentid as string and whole student
    selectedStudent: Student | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get studentsArr() {
        return Array.from(this.studentRegistry.values());
    }


    loadStudents = async () => {
        this.loadingInitial = true;
        try {
            const students = await agent.Students.list();
            students.forEach(student => {
                this.setStudent(student);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    loadStudent = async (id: string) => {     //ka po vjen qajo id si parameter bre. Prej butonit view nga studentlist.tsx???? Nahta prej line 16, file StudentDetails.tsx
        let student = this.getStudent(id);
        if (student) {
            this.selectedStudent = student;
            return student;
        } else {
            this.loadingInitial = true
            try { //kur jem mrena ni student details edhe ja bojm refresh
                student = await agent.Students.details(id);
                this.setStudent(student);
                runInAction(() => {
                    this.selectedStudent = student;
                })
                this.setLoadingInitial(false);
                return student;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setStudent = (student: Student) => {
        this.studentRegistry.set(student.id, student);
    }

    private getStudent = (id: string) => {
        return this.studentRegistry.get(id);
    }



    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createStudent = async (student: Student) => {
        this.loading = true;
        try {
            await agent.Students.create(student);
            runInAction(() => {
                this.studentRegistry.set(student.id, student);
                this.selectedStudent = student;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateStudent = async (student: Student) => {
        this.loading = true;
        try {
            await agent.Students.update(student);
            runInAction(() => {
                this.studentRegistry.set(student.id, student);
                this.selectedStudent = student;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteStudent = async (id: string) => {
        this.loading = true;
        try {
            await agent.Students.delete(id);
            runInAction(() => {
                this.studentRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
}