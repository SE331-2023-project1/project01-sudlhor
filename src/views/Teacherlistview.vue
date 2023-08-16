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
    <h1 style="text-align: left ; color: aliceblue; margin-top: 10px; margin-left: 20px; position: fixed;" class="text-xl	">Add Teacher Here :  </h1>
    <form @submit.prevent="addTeacher" style="position: fixed; margin-top: 50px; margin-left: 0.1%;">
      <input v-model="newTeacherName" placeholder="Teacher Name" />
      <input v-model="newTeacherSurname" placeholder="Teacher Surname" />
      <input v-model="newTaacherImage" placeholder="Teacher Image URL" />
      <button type="submit" :disabled="!isFormValid" class="rounded-full bg-green-300	mx-3	p-2">Add Teacher</button>
    </form>
  </div>
  
</template>

<script lang="ts" setup>
import TeacherCard from "@/components/TeacherCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, computed } from "vue";
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";
import { useMessageStore} from '@/stores/message'
const store = useMessageStore()

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
    
    store.updateMessage('New Teacher has been added')
    setTimeout(() => {
      store.resetMessage()
    }, 2000)
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
  gap: 5px;
  margin-top: 15px;
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

input{
  padding: 10px;
  border-radius: 10px;
  margin-left: 50px;
}

</style>

