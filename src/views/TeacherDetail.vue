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
    <div class="mb-90% flex items-center justify-start " v-if="teacher">
        <div class="teacher-details">
          <div class="teacher-image">
            <img :src="teacher.taacher_img" class="image w-2/5	h-2/5" />
        </div>
            <h1 class="text-white text-3xl"> {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h1>
            <h3 class="text-white text-xl">{{ teacher?.teacher_gender }} {{ teacher?.teacher_age }} </h3>
            <h3 class="text-white text-xl">{{ teacher?.teacher_graduated }}</h3>
            <h3 class="text-white text-xl">{{ teacher?.teacher_position }}</h3>
            <h3 class="text-white text-xl">{{ teacher?.teacher_email }}</h3>
            <h3 class="text-white text-xl">{{ teacher?.teacher_phone }}</h3>
            
            
        </div>
    </div>
</template>
