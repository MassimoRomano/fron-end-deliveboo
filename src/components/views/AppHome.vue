<script>
import autoScroll from '../js/autoScroll';
import autoSlide from '../js/autoSlide.js';

export default {
  name: 'AppHome',
  mounted() {
    autoScroll();
    autoSlide();
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

    <section class="restourant">
      <div class="text-rest">
        <h2>Cerca il tuo Ristorante Preferito e c'ho che piu' ami</h2>
        <h3>E al resto pensiamo noi!!</h3>
      </div>
      <div class="found-restourant">
        <div class="bar-search-restourant">
          <div class="logo-rest-search">
            <i class="fa-solid fa-utensils"></i>
          </div>
          <div class="input-rest">
            <input type="search" id="search" placeholder="Cerca il tuo ristorante preferito">
          </div>
          <div class="button-rest">
            <button type="submit">Cerca</button>
          </div>
        </div>

      </div>
      <div class="restourant-wrap">
        <router-link :to="{ name: 'restourant' }">
          <div class="col-2">
            <div class="card-restourant">
              <div class="card-body-restourant">
                <div class="top-restourant">
                  <img src="/public/img/log-aff/burger.jpg" alt="">
                </div>
                <div class="bottom-restourant">
                  <h3>Burger King</h3>
                  <p>Cerca i ristoranti nella tua zona</p>
                </div>
              </div>
            </div>
          </div>
        </router-link>
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
            <p class="log"><span><router-link>Registrati</router-link></span> per avere uno sconto sul tuo primo ordine
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
