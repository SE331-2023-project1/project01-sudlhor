<script setup lang="ts">
import type { Ref } from 'vue'
import { type studentInfo } from '@/student'
import type{PropType} from 'vue'

defineProps({
    student: {
        type: Object as PropType<studentInfo>,
            require: true
    }
})
</script>
<template>
    <div v-if="student">
        <h1>PROFILE</h1>
        <h2>Name : {{ student.name }}  {{ student.surname }}</h2>
        <h2>StudentID : {{ student.id }} </h2>
        <h2>Courses : </h2>
        <h3 v-for="course in student.course_list" :key="course.id"> - {{ course.course_name }}</h3><br>
        <img :src="student.image">
    </div>
</template>

<style scoped>
img{
    width: 300px;
    height: 200px;
    align-items: center;
    border-radius: 20px

}   
h2{
    color: aliceblue;
}

h1{
    color: aliceblue;
}

h3{
    color: aliceblue;
}
</style>