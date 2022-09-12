import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class commonStore{
    error: ServerError | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    setServerError = (error: ServerError) => { //vjen prej store.commonStore.setServerError(data). error: ServerError osht qajo data i agent.ts
        this.error = error; //error: ServerError | null = null = errorin qe vjen si parameter (error: ServerError)
    }
}