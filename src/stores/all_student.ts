import { defineStore } from 'pinia'
import type{ studentInfo } from '@/student'
export const useStudentAllStore = defineStore('student_all', {
    state: () => ({
        student_all: [] as studentInfo[]
    }),
    actions: {
        setStudentArray(student: studentInfo[]){
            this.student_all=student
        },
        pushNewStudent(student_all:studentInfo){
            this.student_all.push(student_all)
        }
    }
})