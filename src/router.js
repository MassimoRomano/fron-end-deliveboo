import { createWebHistory, createRouter } from "vue-router";
import AppHome from './components/views/AppHome.vue';
import AppSearch from './components/views/AppSearch.vue';
import AppRestaurant from "./components/views/AppRestaurant.vue";
import AppPayment from "./components/views/AppPayment.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppHome,
            name: 'Home'
        },
        {
            path: '/search',
            component: AppSearch,
            name: 'search'
        },
        {
            path: '/restaurant/:slug',
            component: AppRestaurant,
            name: 'restaurant'
        },
        {
            path: '/pay',
            component: AppPayment,
            name: 'payment',
        }
    ]
})

export default router;