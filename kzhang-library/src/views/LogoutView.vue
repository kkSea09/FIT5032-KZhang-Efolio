<template>
    <div style="text-align:center; margin-top:40px;">
        <h2>Logout</h2>
        <p>Check console for current user state.</p>
        <div style="margin-top:16px;">
            <button @click="doLogout">Sign out</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/useAuth'

const router = useRouter()
const { currentUser, logout } = useAuth()

onMounted(() => {
    console.log('currentUserState:', {
        uid: currentUser.value?.uid,
        email: currentUser.value?.email,
        role: currentUser.value?.role
    })
})

const doLogout = () => {
    logout()
    router.push('/FireLogin')
}
</script>