import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { AppUser } from "../models/appUser";
import { Class, ClassFormValues } from "../models/class";
import { Grade, GradeFormValues } from "../models/grade";
import { Professor } from "../models/professor";
import { Student } from "../models/student";
import { Subject } from "../models/subject";
import { Timetable, TimetableFormValues } from "../models/timetable";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }

    )
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
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

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    confirm: (id: string) => axios.put<void>(`/account/${id}`),
    list: () => requests.get<AppUser[]>('account/users')
}

const Professors = {
    list: () => requests.get<Professor[]>('/professors'),
    details: (id: string) => requests.get<Professor>(`/professors/${id}`),
    create: (professor: Professor) => requests.post<void>(`/professors`, professor),
    update: (professor: Professor) => axios.put<void>(`/professors/${professor.id}`, professor),
    delete: (id: string) => axios.delete<void>(`/professors/${id}`)
}

const Subjects = {
    list: () => requests.get<Subject[]>('/subjects'),
    details: (id: string) => requests.get<Subject>(`/subjects/${id}`),
    create: (subject: Subject) => requests.post<void>(`/subjects`, subject),
    update: (subject: Subject) => axios.put<void>(`/subjects/${subject.id}`, subject),
    delete: (id: string) => axios.delete<void>(`/subjects/${id}`)
}

const Classes = {
    list: () => requests.get<Class[]>('/classes'),
    details: (id: string) => requests.get<Class>(`/classes/${id}`),
    create: (classR: ClassFormValues) => requests.post<void>(`/classes`, classR),
    update: (classR: ClassFormValues) => axios.put<void>(`/classes/${classR.id}`, classR),
    delete: (id: string) => axios.delete<void>(`/classes/${id}`),
    registerStudent: (classId: string, studentId: string) => axios.post<void>(`/classes/${classId}/${studentId}/registerStudent`),
    registerProfessor: (classId: string, professorId: string) => axios.post<void>(`/classes/${classId}/${professorId}/registerProfessor`),
    registerSubject: (classId: string, subjectId: string) => axios.post<void>(`/classes/${classId}/${subjectId}/registerSubject`)
}

const Grades = {
    list: () => requests.get<Grade[]>('/studentGrades'),
    details: (id: string) => requests.get<Grade>(`/studentGrades/${id}`),
    create: (grade: GradeFormValues) => requests.post<void>('/studentgrades', grade),
    update: (grade: GradeFormValues) => requests.put<void>(`/studentgrades/${grade.id}`, grade),
    delete: (id: string) => requests.del<void>(`/studentgrades/${id}`)
}

const Timetables = {
    list: () => requests.get<Timetable[]>('/timetables'),
    details: (id: string) => requests.get<Timetable>(`/timetables/${id}`),
    create: (timetable: TimetableFormValues) => requests.post<void>('/timetables', timetable),
    update: (timetable: TimetableFormValues) => requests.put<void>(`/timetables/${timetable.id}`, timetable),
    delete: (id: string) => requests.del<void>(`/timetables/${id}`)
}

const agent = {
    Students,
    Account,
    Professors,
    Subjects,
    Classes,
    Grades,
    Timetables
}

export default agent;