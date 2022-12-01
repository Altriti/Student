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
        this.loadingInitial = true;
        try {
            const professors = await agent.Professors.list();
            console.log(professors);
            professors.forEach(professor => {
                this.setProfessor(professor);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }


    loadProfessor = async (id: string) => {
        let professor = this.getProfessor(id);
        if (professor) {
            this.selectedProfessor = professor;
            return professor;
        } else {
            this.loadingInitial = true;
            try {
                professor = await agent.Professors.details(id);
                this.setProfessor(professor);
                runInAction(() => {
                    this.selectedProfessor = professor;
                });
                this.loadingInitial = false;
                return professor;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
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
            this.loading = false;
        }
    }
}