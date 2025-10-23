<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input type="text" v-model="city" placeholder="Enter city name" class="search-input">
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>
    <main>
        <div class="weather-data" v-if="weatherData">
            <h2>
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon">
                <p> {{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<script setup>
// The info section in 10.1.1 provided detailed information about this package 
import { ref, computed, onMounted } from 'vue'
import axios from "axios";

const apikey = "40dcbf71041ed3a5f1f97eaee0ac15b5";

// Reactive data
const city = ref("");
const weatherData = ref(null);
const hourlyForecast = ref([]);
const dailyForecast = ref([]);

// Computed properties
// There are multiple way to obtain the data in Celsius format.
// Calculation by yourself like below after data is retireved or via API parameters
// Example of adding additional units requirement, if you choose this, remember to change section 3.1
// https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
const temperature = computed(() => {
    return weatherData.value
        ? Math.floor(weatherData.value.main.temp - 273)
        : null;
});

// Get the current weather icon using the API link
const iconUrl = computed(() => {
    return weatherData.value
        ? `https://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
        : null;
});

// Methods
// Async in a easy to understand way means the method will run in backend thread, 
// And it won't occupy the main thread, so the user experience is still smooth
const fetchCurrentLocationWeather = async () => {
    // The navigator.geolocation object is part of the Web API provided by modern web browsers
    // Please note this function is not belongs to Vue or openweather.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // API link to obtain the current weather based on the current location browser identified 
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            // await means wait for the fetchWeatherData method to complete before proceeding
            await fetchWeatherData(url);
        });
    }
};

const searchByCity = async () => {
    const cityName = city.value.trim()
    if (cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`;
        await fetchWeatherData(url);
    }
};

const fetchWeatherData = async (url) => {
    try {
        const response = await axios.get(url);
        // Returned data from API is stored as JSON file in weatherData
        weatherData.value = response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Lifecycle hooks
// There are two steps involved in this, 
// step 1: identify current location 
// step 2: after identify, get the weather data straight based on the current location.
onMounted(() => {
    fetchCurrentLocationWeather();
});
</script>
<style scoped>
.weather-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
}

.search-bar {
    display: flex;
    gap: 10px;
    margin: 20px 0;
}

.search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    min-width: 200px;
}

.search-button {
    padding: 10px 20px;
    background-color: #7db2ea;
    color: rgb(224, 134, 134);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.search-button:hover {
    background-color: #0056b3;
}
</style>
