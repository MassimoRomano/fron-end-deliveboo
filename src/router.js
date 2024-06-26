import { createWebHistory, createRouter } from "vue-router";
import AppHome from './components/views/AppHome.vue';
import AppSearch from './components/views/AppSearch.vue';
import AppRestaurant from "./components/views/AppRestaurant.vue";
import AppOrder from "./components/views/AppOrder.vue";

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
            path: '/order',
            component: AppOrder,
            name: 'order',
        }
    ]
})

export default router;