<script setup lang="ts">
import { type studentInfo } from '@/student'
import type{PropType} from 'vue'
const props = defineProps({
    student: {
        type: Object as PropType<studentInfo>,
            require: true
    }
})
</script>
<template>
    <div v-if="props.student">
        <h1>PROFILE</h1>
        <h2>Name : {{ props.student?.name }}  {{ props.student?.surname }}</h2>
        <h2>StudentID : {{ props.student?.id }} </h2>
        <h2>Courses : </h2>
        <h3 v-for="course in props.student?.course_list" :key="course.course_id"> - {{ course.course_name }}</h3><br>
        <img :src="props.student?.image">
    </div>
</template>

<style scoped>
img{
    width: 300px;
    height: 200px;
    align-items: left;
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