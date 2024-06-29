import { createWebHistory, createRouter } from "vue-router";
import AppHome from './components/views/AppHome.vue';
import AppSearch from './components/views/AppSearch.vue';
import AppRestaurant from "./components/views/AppRestaurant.vue";
import AppOrder from "./components/views/AppOrder.vue";
import NotFound from "./components/views/NotFound.vue";
import AppOrderComplete from "./components/views/AppOrderComplete.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppHome,
            name: 'Home'
        },
        {
            path: '/order-complete',
            component: AppOrderComplete,
            name: 'order-complete'
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
        },
        {
            path: '/:patchMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
})

export default router;