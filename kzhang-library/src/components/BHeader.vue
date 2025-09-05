<template>
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" aria-current="page">
                        Home (Week 5)
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/about" class="nav-link" active-class="active">About</router-link>
                </li>


                <li v-if="!isAuthenticated">
                    <router-link to="/login" class="nav-link" active-class="active">Log in</router-link>
                </li>


                <li v-else>
                    <button @click="handleLogout" class="nav-link btn btn-link">Log out</button>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>
import { useAuth } from '@/stores/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
    logout()
    router.push('/login')
}
</script>