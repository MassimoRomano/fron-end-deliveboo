<script>
import autoScroll from '../js/autoScroll';
import autoSlide from '../js/autoSlide.js';
import axios from 'axios';
import { collapse, dropdownStates, initializeDropdownStates, toggleDropdown, selectOption } from '../js/collapse.js';

export default {
  name: 'AppHome',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000/',
      base_restaurants_url: 'api/restaurants',
      restaurants: [],
      selectedTypes: [],
      base_types_url: 'api/types',
      types: [],
      dropdownOptions: collapse,
      dropdownStates,

    }
  },
  created() {
    initializeDropdownStates();
  },
  methods: {
    callApi(url) {
      axios
        .get(url)
        .then(response => {
          console.log(response.data.restaurants);
          this.restaurants = response.data.restaurants
        })
        .catch(error => {
          this.error.message = error.message;
        })
    },

    callApiTypes(url) {
      axios
        .get(url)
        .then(response => {
          console.log(response.data.types);
          this.types = response.data.types
        })
        .catch(error => {
          this.error.message = error.message;
        })
    },

    uncheck(type) {
      const index = this.selectedTypes.findIndex(selectedType => selectedType.id === type.id);
      if (index !== -1) {
        this.selectedTypes.splice(index, 1);
      } else {
        this.selectedTypes.push(type);
      }
    },

    toggleDropdown,
    selectOption(name, index, event) {
      event.stopPropagation();
      selectOption(name, index);
      this.$forceUpdate();
    }

  },
  mounted() {
    autoScroll();
    autoSlide();

    let url = this.base_api_url + this.base_restaurants_url;
    this.callApi(url);
    let urlTypes = this.base_api_url + this.base_types_url;
    this.callApiTypes(urlTypes);
  }
}
</script>

<template>
  <main>

    <div class="jumbo-head">
      <h1>I piatti dei ristoranti che ami, a domicilio </h1>
      <div class="card">

      </div>
    </div>

    <section class="logo-aff">
      <div class="scroll-container ">
        <div class="scroll-top">
          <div class="scroll-1">
            <img src="/public/img/log-aff/burger.jpg" alt="">
          </div>
          <div class="scroll-2">
            <img src="/public/img/log-aff/kfc.png" alt="">
          </div>
          <div class="scroll-2">
            <i class="fa-solid fa-pizza-slice"></i>
          </div>
          <div class="scroll-1">
            <img src="/public/img/log-aff/grilled-meat.jpg" alt="">
          </div>
          <div class="scroll-2">
            <i class="fa-solid fa-wine-glass"></i>
          </div>
          <div class="scroll-2">
            <img class="old-wild" src="/public/img/log-aff/old-wild.png" alt="">
          </div>
          <div class="scroll-1">
            <img src="/public/img/log-aff/insalata.jpg" alt="">
          </div>
          <div class="scroll-2">
            <i class="fa-solid fa-fish-fins"></i>
          </div>
        </div>
        <div class="scroll-bottom">
          <div class="scroll-2">
            <i class="fa-solid fa-burger"></i>
          </div>
          <div class="scroll-2">
            <img src="/public/img/log-aff/king.jpg" alt="">
          </div>
          <div class="scroll-1">
            <img src="/public/img/log-aff/pizza.jpg" alt="">
          </div>
          <div class="scroll-2">
            <img src="/public/img/log-aff/MC_2007.jpg.webp" alt="">
          </div>
          <div class="scroll-2">
            <i class="fa-solid fa-hotdog"></i>
          </div>
          <div class="scroll-1">
            <img src="/public/img/log-aff/sushi.webp" alt="">
          </div>
          <div class="scroll-2">
            <img src="/public/img/log-aff/kfc.png" alt="">
          </div>
          <div class="scroll-1">
            <img src="/public/img/log-aff/scream.jpg" alt="">
          </div>
        </div>
      </div>
    </section>

    <section class="restaurant">
      <div class="text-rest">
        <h2>Cerca il tuo Ristorante Preferito e c'ho che piu' ami mangiare</h2>
        <h3>E al resto pensiamo noi!!</h3>
      </div>
      <div class="bar-types">
        <div v-for="(option, name) in dropdownOptions" :key="name" class="dropdown">
          <button class="dropdown-button" @click="toggleDropdown(name)">
            {{ name }}
            <span><i class="fa-solid fa-sort-down"></i></span>
          </button>
          <div class="dropdown-content" :id="'dropdown-' + name" :class="{ open: dropdownStates[name].isOpen }">
            <ul>
              <li v-for="type in types" :key="type.id">
                <input type="checkbox" :id="type.id" :name="name" @click='uncheck(type)'
                  :checked="selectedTypes.some(selectedType => selectedType.id === type.id)">
                <label :for="type.id">{{ type.name }}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="restaurant-wrap">
        <template v-if="restaurants.data">
          <div class="col-2" v-for="restaurant in restaurants.data">
            <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug, id: restaurant.id } }">
              <div class="card-restaurant">
                <div class="card-body-restaurant">
                  <div class="top-restaurant">
                    <template v-if="restaurant.image && restaurant.image.includes('uploads')">
                      <div class="card-image">
                        <img :src="base_api_url + 'storage/' + restaurant.image" alt="">
                      </div>
                    </template>
                    <template v-else>
                      <div class="card-image">
                        <img :src="restaurant.image" :alt="'Image of the restaurant: ' + restaurant.name">
                      </div>
                    </template>
                  </div>
                  <div class="bottom-restaurant">
                    <h3>{{ restaurant.name }}</h3>
                    <p>{{ restaurant.address }}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </template>


      </div>
    </section>

    <section class="offer">
      <div class="card-offer">
        <div class="card-body-offer">
          <div class="left-offer">
            <h3>Menù in offerta: sconti fino al 25%</h3>
            <p>Perfetti per dare più gusto alla tua settimana, ordinare i piatti più amati da tutta la famiglia e fare
              una
              pausa dai fornelli.</p>
            <p class="log"><span> <router-link>Registrati</router-link> </span> per avere uno sconto sul tuo primo
              ordine
            </p>
          </div>
          <div class="right-offer">
            <img src="/public/img/food-del.jpg" alt="">
          </div>
        </div>
      </div>
    </section>

    <section class="collabs">
      <div class="container-coll">
        <div class="inside-collabs">
          <div class="col-4">
            <div class="card-collab">
              <div class="card-body-collab">
                <div class="top-collab">
                  <img src="/public/img/chef.jpg" alt="">
                </div>
                <div class="bottom-collab">
                  <h3>Collabora con Deliveboo</h3>
                  <p>Scopri come possiamo aiutarti a fare la tua spesa a domicilio</p>
                  <a href="http://">Inizia Ora</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card-collab">
              <div class="card-body-collab">
                <div class="top-collab">
                  <img src="/public/img/rider.jpg" alt="">
                </div>
                <div class="bottom-collab">
                  <h3>Collabora con Deliveboo</h3>
                  <p>Scopri come possiamo aiutarti a fare la tua spesa a domicilio</p>
                  <a href="http://">Inizia Ora</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card-collab">
              <div class="card-body-collab">
                <div class="top-collab">
                  <img src="/public/img/deliv.png" alt="">
                </div>
                <div class="bottom-collab">
                  <h3>Collabora con Deliveboo</h3>
                  <p>Scopri come possiamo aiutarti a fare la tua spesa a domicilio</p>
                  <a href="http://">Inizia Ora</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<style>
@import '../css/_home.css';
</style>
