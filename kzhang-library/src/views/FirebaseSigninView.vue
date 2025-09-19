<template>
    <div class="sign-in">
        <h1>Sign in</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="signin">Sign in via Firebase</button></p>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
import { useAuth } from "@/stores/useAuth"
import { db } from "@/firebase/init"
import { doc, getDoc, setDoc } from "firebase/firestore"


const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const { setUserFromFirebase } = useAuth()

const signin = async () => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email.value, password.value)
        const snap = await getDoc(doc(db, "users", user.uid))
        const role = snap.exists() ? (snap.data().role || "user") : "user"
        setUserFromFirebase({ uid: user.uid, email: user.email, role })
        console.log("Firebase Sign in Successful!")
        console.log(auth.currentUser)
        router.push("/")
    } catch (error) {
        console.log(error.code)
    }
}
</script>

<style>
.sign-in {
    text-align: center;
}
</style>