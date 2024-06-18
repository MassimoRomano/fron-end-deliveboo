import { createWebHistory, createRouter } from "vue-router";
import AppHome from './components/views/AppHome.vue';
import AppSearch from './components/views/AppSearch.vue';
import AppRestourant from "./components/views/AppRestourant.vue";

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
            path: '/restourant',
            component: AppRestourant,
            name: 'restourant'
        },
        
    ]
})

export default router;