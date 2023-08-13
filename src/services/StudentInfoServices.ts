import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { studentInfo } from '@/student'

const apiClient : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3004/',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getStudent(perPage: number, page:number): Promise<AxiosResponse<studentInfo[]>>{
        return apiClient.get<studentInfo[]>('/students?_limit=' + perPage + '&_page=' + page)
    },
    getStudentById(id: number): Promise<AxiosResponse<studentInfo>>{
        return apiClient.get<studentInfo>('students/' + id.toString())

    }
}