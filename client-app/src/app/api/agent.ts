import axios, { AxiosResponse } from "axios";
import { url } from "inspector";
import { Student } from "../models/student";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }

    )
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    details: (id:string) => requests.get<Student>(`students/${id}`),
    create: (student: Student) => requests.post<void>(`/students`, student),
    update: (student: Student) => axios.put<void>(`/students/${student.id}`, student),
    delete: (id: string) => axios.delete<void>(`/students/${id}`)
}

const agent = {
    Students
}

export default agent;