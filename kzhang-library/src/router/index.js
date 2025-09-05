import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/stores/useAuth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/:pathMatch(.*).*', redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useAuth()
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})



export default router