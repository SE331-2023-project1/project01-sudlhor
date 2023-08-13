
<template>
    <br><br><br>
    <RouterLink class="teacher-link" :to="{name: 'teacher-detail', params:{id: teacher?.id}}">
        <div class=" animate__animated animate__fadeInLeft student-class">
        <div class="event-class">
            <div class="teacher-card">
                <img :src="teacher.taacher_img" class="image" />
                <h4> {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h4>
            </div>
        </div>
    </div>

    </RouterLink>
</template>

<script setup lang="ts">
import { TeacherInfo } from '@/teacher';
import type { PropType } from 'vue';
import 'animate.css';

const props = defineProps({
    teacher: {
        type: Object as PropType<TeacherInfo>,
            require: true
    }
})
</script>

<style scoped>

.teacher-card{
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 5px solid #ffffff;
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;

}
.teacher-card:hover{
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.teacher-link{
    color:aliceblue;
    text-decoration: none;
}

.image{
    width: 200px;
    height: 150px;
    align-items: center;
}
</style>    