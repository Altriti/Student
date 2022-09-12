import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Student } from "../models/student";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }

    )
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if(typeof data ==='string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) { //for...in loop 
                    if (data.errors[key]) { //key -> city,email, name...; data.errors[key] -> city must not be empty, email must not be emty ...
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();//flat -> list fo strings
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorise');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete(url).then<T>(responseBody),
}

const Students = {
    list: () => requests.get<Student[]>('/students'),
    details: (id: string) => requests.get<Student>(`students/${id}`),
    create: (student: Student) => requests.post<void>(`/students`, student),
    update: (student: Student) => axios.put<void>(`/students/${student.id}`, student),
    delete: (id: string) => axios.delete<void>(`/students/${id}`)
}

const agent = {
    Students
}

export default agent;