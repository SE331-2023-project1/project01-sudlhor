<template class="background">
  <div>
    <div class="mt-20">
      <h1 class="animate__animated animate__bounceInLeft text-xl text-white	text-center	 ">STUDENT LIST</h1>
      <br>
      <main class="flex flex-col items-center">
        <div class="flex flex-nowrap justify-center overflow-x-auto gap-4 mb-4 ml-12">
          <StudentCard
            v-for="student in displayedStudents"
            :key="student.id"
            :student="student"
            class="mb-4"
          ></StudentCard>
        </div>
        <div class="w-290 flex justify-center items-center w-full mt-3 text-white">
          <RouterLink
            :to="{ name: 'StudentListView', query: { page: page - 1 } }"
            rel="prev"
            v-if="page !== 1"
            id="page-prev"
            class="text-left mr-auto text-3xl"          >
            Prev Page
          </RouterLink>
          <RouterLink
            :to="{ name: 'StudentListView', query: { page: page + 1 } }"
            rel="next"
            v-if="hasNextPage"
            id="page-next"
            class="text-right ml-auto text-blue text-3xl text-white" 
          >
            Next Page
          </RouterLink>
        </div>
        <!-- Student form -->
        <form @submit.prevent="addStudent" class="form-s text-black-300">
          <input class="p-2 rounded-10 " v-model="newStudentName" placeholder="Student Name" />
          <input class="p-2 rounded-10 " v-model="newStudentSurname" placeholder="Student Surname" />
          <input class="p-2 rounded-10 " v-model="newStudentImage" placeholder="Student Image URL" />
          <input class="p-2 rounded-10 mr-5" v-model="newStudentTeacher" type="number" placeholder="Teacher ID" />
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md" :disabled="!isFormValid">Add Student</button>
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
