import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Class } from "../models/class";

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

    createClass = async (classR: Class) => {
        runInAction(() => {
            this.loading = true;
        });
        try {
            await agent.Classes.create(classR);
            this.setClass(classR)
            runInAction(() => {
                this.loading = false
                this.selectedClass = classR;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            });
        }
    }

    updateClass = async (classR: Class) => {
        this.loading = true;
        try {
            await agent.Classes.update(classR);
            runInAction(() => {
                this.setClass(classR);
                this.selectedClass = classR;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteClass = async (id: string) => {
        this.loading = true;
        try{
            await agent.Classes.delete(id);
            runInAction(()=>{
                this.classRegistry.delete(id);
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    resgisterStudent = async (classId: string, studentId: string) =>{
        try{
            await agent.Classes.registerStudent(classId, studentId);
        }catch(error){
            console.log(error);
        }

    }
}