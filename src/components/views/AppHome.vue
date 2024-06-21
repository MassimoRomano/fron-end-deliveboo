<script>
import autoScroll from '../js/autoScroll';
import autoSlide from '../js/autoSlide.js';
import axios from 'axios';


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
      isLoading: false,
    }
  },

  methods: {
    nextPage(url) {
      this.callApi(url)
    },
    prevPage(url) {
      this.callApi(url)
    },
    goTo(page) {
      const url = this.base_api_url + this.base_restaurants_url + `?page=${page}`
      this.callApi(url)
    },

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
          //console.log(response.data.types);
          this.types = response.data.types

        })
        .catch(error => {
          this.error.message = error.message;

        })
    },

    callApiFilter() {
      // Compongo la chiamata api con la Route di Laravel
      let url = this.base_api_url + 'api/filter';


      // timing function perché chiamata api più veloce del v-bind 
      console.log(this.selectedTypes.length, 'ciao')
      this.isLoading = true
      setTimeout(() => {
        if (this.selectedTypes.length > 0) {
          axios.get(url, {
            params: {
              // costruisco il mio obj paramas passandogli il mio array di id selezionati con v-bind
              types: this.selectedTypes,
            }
          })
            .then(response => {
              // Vedo la risposta
              // Passo correttamente gli id!

              console.log(response.data.received_data);
              this.restaurants = response.data.received_data;
              this.isLoading = false
              // this.restaurants =
            })
            .catch(error => {
              console.error(error);
              this.isLoading = false
            });
        } else {
          console.log(this.selectedTypes.length, 'ciao')
          let urlRestaurants = this.base_api_url + this.base_restaurants_url;
          this.callApi(urlRestaurants);
        }
      }, 100);

    },
    scrollTypes(direction) {
      const container = this.$refs.typesContainer;
      if (direction === 'next') {
        container.scrollLeft += 1000;
      } else {
        container.scrollLeft -= 1000;
      }
    },

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
  <main class="home">

    <div class="jumbo-head">
      <h1>I piatti dei ristoranti che ami a domicilio </h1>
      <div class="card">
      </div>
      <!-- ./card -->
    </div>
    <!-- ./jumbo-head -->

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
        <!-- ./scroll-top -->

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
        <!-- ./scroll-bottom -->
      </div>
      <!-- ./container -->
    </section>
    <!-- ./logo-aff -->

    <section class="restaurant">
      <div class="text-rest">
        <h2>Cerca il tuo Ristorante Preferito e ciò che più ami mangiare</h2>
        <h3>Scegli cosa vuoi mangiare oggi</h3>
      </div>
      <!-- /.text-rest -->

      <div class="restaurant-container">
        <div class="restaurant-inside">
          <div class="bar-types">
            <!-- <button class="prev-btn" @click="scrollTypes('prev')">&#10094;</button> -->
            <form action="">
              <div ref="typesContainer" class="types-container">
                <ul class="types-section">
                  <li v-for="type, index in types">
                    <input type="checkbox" name="type.id" id="type.id" v-model="selectedTypes" :value="type.id"
                      @click="callApiFilter()">
                    {{ type.name }}
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div class="separate"></div>
          <div class="restaurant-col">
            <div v-if="isLoading" class="loading col-12">
              <p>Caricamento dei ristoranti in corso...</p>
            </div>
            <div class="restaurant-wrap">
              <template v-if="restaurants.data">
                <div class="col-2" v-for="restaurant in restaurants.data">
                  <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                    <div class="card-restaurant">
                      <div class="card-body-restaurant">
                        <div class="top-restaurant">
                          <template v-if="restaurant.image && restaurant.image.startsWith('uploads')">
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
                          <div>
                            <h3>{{ restaurant.name }}</h3>
                          </div>
                          <div>
                            <p>Indirizzo:</p>
                            <p>{{ restaurant.address }}</p>

                            <p class="type-text">Tipologia:</p>
                            <div class="type-text" v-for=" (type, index) in restaurant.types">{{ type.name }}</div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </template>

              <!-- <template v-else>
                <h3>Nessun ristorante trovato</h3>
              </template> -->
              <!-- template if don't have restaurant -->
              <nav aria-label="Page navigation" class="text-center col-12">
                <ul class="my_pagination">
                  <li v-show="restaurants.prev_page_url" @click="prevPage(restaurants.prev_page_url)">
                    <button class="page-link" aria-label="Previous">
                      <i class="fa-solid fa-chevron-left"></i>
                    </button>
                  </li>

                  <li v-for="page in restaurants.last_page" @click="goTo(page)">
                    <button
                      :class="{ 'active': page == restaurants.current_page, 'page-link': page != restaurants.current_page }">{{
                        page }}</button>
                  </li>

                  <li v-show="restaurants.next_page_url" @click="nextPage(restaurants.next_page_url)">
                    <button class="page-link" aria-label="Next">
                      <i class="fa-solid fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
              <!-- /.pagination -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ./restaurants -->




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
