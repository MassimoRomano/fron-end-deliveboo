import { createWebHistory, createRouter } from "vue-router";
import AppHome from './components/views/AppHome.vue';
import AppSearch from './components/views/AppSearch.vue';
import AppRestaurant from "./components/views/AppRestaurant.vue";

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
            path: '/restaurant/:slug/:id',
            component: AppRestaurant,
            name: 'restaurant'
        },
    ]
})

export default router;