import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Grade } from "../models/grade";

export default class GradesStore {

    gradesRegistry = new Map<string, Grade>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get gradesArray(){
        return Array.from(this.gradesRegistry.values());
    }

    loadGrades = async () => {
        try{
            this.loadingInitial = true;
            const grades = await agent.Grades.list();
            grades.map(grade => (
                this.setGrade(grade)
            ));
        }catch(error){
            console.log(error);
        }
    }

    private setGrade = (grade: Grade) =>{
        this.gradesRegistry.set(grade.id, grade);
    }
}