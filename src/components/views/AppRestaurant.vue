<script>
import axios from 'axios';
export default {
    name: 'AppRestaurant',
    data() {
        return {
            base_api_url: 'http://127.0.0.1:8000/',
            base_restaurants_url: 'api/restaurants',
            restaurants: null,
            showModal: false,
            selectedProduct: { name: null, image: null }
        }
    },
    methods: {
        openModal(productName, productImage) {
            this.selectedProduct = { name: productName, image: productImage };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        callApi(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.response);
                    this.restaurants = response.data.response
                    console.log(this.restaurants)
                })
                .catch(error => {
                    this.error.message = error.message;
                })
        },
    },
    mounted() {
        let url = this.base_api_url + this.base_restaurants_url + "/" + this.$route.params.slug + "/" + this.$route.params.id;
        console.log(url)
        this.callApi(url);
    }
}
</script>

<template>
    <template v-if="restaurants" v-for="restaurant in restaurants">
        <div class="restaurant-page">
            <div class="container">
                <section class="info-rest">
                    <div class="logo-rest">
                        <img src="/public/img/log-aff/MC_2007.jpg.webp" alt="">
                    </div>
                    <div class="descr-rest">
                        <h1>{{ restaurant.name }}</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quaerat.
                        </p>
                    </div>
                </section>

                <h2>Prodotti</h2>
                <section class="product">
                    <div class="product-info">
                        <div class="col-2" @click="openModal('Osso di Seppia', '/public/img/deliv.png')">
                            <div class="card-rest">
                                <div class="card-body-rest">
                                    <div class="top-rest">
                                        <img src="/public/img/deliv.png" alt="">
                                    </div>
                                    <div class="bottom-rest">
                                        <h3>Osso di Seppia</h3>
                                        <p>Ristorante di pesce </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart">
                        <div class="icon-cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div class="text-cart">
                            <h2>Carrello vuoto</h2>
                        </div>
                        <button class="pay"><a href="">Vai al pagamento</a></button>
                    </div>
                </section>

                <!-- Modale -->
                <div v-if="showModal" class="modal" @click.self="closeModal()">
                    <div class="modal-content">
                        <div class="modal-inside">
                            <span class="close" @click="closeModal()">&times;</span>
                            <img :src="selectedProduct.image" alt="Product Image">
                            <h2>{{ selectedProduct.name }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

</template>

<style>
@import '/src/components/css/_restaurant.css';
</style>