import { ref } from 'vue';
const AUTH_KEY = "my-auth";

const isAuthenticated = ref(false);
const currentUser = ref(null);


function loadAuth() {
    try {
        const raw = localStorage.getItem(AUTH_KEY)
        if (raw) {
            const obj = JSON.parse(raw)
            isAuthenticated.value = !!obj.isAuthenticated
            currentUser.value = obj.currentUser || null
        }
    } catch (e) {
        console.error('Error loading auth:', e)
    }
}


const VALID_CREDENTIALS = { username: 'admin', password: '12345@' }

function login(username, password) {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        isAuthenticated.value = true
        currentUser.value = { username }
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            isAuthenticated: true,
            currentUser: currentUser.value
        }))
        return true
    }
    else {
        return false
    }
}

function logout() {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem(AUTH_KEY)
}

export function useAuth() {
    return {
        isAuthenticated,
        currentUser,
        login,
        logout,
        loadAuth
    }
}

