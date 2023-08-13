<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type studentInfo } from '@/student'
import StudentService from '@/services/StudentInfoServices'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import { useStudentAllStore } from '@/stores/all_student'
// const student = ref<studentInfo | null>(null)

const props = defineProps({
  id: String
})

const router = useRouter()
// StudentService.getStudentById(Number(props.id)).then((response) => {
//         student.value = response.data
//     }).catch(error =>{
//         console.log(error)
//         if(error.response && error.response.status === 404){
//             router.push({name:'404-resource',params: {resource: 'event'}})
//         }else{
//             router.push({name:'network-error'})
//         }
//     })
const StudentStore = useStudentStore()
const studentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(studentStore_all)
const { student } = storeToRefs(StudentStore)
console.log(student_all.value)
const keep_id = props.id
const keep = student_all.value[keep_id-1]
console.log(keep)
StudentStore.setStudent(keep)
</script>
<template>
  <div v-if="student">
    <div id="nav">
      <router-link :to="{ name: 'student-detail', params: { id } }">Details</router-link> |
      <router-link :to="{ name: 'student-advisor', params: { id } }">Teacher</router-link> |
      <router-link :to="{ name: 'student-comment', params: { id } }">Comment</router-link>
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
