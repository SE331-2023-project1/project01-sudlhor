import type { studentInfo } from '@/student'
import { defineStore } from 'pinia'
export const useStudentStore = defineStore('student', {
    state: () => ({
        student: null as studentInfo | null
    }),
    actions: {
        setStudent(student: studentInfo){
            this.student = student
        }
    }
})