import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Edit from '../views/Edit.vue'
import axios from 'axios'

function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    console.log(req)

    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res)
      next()
    }).catch(err => {
      console.log(err.response)
      next("/login")
    })
  }else{
    next("/login")
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: Edit,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
