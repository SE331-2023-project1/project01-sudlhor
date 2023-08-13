<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import Teacherservice from '@/services/Teacherservice';
const teacher = ref<TeacherInfo| null> (null)
const props = defineProps({
    id: String
})
Teacherservice.getTeacherByID(Number(props.id)).then((response) => {
    teacher.value = response.data
}).catch(error => {
        console.log(error)
    })

</script>
<template>
    <br><br><br>
    <div v-if="teacher">
        <img :src="teacher.taacher_img" class="image" />
        <br>
        <h1> {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h1>
        <h3>{{ teacher?.teacher_gender }} {{ teacher?.teacher_age }} </h3>
        <h3>{{ teacher?.teacher_graduated }}</h3>
        <h3>{{ teacher?.teacher_position }}</h3>
        <h3>{{ teacher?.teacher_email }}</h3>
        <h3>{{ teacher?.teacher_phone }}</h3>
    </div>
</template>
<style scoped>
.image{
    width: 200px;
    height: 150px;
    align-items: center;
    text-align: center;
  border-radius: 500px;
}

</style>    