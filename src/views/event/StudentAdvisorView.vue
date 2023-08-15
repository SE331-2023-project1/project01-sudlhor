<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { TeacherInfo } from '@/teacher'
import type { studentInfo } from '@/student'
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const props = defineProps({
    student: {
        type: Object as PropType<studentInfo>,
        required: true
    }
})


const teacherStoreAll = useTeacherAllStore();
const { teacher_all } = storeToRefs(teacherStoreAll);

const teacher = ref<TeacherInfo | null>(null);
const teacherId = props.student.teacher_id;

// Find the teacher with the matching id
const foundTeacher = teacher_all.value.find((teacher) => teacher.id === teacherId);

// Assign the found teacher to the 'teacher' ref, or null if not found
if (foundTeacher) {
  teacher.value = foundTeacher;
} else {
  teacher.value = null;
}
</script>
<template>
   
    <div v-if="teacher">
        <h1> {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h1>
        <h3>{{ teacher?.teacher_gender }} {{ teacher?.teacher_age }} </h3>
        <h3>{{ teacher?.teacher_graduated }}</h3>
        <h3>{{ teacher?.teacher_position }}</h3>
        <h3>{{ teacher?.teacher_email }}</h3>
        <h3>{{ teacher?.teacher_phone }}</h3>
        <img :src="teacher.taacher_img" class="image" />
    </div>
</template>
<style scoped>
.image{
    width: 300px;
    height: 225px;
    align-items: margin-right;
    text-align: right;
}
h1,h3{
    color: aliceblue;
}
</style>