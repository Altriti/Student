import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import professorStore from "./professorStore";
import StudentStore from "./studentStore";
import subjectStore from "./subjectStore";
import UserStore from "./userStore";

interface Store {
    studentStore: StudentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    professorStore: professorStore;
    subjectStore: subjectStore;
}

export const store: Store = {
    studentStore: new StudentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    professorStore: new professorStore(),
    subjectStore: new subjectStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}