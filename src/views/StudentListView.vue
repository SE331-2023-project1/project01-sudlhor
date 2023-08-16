<template class="background">
  <div>
    <div class="lnw">
      <h1 class="animate__animated animate__bounceInLeft">STUDENT LIST</h1>
      <br>
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
        <form @submit.prevent="addStudent" class="form-s">
          <input v-model="newStudentName" placeholder="Student Name" />
          <input v-model="newStudentSurname" placeholder="Student Surname" />
          <input v-model="newStudentImage" placeholder="Student Image URL" />
          <input v-model="newStudentTeacher" type="number" placeholder="Teacher ID" />
          <button type="submit" :disabled="!isFormValid">Add Student</button>
        </form>
      </main>
    </div><br>
    
  </div>
</template>

<script setup lang="ts">
import 'animate.css';
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student'
import { ref , computed, type Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'
import 'animate.css';
import { useStudentAllStore } from '@/stores/all_student'
import { storeToRefs } from 'pinia';
import { useMessageStore} from '@/stores/message'
import NProgress from 'nprogress'
import StudentInfoServices from '@/services/StudentInfoServices';
import type { AxiosResponse } from "axios";
const router = useRouter()

const store = useMessageStore()
const studentStore_all = useStudentAllStore();
const { student_all } = storeToRefs(studentStore_all);
const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)
const newStudentName = ref('');
const newStudentSurname = ref('');
const newStudentImage = ref('');
const newStudentTeacher = ref(0);
import { onBeforeRouteUpdate } from 'vue-router';
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
      teacher_id : newStudentTeacher.value,
      course_list: [],
      student_id: student_all.value.length + 1,
      comment: []
      
    // name: string
    // surname: string
    // image: string
    // course_list: Course[]
    // teacher_id: number
    // comment: Comment[]
    // student_id: number
    };
    store.updateMessage('New student has been added')
    setTimeout(() => {
      store.resetMessage()
    }, 2000)

    studentStore_all.pushNewStudent(newStudent);

    newStudentName.value = '';
    newStudentSurname.value = '';
    newStudentImage.value = '';
    newStudentTeacher.value = 0
    }
}


const displayedStudents = computed(() => {
  const startIndex = (props.page - 1) * 3;
  const endIndex = startIndex + 3;
  return student_all.value.slice(startIndex, endIndex);
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(student_all.value.length / 3);
  return props.page < totalPages;
});

onBeforeRouteLeave((to, from, next) => {
  if (isFormValid.value) {
    addStudent();
  }
  next();
});

NProgress
StudentInfoServices.getStudent().then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  totalStudent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' });
// }).finally(() => {
//   NProgress.done()
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // NProgress.start()
  StudentInfoServices.getStudent().then((response: AxiosResponse<studentInfo[]>) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
  next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  // }).finally(() => {
  //   NProgress.done()
  })
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
  margin-left:90px ;
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

input{
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
button {
  background-color: #4679d1;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  border-radius: 10px;
}
.form-s{
  position: fixed;
  margin-top: 29%;

}

/* Media query for screens smaller than 768px */
@media (max-width: 820px) {
  .lnw {
    text-align: center; /* Center the title when the screen is smaller */
  }

  .student-card-container {
    flex-wrap: wrap; /* Allow cards to wrap on smaller screens */

  }

  .form-d {
    position: relative; /* Reset position */
  }
  input{
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
button {
  background-color: #4679d1;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  border-radius: 10px;
}
  
}

</style>