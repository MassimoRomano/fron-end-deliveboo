<script>
import { collapse, dropdownStates, initializeDropdownStates, toggleDropdown, selectOption } from '../js/collapse.js';

export default {
    name: 'AppSearch',
    data() {
        return {
            dropdownOptions: collapse,
            dropdownStates,
        };
    },
    created() {
        initializeDropdownStates();
    },
    methods: {
        toggleDropdown,
        selectOption(name, index, event) {
            event.stopPropagation();
            selectOption(name, index);
            this.$forceUpdate();
        }
    }
};
</script>

<template>
    <div class="search-rest">
        <div class="sidebar">
            <div class="logo-side">

            </div>
            <div class="content-search">
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-utensils"></i></span>
                    <input type="rest-found" id="found" placeholder="Cerca il tuo ristorante">
                    <button class="found-rest" type="submit"><router-link
                            :to="{ name: 'search' }">Cerca</router-link></button>
                </div>
            </div>
            <div v-for="(options, name) in dropdownOptions" :key="name" class="dropdown">
                <button class="dropdown-button" @click="toggleDropdown(name)">
                    {{ name }}
                    <span><i class="fa-solid fa-sort-down"></i></span>
                </button>
                <div class="dropdown-content" :id="'dropdown-' + name" :class="{ open: dropdownStates[name].isOpen }">
                    <ul>
                        <li v-for="(option, index) in options" :key="index">
                            <input type="radio" :id="'option-' + name + '-' + index" :name="'option-' + name"
                                :data-name="name" :data-index="index"
                                :checked="dropdownStates[name].selectedOption === index"
                                @click.stop="selectOption(name, index, $event)">
                            <label :for="'option-' + name + '-' + index">{{ option }}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <section class="feed-grid">
            <div class="col-2">
                <div class="card-rest">
                    <div class="card-body-rest">
                        <router-link :to="{name:'restourant'}">
                            <div class="top-rest">
                                <img src="/public/img/deliv.png" alt="">
                            </div>
                            <div class="bottom-rest">
                                <h3>Osso di Seppia</h3>
                                <p>Ristorante di pesce </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card-rest">
                    <div class="card-body-rest">
                        <router-link>
                            <div class="top-rest">
                                <img src="/public/img/deliv.png" alt="">
                            </div>
                            <div class="bottom-rest">
                                <h3>Osso di Seppia</h3>
                                <p>Ristorante di pesce </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card-rest">
                    <div class="card-body-rest">
                        <router-link>
                            <div class="top-rest">
                                <img src="/public/img/deliv.png" alt="">
                            </div>
                            <div class="bottom-rest">
                                <h3>Osso di Seppia</h3>
                                <p>Ristorante di pesce </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card-rest">
                    <div class="card-body-rest">
                        <router-link>
                            <div class="top-rest">
                                <img src="/public/img/deliv.png" alt="">
                            </div>
                            <div class="bottom-rest">
                                <h3>Osso di Seppia</h3>
                                <p>Ristorante di pesce </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card-rest">
                    <div class="card-body-rest">
                        <router-link>
                            <div class="top-rest">
                                <img src="/public/img/deliv.png" alt="">
                            </div>
                            <div class="bottom-rest">
                                <h3>Osso di Seppia</h3>
                                <p>Ristorante di pesce </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<style>
@import '../css/_search.css';
</style>