import { createContext, useContext } from "react";
import commonStore from "./commonStore";
import studentStore from "./studentStore";

interface Store {
    studentStore: studentStore
    commonStore: commonStore
}

export const store: Store = {
    studentStore: new studentStore(),
    commonStore: new commonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}