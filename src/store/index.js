import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    city: '',
    weatherData: null,
    error: ''
  },
  mutations: {
    SET_CITY(state, city) {
      state.city = city;
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    RESET_DATA(state) {
      state.city = '';
      state.weatherData = null;
      state.error = '';
    }
  },
  actions: {
    async fetchWeather({ commit, state }) {
      commit('SET_ERROR', '');
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: state.city,
            appid: 'a76fef4365de6a2adad5e06289de236e',
            units: 'metric'
          }
        });
        commit('SET_WEATHER_DATA', response.data);
      } catch (err) {
        commit('SET_ERROR', 'Failed to fetch weather data. Please try again.');
      }
    },
    setCity({ commit }, city) {
      commit('SET_CITY', city);
    },
    resetData({ commit }) {
      commit('RESET_DATA');
    }
  },
  getters: {
    city: state => state.city,
    weatherData: state => state.weatherData,
    error: state => state.error
  }
});
