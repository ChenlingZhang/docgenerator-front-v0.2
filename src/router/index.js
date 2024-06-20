import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { compile } from 'vue-template-compiler'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/HomeView.vue'),
    children:[
      {
        path: 'generated_doc',
        components: {table: ()=> import('@/components/view_components/DocumentTableView.vue')}
      },
      {
        path:'general_template',
        components: {
          table: ()=>import('@/components/view_components/GeneralTemplateView.vue')
        }
      }
    ]
  },

  {
    path:'/doc_view',
    component: () => import('@/components/office/DocViewComponent.vue')
  },
  {
    path:'/edit_doc',
    component: ()=> import('@/components/office/DocEditComponent.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
