<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="col-md-6 offset-md-3">
                    <div class="card-header text-center">
                        <h1>Log in</h1>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" v-model="loginForm.username"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="loginForm.password"
                                    required />
                            </div>
                            <div v-if="errorMessage" class="alert alert-danger">
                                {{ errorMessage }}
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/useAuth'

const loginForm = reactive({
    username: '',
    password: ''
})

const errorMessage = ref('')

const auth = useAuth()
const router = useRouter()

const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
        const success = auth.login(loginForm.username, loginForm.password)
        if (success) {
            // Check if there is a redirect path
            const redirectPath = router.currentRoute.value.query.redirect || '/'
            router.push(redirectPath)
        } else {
            errorMessage.value = 'Invalid username or password'
        }
    } else {
        errorMessage.value = 'Please enter both username and password'
    }
}
</script>


<style scoped>
.container {
    margin-top: 2rem;
}

.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.form-control:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.alert {
    margin-bottom: 1rem;
}
</style>