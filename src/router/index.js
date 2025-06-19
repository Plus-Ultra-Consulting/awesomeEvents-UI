import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from "../views/LogoutView.vue";
import RegisterView from "../views/RegisterView.vue";
import { hasAccessToken } from "../utils"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        guestOk: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
      meta: {
        guestOk: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        guestOk: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/event',
      name: 'evet',
      component: () => import('../views/EventView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.guestOk) {
    return;
  }

  if (hasAccessToken()) {
    return;
  }
  
  return {
    name: "login",
  };
});

export default router
