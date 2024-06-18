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

  <div class="jumbo-head">
    <h1>I piatti dei ristoranti che ami, a domicilio </h1>
    <div class="card">
      <div class="card-body">
        <p>Cerca i ristoranti nella tua zona</p>
        <div class="search">
          <div class="search-cont">
            <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
            <input type="search" id="search" placeholder="Inserisci il tuo indirizzo completo">
            <button class="found" type="submit"><router-link :to="{ name: 'search' }">Cerca</router-link></button>
          </div>
        </div>
        <p class="log"><span>Login</span> per visualizzare i tuoi indirizzi
          recenti </p>
      </div>
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

  <section class="offer">
    <div class="card-offer">
      <div class="card-body-offer">
        <div class="left-offer">
          <h3>Menù in offerta: sconti fino al 25%</h3>
          <p>Perfetti per dare più gusto alla tua settimana, ordinare i piatti più amati da tutta la famiglia e fare una
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

</template>

<style>
@import '../css/_home.css';
</style>
