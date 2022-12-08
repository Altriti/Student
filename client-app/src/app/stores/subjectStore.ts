import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Subject } from "../models/subject";

export default class subjectStore {
    subjectRegistry = new Map<string, Subject>();
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get subjectsArr() {
        return Array.from(this.subjectRegistry.values());
    }

    loadSubjects = async () => {
        runInAction(() => {
            this.loadingInitial = true;
        })
        try {
            const subjects = await agent.Subjects.list();
            subjects.forEach(subject => {
                this.setSubject(subject);
            });
            runInAction(() => {
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    private setSubject = (subject: Subject) => {
        this.subjectRegistry.set(subject.id, subject);
    }

    loadSubject = async (id: string) => {
        let subject = this.getSubject(id);
        if (subject) {
            return subject
        }
        else {
            this.loadingInitial = true;
            try {
                subject = await agent.Subjects.details(id);
                runInAction(() => {
                    this.loadingInitial = false;
                });
                return subject
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                });
            }
        }
    }

    private getSubject = (id: string) => {
        return this.subjectRegistry.get(id);
    }

    createSubject = async (subject: Subject) => {
        runInAction(() => {
            this.loading = true;
        })
        try {
            await agent.Subjects.create(subject);
            runInAction(() => {
                this.setSubject(subject);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateSubject = async (subject: Subject) => {
        runInAction(() => {
            this.loading = true;
        })
        try {
            agent.Subjects.update(subject);
            runInAction(() => {
                this.setSubject(subject);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteSubject = async (id: string) => {
        runInAction(() => {
            this.loading = true;
        })
        try {
            await agent.Subjects.delete(id);
            runInAction(() => {
                this.subjectRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}