import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from "../views/LogoutView.vue";
import RegisterView from "../views/RegisterView.vue";
import {hasAccessToken} from "../utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        isGuestPage: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
      meta: {
        isGuestPage: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        isGuestPage: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isGuestPage: false,
      },
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/EventView.vue'),
      meta: {
        isGuestPage: false,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: {
        isGuestPage: false,
      },
    },
    {
      path: '/event/create',
      name: 'createEvent',
      component: () => import('../views/EventCreateView.vue'),
      meta: {
        isGuestPage: false,
      },
    },
  ],
});

router.beforeEach(async (page) => {
  if (page.meta.isGuestPage && hasAccessToken()) {
    return {
      name: "home",
    };
  } else if (!page.meta.isGuestPage && !hasAccessToken()) {
    return {
      name: "login",
    };
  }
});

export default router
