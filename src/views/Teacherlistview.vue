<template> 
  <div class="student">
    <TeacherCard
      v-for="teacher in teachers"
      :key="teacher.id"
      :teacher="teacher"  
    ></TeacherCard>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
.h1{
  border-left: 10px;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
