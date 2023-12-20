import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { FirebaseAuth } from "@/components/firebase/Firebase";
import { createStore } from "vuex";

export const authStore = createStore<{
  user: {
    loggedIn: boolean;
    data: User | null;
  };
}>({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value: boolean) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data: User | null) {
      state.user.data = data;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    async logOut(context) {
      await signOut(FirebaseAuth);
      context.commit("SET_USER", null);
    },

    async logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(FirebaseAuth, provider);
      console.log(res);
    },
  },
});
