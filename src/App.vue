<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'animate.css';

import Teachercard from './components/TeacherCard.vue'
import { onMounted } from 'vue';
import TeacherServices from "@/services/Teacherservice";
import { useTeacherAllStore } from "@/stores/all_teacher";
import StudentService from '@/services/StudentInfoServices'
import { useStudentAllStore } from '@/stores/all_student'
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
      <HelloWorld msg="SoodLor School" />
      <nav class="fixed-nav animate__animated animate__bounceInLeft">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/teacherlist">TeacherList</RouterLink>
      </nav>
  
  </header>
<br><br><br>
  <RouterView />
</template>

<style scoped>
#app{
  background-color: black;
}
body{
  background-color: black;
}
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

.fixed-nav router-link {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  margin: 0 auto; 
}

.nav-links RouterLink {
  margin: 0 1rem; 
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
nav a.router-link{
  font-size: 18px;

}
nav a.router-link-exact-active {
  color: white;
  font-size: 18px;

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1920px) {


  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
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


</style>
