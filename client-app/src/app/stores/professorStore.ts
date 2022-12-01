import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Professor } from "../models/professor";

export default class professorStore {
    professorRegistry = new Map<string, Professor>();
    selectedProfessor: Professor | undefined = undefined;
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get professorArr() {
        return Array.from(this.professorRegistry.values());
    }

    loadProfessors = async () => {
        runInAction(() => {
            this.loadingInitial = true;
        })
        try {
            const professors = await agent.Professors.list();
            professors.forEach(professor => {
                this.setProfessor(professor);
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


    loadProfessor = async (id: string) => {
        let professor = this.getProfessor(id);
        if (professor) {
            this.selectedProfessor = professor;
            return professor;
        } else {
            runInAction(() => {
                this.loadingInitial = true;
            })
            try {
                professor = await agent.Professors.details(id);
                this.setProfessor(professor);
                runInAction(() => {
                    this.selectedProfessor = professor;
                    this.loadingInitial = false;
                });
                return professor;
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                })
            }
        }
    }

    private setProfessor = (professor: Professor) => {
        this.professorRegistry.set(professor.id, professor);
    }


    private getProfessor = (id: string) => {
        return this.professorRegistry.get(id);
    }

    createProfessor = async (professor: Professor) => {
        this.loading = true;
        try {
            await agent.Professors.create(professor);
            runInAction(() => {
                this.professorRegistry.set(professor.id, professor);
                this.selectedProfessor = professor;
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateProfessor = async (professor: Professor) => {
        this.loading = true;
        try {
            await agent.Professors.update(professor);
            runInAction(() => {
                this.professorRegistry.set(professor.id, professor);
                this.selectedProfessor = professor;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteProfessor = async (id: string) => {
        this.loading = true;
        try {
            await agent.Professors.delete(id);
            runInAction(() => {
                this.professorRegistry.delete(id);
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