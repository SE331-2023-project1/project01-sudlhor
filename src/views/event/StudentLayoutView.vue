<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useStudentAllStore } from '@/stores/all_student'
// const student = ref<studentInfo | null>(null)

const props = defineProps({
  id: String
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = useRouter()

const StudentStore = useStudentStore()
const studentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(studentStore_all)
const { student } = storeToRefs(StudentStore)
console.log(student_all.value)
const keep_id = Number(props.id)
const keep = student_all.value[keep_id-1]
console.log(keep)
StudentStore.setStudent(keep)
</script>
<template>
  <div v-if="student">
    <div id="nav" class="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-2 text-center text-lg">
      <router-link :to="{ name: 'student-detail', params: { id } }">Details</router-link> |
      <router-link :to="{ name: 'student-advisor', params: { id } }">Teacher</router-link> |
      <router-link :to="{ name: 'student-comment', params: { id } }">Comment</router-link>
    </div>
    <router-view :student="student"></router-view>
  </div>
</template>

