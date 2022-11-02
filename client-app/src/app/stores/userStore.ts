import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { AppUser } from "../models/appUser";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    userRegistry = new Map<string, AppUser>();
    // userRole: string;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;//!! converts into boolean
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);//user -> osht useri qe vjen prej api (UserDto) prej Login method.
            runInAction(() => this.user = user);
            history.push('/');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    confirmStudent = async (id: string) => {
        // this.loading = true;
        try {
            await agent.Account.confirm(id);
            runInAction(() => {
                // this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                // this.loading = false;
            })
        }
    }

    get usersArr() {
        return Array.from(this.userRegistry.values());
    }

    loadUsers = async () => {
        try {
            const users = await agent.Account.list();
            users.forEach(user => {
                this.setUser(user);
            })
        } catch (error){
            console.log(error);
        }
    }

    private setUser = (user: AppUser) => {
        this.userRegistry.set(user.id, user);
    }

    // getUserRole = async () => {
    //     try{
    //         const user = agent.Account.current();
    //         runInAction(() => this.userRole = user);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
}