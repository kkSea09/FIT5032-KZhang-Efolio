<template>
    <div id="app">
        <h1>Get All Book API</h1>
        <div>
            <p v-if="loading">Loading...</p>
            <p v-if="error" style="color:red">{{ error }}</p>
            <pre v-if="books && !loading && !error">{{ formatted }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const books = ref(null)
const loading = ref(false)
const error = ref(null)

const formatted = computed(() => {
    return books.value ? JSON.stringify(books.value, null, 2) : ''
})

const fetchAllBooks = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await axios.get('https://getallbooks-hzsx3vvsxq-uc.a.run.app');
        books.value = response.data
    } catch (e) {
        console.error('Error fetching all books:', e)
        error.value = e?.message || 'Failed to fetch books'
        books.value = null
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchAllBooks()
})
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
}
</style>
