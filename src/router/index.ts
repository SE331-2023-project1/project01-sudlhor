import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentDetailView from '../views/event/StudentDetailView.vue'
import StudentLayoutView from '../views/event/StudentLayoutView.vue'
import StudentCommentView from '@/views/event/StudentCommentView.vue'
import StudentAdvisorView from '@/views/event/StudentAdvisorView.vue'
import { useStudentStore } from '@/stores/student'
import { ref } from 'vue'
import Teacherlistview from '@/views/Teacherlistview.vue'
import TeacherDetail from '@/views/TeacherDetail.vue'
import { storeToRefs } from 'pinia'
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import NProgress from 'nprogress'
import { useStudentAllStore } from '@/stores/all_student'
import type { commmentInfo } from '@/comment'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StudentListView',
      component: StudentListView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/teacherlist',
      name: 'teacher',
      component: Teacherlistview
    },
    {
      path: '/teacher/:id',
      name: 'teacher-detail',
      component: TeacherDetail,
      props: true
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const StudentStore = useStudentStore()
        const studentStore_all = useStudentAllStore();
        const { student_all} = storeToRefs(studentStore_all);
        console.log(student_all.value)
        const keep = student_all.value[id-1]
        console.log(keep)
        StudentStore.setStudent(keep)
        const keep_comm = ref<commmentInfo[]>([]);
        const commentStudents = commentStudent()
        const commentStudent_Id = commentStudentId()
        const { comment } = storeToRefs(commentStudents)
        keep_comm.value = comment.value.filter((commentItem) => id === commentItem.id);
        console.log('Filtered comments:', keep_comm.value)
        commentStudent_Id.setComment(keep_comm.value);
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },
        {
          path: '',
          name: 'student-comment',
          component: StudentCommentView,
          props: true
        },
        {
          path: '',
          name: 'student-advisor',
          component: StudentAdvisorView,
          props: true
        }
      ]
    }
  ]
})

router.beforeEach(()=>{
  NProgress.start()
})

router.afterEach(()=>{
  NProgress.done()
})

export default router
