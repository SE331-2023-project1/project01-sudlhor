<script setup lang="ts">
   import type { studentInfo } from '@/student'
   import type { PropType } from 'vue'
   import 'animate.css';

   const props = defineProps({
       student: {
           type: Object as PropType<studentInfo>,
           require: true    
       }
   })
   </script>
   

   <template>
    <RouterLink class="student-link" :to="{name: 'student-detail', params:{id: student?.id}}">
        <div class=" animate__animated animate__fadeInLeft student-class">
      <div class="student-card ">
        <h2>Name: {{ props.student?.name }}</h2>
        <h2>Surname: {{ props.student?.surname }}</h2> 
        <img :src="props.student.image" class="image animate__backInDown" />
      </div>
      </div>
      </RouterLink>
    </template>
    
    <style scoped>
    .student-card {
      padding: 20px;
      width: 250px;
      cursor: pointer;
      border: 5px solid #ffffff;
      margin-bottom: 18px;
      margin-top: 18px;
      border-radius: 15px;

    }
    h2{
        color: aliceblue;
    }
    .student-card:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 12px 0 rgba(86, 18, 18, 0.2);
    }
    
    .student-link{
      color: #2c3e50;
      text-decoration: none;
    }
    
    .image{
    width: 200px;
    height: 150px;
    align-items: center;
    margin-top: 10%;
    border-radius: 10px;
        
}

    </style>
    