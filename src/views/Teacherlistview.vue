<!-- eslint-disable vue/multi-word-component-names -->
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
    <h1 style="text-align: center ; color: aliceblue;">Add Teacher Here :  </h1>
    <form @submit.prevent="addTeacher">
      <input v-model="newTeacherName" placeholder="Teacher Name" />
      <input v-model="newTeacherSurname" placeholder="Teacher Surname" />
      <input v-model="newTaacherImage" placeholder="Teacher Image URL" />
      <button type="submit" :disabled="!isFormValid">Add Teacher</button>
    </form>
  </div>
  
</template>

<script lang="ts" setup>
import TeacherCard from "@/components/TeacherCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, computed } from "vue";
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);
  
const newTeacherName = ref("");
const newTeacherSurname = ref("");
const newTaacherImage = ref("");

const isFormValid = computed(
  () =>
    newTeacherName.value.trim() !== "" &&
    newTeacherSurname.value.trim() !== "" &&
    newTaacherImage.value.trim() !== ""
);

const addTeacher = () => {
  if (isFormValid.value) {
    const newTeacher = {
      id: teacher_all.value.length + 1,
      teacher_name: newTeacherName.value,
      teacher_surname: newTeacherSurname.value,
      taacher_img: newTaacherImage.value,
      teacher_age: '',
      teacher_gender: '',
      teacher_position: '',
      teacher_graduated: '',
      teacher_email: '',
      teacher_phone: ''
    };
    teacherStoreAll.pushNewTeacher(newTeacher);
    newTeacherName.value = "";
    newTeacherSurname.value = "";
    newTaacherImage.value = "";
  }
};

</script>

<style>
.student {
  text-align: center;
}

.student-card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 30%;
  gap: 5px;
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

img {
  border-radius: 15px;
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
</style>

