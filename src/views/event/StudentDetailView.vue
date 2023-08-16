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
        <h1 class="text-gray-300 text-2xl">PROFILE</h1>
        <h2 class="text-gray-300 text-xl">Name : {{ props.student?.name }}  {{ props.student?.surname }}</h2>
        <h2 class="text-gray-300 text-xl">StudentID : {{ props.student?.id }} </h2>
        <h2 class="text-gray-300 text-xl">Courses : </h2>
        <h3 class="text-gray-300 text-xl" v-for="course in props.student?.course_list" :key="course.course_id"> - {{ course.course_name }}</h3><br>
        <img class="w-2/5 h2/5 rounded-xl" :src="props.student?.image">
    </div>
</template>

