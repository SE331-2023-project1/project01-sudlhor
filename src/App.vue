<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'animate.css';

import Teachercard from './components/TeacherCard.vue'
import { onMounted } from 'vue';
import TeacherServices from "@/services/Teacherservice";
import { useTeacherAllStore } from "@/stores/all_teacher";
import StudentService from '@/services/StudentInfoServices'
import { useStudentAllStore } from '@/stores/all_student'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore()
const { message } = storeToRefs(store)
const studentStore_all = useStudentAllStore();
const teacherStoreAll = useTeacherAllStore();

onMounted(async () => {
  try {
    const response = await TeacherServices.getTeacher();
    teacherStoreAll.setTeacherArray(response.data);
  } catch (error) {
    console.error(error);
  }
})

onMounted(async () => {
  try {
    const response = await StudentService.getStudent();
    studentStore_all.setStudentArray(response.data);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <header>
    <div>
    <div id="flashMessage" v-if="message">
      <h4> {{ message }} </h4>
    </div>
      <HelloWorld msg="SoodLor School" />
      <nav class="fixed-nav animate__animated animate__bounceInLeft text-green">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/teacherlist">TeacherList</RouterLink>
      </nav>
    </div>
  </header>
<br><br><br>
  <RouterView />
</template>

<style scoped>
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent; /* Adjust the background color as needed */
  padding: 10px 0; /* Add some padding to the navigation */
  text-align: center;
  color: white;
  font-size:35px;
}


header {
  line-height: 1.5;
  max-height: 1vh;
  text-align: center;
  display: flex;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@keyframes yellowfade {
  from {
    background: blue;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 5s ease-in-out;
}

@media (min-width: 1920px) {


  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
    display: flex;
  justify-content: center;
  }
}

@keyframes yellowfade {
  from {
    background: rgb(213, 239, 80);

  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
}

h4{
  font-size: large;
  color: antiquewhite;
}
</style>
