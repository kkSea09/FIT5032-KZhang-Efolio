<template>
    <div id="app">
        <pre>{{ jsondata }}</pre>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'


const jsondata = ref(null);
const error = ref(null);

async function getBookCountAPI() {
    try {
        const response = await axios.get('https://countbooks-hzsx3vvsxq-uc.a.run.app');
        jsondata.value = response.data;
        error.value = null;
    } catch (err) {
        console.error('Error fetching book count:', err);
        error.value = err.message;
        jsondata.value = null;
    }
}

onMounted(() => {
    getBookCountAPI();
})
</script>