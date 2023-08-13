<script setup lang="ts">
import { ref } from 'vue'
import type{PropType} from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import { type studentInfo } from '@/student'
import Teacherservice from '@/services/Teacherservice';
const props =defineProps({
    student: {
        type: Object as PropType<studentInfo>,
            require: true
    }
})

const teacher = ref<TeacherInfo| null> (null)
Teacherservice.getTeacherByID(Number(props.student.teacher_id)).then((response) => {
    teacher.value = response.data
}).catch(error => {
        console.log(error)
    })

</script>
<template>
    <br>
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
h1,h3{
    color: aliceblue;
}
</style>