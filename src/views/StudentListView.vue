<template class="background">
  <div>
    <div class="lnw">
      <h1 class="animate__animated animate__bounceInLeft">STUDENT LIST</h1>
      <main class="flex flex-col items-center">
        <div class="student-card-container">
          <StudentCard
            v-for="student in displayedStudents"
            :key="student.id"
            :student="student"
            class="mb-4"
          ></StudentCard>
        </div>
        <div class="flex w-290 pagination mt-4">
          <RouterLink
            :to="{ name: 'StudentListView', query: { page: page - 1 } }"
            rel="prev"
            v-if="page !== 1"
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
        <!-- Student form -->
        <form @submit.prevent="addStudent">
          <input v-model="newStudentName" placeholder="Student Name" />
          <input v-model="newStudentSurname" placeholder="Student Surname" />
          <input v-model="newStudentImage" placeholder="Student Image URL" />
          <button type="submit" :disabled="!isFormValid">Add Student</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'animate.css';
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student'
import { ref , computed, type Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { onBeforeRouteLeave } from 'vue-router'
import StudentService from '@/services/StudentInfoServices'
import 'animate.css';
import { useStudentAllStore } from '@/stores/all_student'
import { storeToRefs } from 'pinia';
const studentStore_all = useStudentAllStore();
const { student_all} = storeToRefs(studentStore_all);
const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)
const newStudentName = ref('');
const newStudentSurname = ref('');
const newStudentImage = ref('');
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const isFormValid = computed(() =>
  newStudentName.value.trim() !== '' &&
  newStudentSurname.value.trim() !== '' &&
  newStudentImage.value.trim() !== ''
);

const addStudent = () => {
  if (isFormValid.value) {
    const newStudent = {
      id: student_all.value.length + 1,
      name: newStudentName.value,
      surname: newStudentSurname.value,
      image: newStudentImage.value,
    };

    studentStore_all.pushNewStudent(newStudent);

    newStudentName.value = '';
    newStudentSurname.value = '';
    newStudentImage.value = '';
  }
}

const router = useRouter()

// Fetch data and store it in student_all store
// onMounted(async () => {
//   try {
//     const response = await StudentService.getStudent();
//     studentStore_all.setStudentArray(response.data);
//     totalStudent.value = response.data.length;
//   } catch (error) {
//     console.error(error);
//   }
// });

// Use stored data for pagination
const displayedStudents = computed(() => {
  const startIndex = (props.page - 1) * 3;
  const endIndex = startIndex + 3;
  return student_all.value.slice(startIndex, endIndex);
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(student_all.value.length / 3);
  return props.page < totalPages;
});

// Store new students before leaving the page
onBeforeRouteLeave((to, from, next) => {
  if (isFormValid.value) {
    addStudent();
  }
  next();
});
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
  flex: 0 0 auto;
  min-width: 300px;
}

.lnw {
  margin-top: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%; 
  margin-top: 20px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  text-align: center; 
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