import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Grade, GradeFormValues } from "../models/grade";

export default class GradesStore {
    gradesRegistry = new Map<string, Grade>();
    loadingInitial = false;
    selectedGrade: Grade | undefined = undefined
    loading = false;
    gradeStatus = true;

    constructor() {
        makeAutoObservable(this);
    }

    get gradesArray() {
        return Array.from(this.gradesRegistry.values());
    }

    loadGrades = async () => {
        this.loadingInitial = true;
        try {
            const grades = await agent.Grades.list();
            grades.map(grade => (
                this.setGrade(grade)
            ));
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = true;
        }
    }

    private setGrade = (grade: Grade) => {
        this.gradesRegistry.set(grade.id, grade);
    }

    loadGrade = async (id: string) => {
        this.getGradeStatus(id);
        let grade = this.getGrade(id);
        if (grade) {
            this.selectedGrade = grade;
            return grade
        } else {
            this.loadingInitial = true;
            try {
                grade = await agent.Grades.details(id);
                this.setGrade(grade);
                this.selectedGrade = grade;
                this.loadingInitial = false;
                return grade;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }

    private getGrade = (id: string) => {
        return this.gradesRegistry.get(id);
    }

    createGrade = async (grade: GradeFormValues) => {
        try {
            await agent.Grades.create(grade);
            const newGrade = new Grade(grade);
            newGrade.student = null;
            newGrade.subject = null;
            newGrade.professor = null;
            this.setGrade(newGrade);
            this.selectedGrade = newGrade;
        } catch (error) {
            console.log(error);
        }
    }

    updateGrade = async (grade: GradeFormValues) => {
        this.loading = true;
        try {
            await agent.Grades.update(grade);
            if (grade.id) {
                let updatedGrade = { ...this.getGrade(grade.id), ...grade };
                this.gradesRegistry.set(grade.id, updatedGrade as Grade);
                this.selectedGrade = updatedGrade as Grade;
            };
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteGrade = async (id: string) => {
        this.loading = true;
        try {
            await agent.Grades.delete(id)
            this.gradesRegistry.delete(id);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    private getGradeStatus = async (id: string) => {
        let grade = this.gradesRegistry.get(id);
        if(grade){
            this.gradeStatus = grade.mainGrade;
        }else{
            grade = await agent.Grades.details(id);
            this.gradeStatus = grade.mainGrade;
        }
    } //kjo logjik kerkon vemendje 100% AltritBrain. Copyright claimed and patented. Jo qe osht ku me dit najsen amo per mu osht ;)
}