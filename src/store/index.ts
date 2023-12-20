import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FirebaseAuth } from "@/components/firebase/Firebase";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import type { InjectionKey } from "vue";
import type { User } from "firebase/auth";

export interface RootState {
  user: {
    loggedIn: boolean;
    data: User | null;
  };
}

export const storeKey: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
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

export const useStore = () => {
  return baseUseStore(storeKey);
};
