<template>
    <div id="app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>


<script setup>
import axios from 'axios'
import { ref } from 'vue'

const count = ref(null);
const error = ref(null);

async function getBookCount() {
    try {
        const response = await axios.get('https://countbooks-hzsx3vvsxq-uc.a.run.app');
        count.value = response.data.count;
        error.value = null;
    } catch (err) {
        console.error('Error fetching book count:', err);
        error.value = err.message;
        count.value = null;
    }
}
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