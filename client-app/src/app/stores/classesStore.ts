import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Class, ClassFormValues } from "../models/class";

export default class ClassesStore {
    classRegistry = new Map<string, Class>();
    selectedClass: Class | undefined = undefined
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get classArr() {
        return Array.from(this.classRegistry.values());
    }

    loadClasses = async () => {
        runInAction(() => {
            this.loadingInitial = true
        });
        try {
            const classes = await agent.Classes.list();
            classes.forEach(classR => {
                this.setClass(classR);
            });
            runInAction(() => {
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    private setClass = (classR: Class) => {
        this.classRegistry.set(classR.id, classR);
    }

    loadClass = async (id: string) => {
        let classR = this.getClass(id);
        if (classR) {
            this.selectedClass = classR;
            return classR;
        } else {
            this.loadingInitial = true;
            try {
                const classR = await agent.Classes.details(id);
                this.setClass(classR);
                runInAction(() => {
                    this.selectedClass = classR;
                    this.loadingInitial = false;
                });
                return classR;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }

    }

    private getClass = (id: string) => {
        return this.classRegistry.get(id);
    }

    createClass = async (classR: ClassFormValues) => {
        try {
            await agent.Classes.create(classR);
            const newClassR = new Class(classR);
            newClassR.subjects = [];
            newClassR.classProfessor = null;
            newClassR.students = [];
            newClassR.professors = [];
            this.setClass(newClassR);
            runInAction(() => {
                this.selectedClass = newClassR;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateClass = async (classR: ClassFormValues) => {
        try {
            await agent.Classes.update(classR);
            runInAction(() => {
                if (classR.id) {
                    let updatedClassR = { ...this.getClass(classR.id), ...classR };
                    this.classRegistry.set(classR.id, updatedClassR as Class);
                    this.selectedClass = updatedClassR as Class;
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteClass = async (id: string) => {
        this.loading = true;
        try {
            await agent.Classes.delete(id);
            runInAction(() => {
                this.classRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    resgisterStudent = async (classId: string, studentId: string) => {
        try {
            await agent.Classes.registerStudent(classId, studentId);
        } catch (error) {
            console.log(error);
        }

    }

    registerProfessor = async (classId: string, professorId: string) => {
        try {
            await agent.Classes.registerProfessor(classId, professorId);
        } catch (error) {
            console.log(error);
        }
    }

    registerSubject = async (classId: string, subjectId: string) => {
        try {
            await agent.Classes.registerSubject(classId, subjectId);
        } catch (error) {
            console.log(error);
        }
    }
}