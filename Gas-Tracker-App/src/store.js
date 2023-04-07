// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedIn: false,
    managerLoggedIn: false,
    userName: '',
  },
  mutations: {
    setUser(state, { role, username }) {
      state.loggedIn = true;
      state.userName = username;
      if (role == 'Manager') {
        state.managerLoggedIn = true;
      }
      console.log(state);
    },
    logout(state) {
      state.loggedIn = false;
      state.managerLoggedIn = false;
      state.userName = '';
    },
  },
});

export default store;
