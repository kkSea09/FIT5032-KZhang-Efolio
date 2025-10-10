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
                <!-- Firebase login -->
                <li class="nav-item">
                    <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
                </li>
                <!-- Firebase Register -->
                <li class="nav-item">
                    <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase
                        Register</router-link>
                </li>


                <li v-if="!isAuthenticated">
                    <router-link to="/login" class="nav-link" active-class="active">Log in</router-link>
                </li>
                <li v-else>
                    <button @click="handleLogout" class="nav-link btn btn-link">Log out</button>
                </li>
                <li class="nav-item">
                    <router-link to="/addBook" class="nav-link" active-class="active">Add Book</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book
                        API</router-link>
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

<style></style>