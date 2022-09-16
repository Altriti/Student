import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;


    constructor() {
        makeAutoObservable(this);

        reaction(//Nuk ekzekutohet kur app first loads, ekzekutohet vetem kur token ka ndryshim ne "token"
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jet')
                }
            }
        )
    }

    setServerError = (error: ServerError) => { //vjen prej store.commonStore.setServerError(data) i agent.ts. error: ServerError osht qajo data i agent.ts
        this.error = error; //error: ServerError | null = null = errorin qe vjen si parameter (error: ServerError)
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

}