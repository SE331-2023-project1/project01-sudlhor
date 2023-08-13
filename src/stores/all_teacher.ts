import { defineStore } from 'pinia'
export const useTeacherAllStore = defineStore('teacher_all', {
    state: () => ({
        teacher_all: []
    }),
    actions: {
        setTeacherArray(teacher){
            this.teacher_all=teacher
        },
        pushNewTeacher(teacher_all){
            this.teacher_all.push(teacher_all)
        }
    }
})