<template>
  <div class="student">
    <div class="student-card-container">
      <TeacherCard
        v-for="teacher in teacher_all"
        :key="teacher.id"
        :teacher="teacher"
        class="student-card"
      ></TeacherCard>
    </div>
    <!-- Teacher form -->
    <form @submit.prevent="addTeacher">
      <input v-model="newTeacherName" placeholder="Teacher Name" />
      <input v-model="newTeacherSurname" placeholder="Teacher Surname" />
      <input v-model="newTeacherImage" placeholder="Teacher Image URL" />
      <button type="submit" :disabled="!isFormValid">Add Teacher</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import TeacherCard from "@/components/TeacherCard.vue";
import type { TeacherInfo } from "@/teacher";
import TeacherServices from "@/services/Teacherservice";
import { ref, computed, onMounted } from "vue";
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);

const newTeacherName = ref("");
const newTeacherSurname = ref("");
const newTeacherImage = ref("");

const isFormValid = computed(
  () =>
    newTeacherName.value.trim() !== "" &&
    newTeacherSurname.value.trim() !== "" &&
    newTeacherImage.value.trim() !== ""
);

const addTeacher = () => {
  if (isFormValid.value) {
    const newTeacher = {
      id: teacher_all.value.length + 1,
      teacher_name: newTeacherName.value,
      teacher_surname: newTeacherSurname.value,
      taacher_img: newTeacherImage.value,
    };
    teacherStoreAll.pushNewTeacher(newTeacher);
    newTeacherName.value = "";
    newTeacherSurname.value = "";
    newTeacherImage.value = "";
  }
};

const teachers = ref([]);

// Fetch teachers and populate the store on component mount
// onMounted(async () => {
//   try {
//     const response = await TeacherServices.getTeacher();
//     teacherStoreAll.setTeacherArray(response.data);
//     console.log(teacher_all.value);
//     teachers.value = teacher_all.value
//     console.log(teachers.value)
//   } catch (error) {
//     console.error(error);
//   }
// });
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