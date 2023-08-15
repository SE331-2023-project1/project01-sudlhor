<template>
    <div>
      <div v-for="(commentItem, index) in keepCommt_id" :key="index" style="background-color: aliceblue; padding: 10px; border-radius: 15px; margin: 15px; text-align: center;" class="animate__animated animate__rubberBand">
        <p>{{ commentItem.comment }}</p>
      </div>
      <div>
        <form @submit.prevent="addComment" style="margin-top: 10px;">
          <label for="name" style="color: aliceblue; margin-right: 10px;">Comment:</label>
          <input v-model="comment_input" type="text" id="name" required>
          <button type="submit" class="submit-btn">Add Comment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { commentStudent } from '@/stores/comment';
  import { commentStudentId } from '@/stores/comment_id';
  import type { commmentInfo } from '@/comment'
  import { type studentInfo } from '@/student';
  import type { PropType } from 'vue';
  import 'animate.css';

  
  const props = defineProps({
    student: {
      type: Object as PropType<studentInfo>,
      required: true,
    },
  });
  
  const comment_input = ref<string>('');
  const keep_comm = ref<commmentInfo[]>([]);
  const keepCommt_id = ref<commmentInfo[]>([]);
  const commentStudents = commentStudent();
  const commentStudent_Id = commentStudentId();
  const { comment } = storeToRefs(commentStudents);
  const { comment_id } = storeToRefs(commentStudent_Id);
  
  // Fetch comments when the component is created
  onMounted(() => {
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.student_id // Fix this line
    );
    commentStudent_Id.setComment(keep_comm.value);
    keepCommt_id.value = comment_id.value;
  });
  
  const addComment = () => {
    const formatComment = {
    id:0,
      student_id: props.student.id,
      comment: comment_input.value,
    };
    commentStudents.pushComment(formatComment);
  
    // Update the filtered comments
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.student_id // Fix this line
    );
    commentStudent_Id.setComment(keep_comm.value);
  
    // Update keepCommt_id with the latest filtered comments
    keepCommt_id.value = comment_id.value;
  
    // Clear the input field
    comment_input.value = '';
  };
  </script>

<style scoped>
input{
    padding: 10px;
    border-radius: 10px;
    margin-right: 10px;
}
.comment-view {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.comments {
  text-align: center;
}

.comment-box {
  width: 200px; /* Set the desired width */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  
}


.comment-form {
  margin-top: 20px;
}

button {
  background-color: #4CAF50; /* Green */
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




