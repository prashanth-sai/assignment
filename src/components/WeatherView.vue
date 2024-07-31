<template>
  <div class="weather-app">
    <h1>Weather App</h1>
    <form @submit.prevent="fetchWeather">
      <input v-model="city" type="text" placeholder="Enter city name" required />
      <button class="weather-button" type="submit">Get Weather</button>
    </form>
     <button type="button" class="reset" @click="resetData">Reset</button>
    <div v-if="weatherData">
      <h2>Weather in {{ weatherData.name }}</h2>
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <p>Description: {{ weatherData.weather[0].description }}</p>
      <p>Humidity: {{ weatherData.main.humidity }}%</p>
      <p>Wind Speed: {{ weatherData.wind.speed }} m/s</p>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'WeatherView',
  setup() {
    const store = useStore();

    const city = computed({
      get: () => store.getters.city,
      set: (value) => store.dispatch('setCity', value)
    });

    const weatherData = computed(() => store.getters.weatherData);
    const error = computed(() => store.getters.error);

    const fetchWeather = () => {
      store.dispatch('fetchWeather');
    };

    const resetData = () => {
      store.dispatch('resetData');
    };

    return {
      city,
      weatherData,
      error,
      fetchWeather,
      resetData
    };
  }
};
</script>

<style scoped>
.weather-app {
  text-align: center;
  margin: 20px;
}

.weather-button {
  cursor: pointer;
}

.reset {
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
