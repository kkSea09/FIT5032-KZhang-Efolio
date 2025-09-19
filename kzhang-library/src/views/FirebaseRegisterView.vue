<template>
    <div class="register">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="register">Save to Firebase</button></p>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
import { db } from "@/firebase/init"
import { doc, setDoc } from "firebase/firestore"

const email = ref("")
const password = ref("")
const role = ref("")
const router = useRouter()
const auth = getAuth()

const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email.value,
            role: role.value || "user"
        })
        console.log("Firebase Register Successful!")
        router.push("/FireLogin")
    } catch (error) {
        console.log(error.code);
    }
};
</script>

<style>
.register {
    text-align: center;
}
</style>