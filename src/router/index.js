import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/HomeView.vue'
import store from "../store/index";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import('../views/BookView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { auth: true}
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
  ],
})

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth nya
  if (to.matched.some((record) => record.meta.auth)) {
    // jika user adalah guest
    if (store.getters["auth/guest"]) {
      // tampilkan pesan bahwa dia harus login dulu
      store.dispatch("alert/set", {
        status: true,
        text: "Login First",
        color: "error",
      });
      store.dispatch("setPrevUrl", to.path);
      // tampilkan form login
      store.dispatch("dialog/setComponent", "login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
