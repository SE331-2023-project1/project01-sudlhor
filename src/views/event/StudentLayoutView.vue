<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type studentInfo } from '@/student'
import StudentService from '@/services/StudentInfoServices'
import {useRouter} from 'vue-router';
const student = ref<studentInfo | null> (null)

const props = defineProps({
    id: String
})

const router = useRouter()
StudentService.getStudentById(Number(props.id)).then((response) => {
        student.value = response.data
    }).catch(error =>{
        console.log(error)
        if(error.response && error.response.status === 404){
            router.push({name:'404-resource',params: {resource: 'event'}})
        }else{
            router.push({name:'network-error'})
        }
    })

</script>
<template>
    <div v-if="student">
        <div id="nav">
            <router-link :to="{name: 'student-detail', params:{id}}">Details</router-link> | 
            <router-link :to="{name: 'student-advisor', params:{id}}">Teacher</router-link> | 
            <router-link :to="{name: 'student-comment', params:{id}}">Comment</router-link>


        </div>
        <router-view :student="student"></router-view>
    </div>
</template>
<style scoped>
div a.router-link-exact-active {
  color: white;
}

div a.router-link-exact-active:hover {
  background-color: transparent;
}

</style>
