import { defineStore } from 'pinia'
export const useStudentAllStore = defineStore('student_all', {
    state: () => ({
        student_all: []
    }),
    actions: {
        setStudentArray(student){
            this.student_all=student
        },
        pushNewStudent(student_all){
            this.student_all.push(student_all)
        }
    }
})