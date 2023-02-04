import { createContext, useContext } from "react";
import ClassesStore from "./classesStore";
import CommonStore from "./commonStore";
import GradesStore from "./gradesStore";
import ModalStore from "./modalStore";
import professorStore from "./professorStore";
import StudentStore from "./studentStore";
import subjectStore from "./subjectStore";
import TimetableStore from "./timetableStore";
import UserStore from "./userStore";

interface Store {
    studentStore: StudentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    professorStore: professorStore;
    subjectStore: subjectStore;
    classesStore: ClassesStore;
    gradesStore: GradesStore;
    timetableStore: TimetableStore;
}

export const store: Store = {
    studentStore: new StudentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    professorStore: new professorStore(),
    subjectStore: new subjectStore(),
    classesStore: new ClassesStore(),
    gradesStore: new GradesStore(),
    timetableStore: new TimetableStore()
}

export const StoreContext = createContext(store);//createContext creates a context object and lets us use the store in whole application

export function useStore(){
    return useContext(StoreContext);
}