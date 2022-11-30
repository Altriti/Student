import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import professorStore from "./professorStore";
import StudentStore from "./studentStore";
import UserStore from "./userStore";

interface Store {
    studentStore: StudentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    professorStore: professorStore;
}

export const store: Store = {
    studentStore: new StudentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    professorStore: new professorStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}