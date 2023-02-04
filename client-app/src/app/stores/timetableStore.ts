import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Timetable, TimetableFormValues } from "../models/timetable";

export default class TimetableStore {
    timetableRegistry = new Map<string, Timetable>();
    loadingInitial = false;
    selectedTimetable: Timetable | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get timetablesArr() {
        return Array.from(this.timetableRegistry.values());
    }

    loadTimetables = async () => {
        this.loadingInitial = true;
        try {
            const timetables = await agent.Timetables.list();
            timetables.map(timetable => (
                this.setTimetable(timetable)
            ));
            this.loadingInitial = false
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    private setTimetable = (timetable: Timetable) => {
        this.timetableRegistry.set(timetable.id, timetable);
    }

    loadTimetable = async (id: string) => {
        let timetable = this.getTimetable(id);
        if (timetable) {
            this.selectedTimetable = timetable;
            return timetable;
        } else {
            this.loadingInitial = true;
            try {
                timetable = await agent.Timetables.details(id);
                this.selectedTimetable = timetable;
                this.loadingInitial = false;
                return timetable;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }

    }

    private getTimetable = (id: string) => {
        return this.timetableRegistry.get(id);
    }

    createTimetable = async (timetable: TimetableFormValues) => {
        try {
            agent.Timetables.create(timetable);
            const newTimetable = new Timetable(timetable);
            this.setTimetable(newTimetable);
        } catch (error) {
            console.log(error);
        }
    }

    updateTimetable = async (timetable: TimetableFormValues) => {
        try {
            agent.Timetables.update(timetable);
            if (timetable.id) {
                let updatedTimetable = { ...this.getTimetable(timetable.id), ...timetable };
                this.timetableRegistry.set(timetable.id, updatedTimetable as Timetable);
                this.selectedTimetable = updatedTimetable as Timetable;
            }
        } catch (error) {

        }
    }

    deleteTimetable = async (id: string) => {
        this.loading = true;
        try {
            agent.Timetables.delete(id);
            this.timetableRegistry.delete(id);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}