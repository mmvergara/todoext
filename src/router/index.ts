import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AuthView.vue"),
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ProjectView.vue"),
    },

    {
      path: "/project/:id/settings",
      name: "project-settings",
      component: () => import("../views/ProjectSettingsView.vue"),
    },
  ],
});

export default router;
