import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Student } from "../models/student";

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
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorise');
            break;
        case 404:
            toast.error('not found');
            break;
        case 500:
            toast.error('server error');
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