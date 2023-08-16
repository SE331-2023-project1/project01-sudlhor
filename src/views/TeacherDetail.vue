<script setup lang="ts">
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";
const props = defineProps({
    id: String
})

const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);
  
console.log(teacher_all.value)
const keep_id = Number(props.id)
const teacher = teacher_all.value[keep_id-1]
console.log(teacher)




</script>
<template>
    <br><br><br>
    <div class="teacher-info" v-if="teacher">
        
        <div class="teacher-details">
          <div class="teacher-image">
            <img :src="teacher.taacher_img" class="image w-4/5	h-4/5" />
        </div>
            <h1> {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h1>
            <h3>{{ teacher?.teacher_gender }} {{ teacher?.teacher_age }} </h3>
            <h3>{{ teacher?.teacher_graduated }}</h3>
            <h3>{{ teacher?.teacher_position }}</h3>
            <h3>{{ teacher?.teacher_email }}</h3>
            <h3>{{ teacher?.teacher_phone }}</h3>
            
            
        </div>
    </div>
</template>
<style scoped>
.teacher-info {
  margin-left: 50%;
  margin-bottom: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.teacher-image {
  bottom: 0;
}


.teacher-details {
  text-align: left;
}

h1,h3{
    color: aliceblue;
}
</style>
