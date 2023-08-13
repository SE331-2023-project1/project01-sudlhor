<template>
    <div>
      <div v-for="(commentItem, index) in keepCommt_id" :key="index">
        <p>{{ commentItem.comment }}</p>
      </div>
      <div>
        <form @submit.prevent="addComment">
          <label for="name">Comment:</label>
          <input v-model="comment_input" type="text" id="name" required>
          <button type="submit" class="submit-btn">Add Comment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { commentStudent } from '@/stores/comment'
  import { commentStudentId } from '@/stores/comment_id'
  import { type studentInfo } from '@/student'
  import type { PropType } from 'vue'
  
  const props = defineProps({
      student: {
          type: Object as PropType<studentInfo>,
          require: true
      }
  })
  
  const comment_input = ref<string>('');
  const keep_comm = ref([]);
  const keepCommt_id = ref([]);
  const commentStudents = commentStudent();
  const commentStudent_Id = commentStudentId();
  const { comment } = storeToRefs(commentStudents);
  const { comment_id } = storeToRefs(commentStudent_Id);
  
  // Fetch comments when the component is created
  onMounted(() => {
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.id
    );
    commentStudent_Id.setComment(keep_comm.value);
    keepCommt_id.value = comment_id.value;
  });
  
  const addComment = () => {
    const formatComment = {
      id: props.student.id,
      comment: comment_input.value
    };
    commentStudents.pushComment(formatComment);
  
    // Update the filtered comments
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.id
    );
    commentStudent_Id.setComment(keep_comm.value);
  
    // Update keepCommt_id with the latest filtered comments
    keepCommt_id.value = comment_id.value;
  
    // Clear the input field
    comment_input.value = '';
  };
  </script>
  