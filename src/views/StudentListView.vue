<template class="background">
  <div>
  <div class="lnw">
    <h1 class="animate__animated animate__bounceInLeft">STUDENT LIST</h1>
    <main class="flex flex-col items-center">
      <div class="student-card-container">
        
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          class="mb-4"
        ></StudentCard>
      </div>
      <div class="flex w-290 pagination mt-4">
        <RouterLink
          :to="{ name: 'StudentListView', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="text-left mr-auto"
          style="color: aliceblue; font-size: 20px;" 
          
        >
          Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'StudentListView', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
          class="text-right ml-auto " 
          style="color: aliceblue; font-size: 20px;" 

        >
          Next Page
        </RouterLink>
      </div>
    </main>
  </div>
  </div>
</template>


<script setup lang="ts">
import 'animate.css';
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student'
import { ref , computed, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { onBeforeRouteUpdate } from 'vue-router'
import StudentService from '@/services/StudentInfoServices'
import 'animate.css';

const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const router = useRouter()
StudentService.getStudent(3, props.page).then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  console.log(students.value)
  totalStudent.value = response.headers['x-total-count']
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  StudentService.getStudent(3, toPage).then((response: AxiosResponse<studentInfo[]>) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
    next()
  })
})

const hasNextPage = computed(() => {
  // first calculate the total page
  const totalPages = Math.ceil(totalStudent.value / 3)
  return props.page.valueOf() < totalPages
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: aliceblue;
}
.pagination a.RouterLink {
  color: #ffffff;
}
.student-card-container {
  display: flex;
  flex-wrap: nowrap; 
  justify-content: center;
  overflow-x: auto;
  gap: 1rem;
  margin-bottom: 1rem; 
}

.student-card {
  flex: 0 0 auto; /* Prevent cards from stretching */
  min-width: 300px;
  /* ... your existing card styles ... */
}

.lnw {
  margin-top: 20px;
}
.pagination {
  display: flex;
  justify-content: center; /* Center the pagination links horizontally */
  align-items: center; /* Center the pagination links vertically */
  width: 100%; /* Adjust as needed */
  margin-top: 20px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  text-align: center; /* Center the text inside each link */
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
.background{
  background-color: black;
}
</style>