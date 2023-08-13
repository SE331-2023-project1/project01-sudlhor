import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentDetailView from '../views/event/StudentDetailView.vue'
import StudentLayoutView from '../views/event/StudentLayoutView.vue'
import StudentService from '@/services/StudentInfoServices'
import StudentCommentView from '@/views/event/StudentCommentView.vue'
import StudentAdvisorView from '@/views/event/StudentAdvisorView.vue'
import { useStudentStore } from '@/stores/student'



import HomeView from '../views/HomeView.vue'
import Teacherlistview from '@/views/Teacherlistview.vue'
import TeacherDetail from '@/views/TeacherDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StudentListView',
      component: StudentListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1' )})
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
      props:true
    },
    {

      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayoutView, 
      props: true,
        beforeEnter: (to) => {
          const id: number = parseInt(to.params.id as string)
          const StudentStore = useStudentStore()
          return StudentService.getStudentById(id)
          .then((response) => {
            // need to set up the data for the component
            StudentStore.setStudent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404){
              return{
                name: '404-resource',
                params: { resource: 'event'}
              }
            }else{
              return { name: 'network-error'}
            }
          })
        },
      children:[
        {
          path:'',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },
        {
          path:'',
          name: 'student-comment',
          component: StudentCommentView,
          props: true
        },
        {
          path:'',
          name: 'student-advisor',
          component: StudentAdvisorView,
          props: true
        }
      ]
    }, 
    

  ]
})

export default router
