import { createApp } from 'vue'
import App from './App.vue'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import { Theme } from '@primevue/themes';
import router from './router';
import { useAuth } from '@/stores/useAuth'

// firebase
import './firebase/init'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

const auth = useAuth()
auth.loadAuth()

app.use(router)
app.mount('#app')