<template>
  <div class="student">
    <div class="student-card-container">
      <TeacherCard
        v-for="teacher in teachers"
        :key="teacher.id"
        :teacher="teacher"
        class="student-card"
      ></TeacherCard>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
import TeacherCard from "@/components/TeacherCard.vue";
import type { TeacherInfo } from "@/teacher";
import { ref, type Ref } from "vue";
import TeacherServices from "@/services/Teacherservice";

const teachers: Ref<Array<TeacherInfo>> = ref([]);

  TeacherServices.getTeacher().then((response) => {
  teachers.value = response.data;
  console.log(teachers.value)
});

</script>

<style>
.student {
  text-align: center;
}

.student-card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 1rem;
  gap:5px ;
}

.student-card {
  flex: 0 0 auto;
  min-width: 300px;
  margin-right: 1rem;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

img{
  border-radius: 15px;
}
</style>