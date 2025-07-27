import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

/**
 * Creates a Promise that resolves with the current user from Firebase.
 * This forces the router to wait until Firebase has initialized.
 */
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe(); // Unsubscribe to prevent memory leaks
        resolve(user);
      },
      reject // Pass the reject function from the Promise
    );
  });
};


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import('../views/UserHome.vue')},
        {path: "/home", component: () => import('../views/UserHome.vue')},
        {path: "/contact-us", component: () => import('../views/ContactUs.vue')},
        {path: "/register", component: () => import('../views/Register.vue')},
        {path: "/sign-in", component: () => import('../views/SignIn.vue')},
        {path: "/sponsors", component: () => import('../views/Sponsors.vue')},
        {
            path: "/profile", 
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/account", 
            component: () => import('../views/Account.vue'),
            meta: {
                requiresAuth: true,
            },
        }
    ],
    linkExactActiveClass: 'active',
    // Add this scrollBehavior function
  scrollBehavior(to, from, savedPosition) {
    // If the user is navigating back/forward, use the saved position
    if (savedPosition) {
      return savedPosition;
    } 
    // Otherwise, scroll to the top of the page
    else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        if(await getCurrentUser()) {
            console.log("Valid User");
            next();
        } else {
            alert("Member access required!");
            next("/register");
        }
    } else {
        next();
    }
});

export default router;