<template>
  <div class="about">
    <h1>Dashboard</h1>
    <p>Welcome!</p>

    <div v-if="role === 'admin'" style="border:1px solid #aaa; padding:12px; margin-top:12px;">
      <h3>Admin Area</h3>
      <p>Only admins can see this block.</p>
    </div>

    <div v-else-if="role === 'user'" style="border:1px solid #aaa; padding:12px; margin-top:12px;">
      <h3>User Area</h3>
      <p>Standard user content.</p>
    </div>

    <div v-else style="margin-top:12px;">
      <p>No role assigned.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/stores/useAuth'

const { currentUser } = useAuth()
const role = computed(() => currentUser.value?.role || null)
</script>

<style>
.about {
  text-align: center;
}
</style>