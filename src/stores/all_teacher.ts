import { defineStore } from 'pinia';
import type { TeacherInfo } from '@/teacher';

export const useTeacherAllStore = defineStore('teacher_all', {
  state: () => ({
    teacher_all: [] as TeacherInfo[]
  }),
  actions: {
    setTeacherArray(teachers: TeacherInfo[]) {
      this.teacher_all = teachers;
    },
    pushNewTeacher(newTeacher: TeacherInfo) {
      this.teacher_all.push(newTeacher);
    }
  }
});