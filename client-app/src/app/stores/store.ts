import { createContext, useContext } from "react";
import studentStore from "./studentStore";

interface Store {
    studentStore: studentStore
}

export const store: Store = {
    studentStore: new studentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}