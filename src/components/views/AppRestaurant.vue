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
            selectedProduct: { name: null, image: null },
            cart: [],
        }
    },
    methods: {
        openModal(dish) {
            this.selectedProduct = {
                name: dish.name,
                image: dish.image.includes('uploads') ? this.base_api_url + 'storage/' + dish.image : dish.image,
                ingredients: dish.ingredients,
                price: dish.price,
                product_id: dish.id,
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        callApi(url) {
            axios
                .get(url)
                .then(response => {
                    //console.log(response.data.response);
                    this.restaurants = response.data.response
                    //console.log(this.restaurants)
                })
                .catch(error => {
                    this.error.message = error.message;
                })
        },
        addItemToCart(product) {
            //onsole.log(product);
            let product_quantity = {
                object: product,
                quantity: 1,
            }
            let check_product = this.cart.find(product_quantity => product_quantity.object.name === product.name);
            if (!check_product) {
                this.cart.push(product_quantity);
            }
        },
    },
    mounted() {
        let url = this.base_api_url + this.base_restaurants_url + "/" + this.$route.params.slug;
        //console.log(url);
        this.callApi(url);
    }
}
</script>

<template>
    <main class="rest">
        <template v-if="restaurants" v-for="restaurant in restaurants">
            <div class="restaurant-page">
                <div class="container">
                    <section v-for="restaurant in restaurants" class="info-rest">
                        <div class="logo-rest">
                            <template v-if="restaurant.image">
                                <img :src="restaurant.image.startsWith('uploads') ? base_api_url + 'storage/' + restaurant.image : restaurant.image"
                                    alt="Logo del ristorante">
                            </template>
                        </div>
                        <div class="descr-rest">
                            <h1>{{ restaurant.name }}</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quaerat.
                            </p>
                        </div>
                    </section>

                    <h2>Menù</h2>

                    <!-- DA CONTROLLARE I VISIBILITY -->

                    <section class="product">
                        <div class="product-info">
                            <div class="col-2 restaurant-dishes" v-for="dish in restaurant.dishes">
                                <div class="card-product" id="dish.id">
                                    <div class="card-body-product">
                                        <div class="top-product">
                                            <template v-if="dish.image && dish.image.startsWith('uploads')">
                                                <div class="card-image">
                                                    <img :src="base_api_url + 'storage/' + dish.image" alt="">
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="card-image">
                                                    <img :src="dish.image" :alt="'Image of the dish: ' + dish.name">
                                                </div>
                                            </template>
                                            <!-- ./images -->
                                        </div>
                                        <div class="bottom-product">
                                            <h3>{{ dish.name }}</h3>
                                            <p>Prezzo: {{ dish.price }} &euro;</p>
                                            <button @click="addItemToCart(dish)" class="add_to_cart">
                                                Aggiungi al carrello</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.row -->
                        <div class="cart">
                            <div class="icon-cart">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div class="text-cart">
                                <h2>Carrello</h2>
                                <p>{{ cart.length }} oggetti nel carrello</p>
                                <div v-for="(product, index) in cart">
                                    <p>
                                        {{ product.object.name }}
                                        <button class="add_product" @click="product.quantity += 1">+</button>
                                        <span class="n_off_poducts">{{ product.quantity }}</span>
                                        <button class="remove_product"
                                            @click="product.quantity <= 1 ? cart.splice(index, 1) : product.quantity -= 1">-</button>
                                    </p>
                                </div>
                            </div>
                            <button class="pay"><a href="">Vai al carrello</a></button>
                            <!-- <button class="pay"><a href="">Vai al pagamento</a></button> -->
                        </div>
                    </section>

                    <!-- Modale -->
                    <!--  <div v-if="showModal" class="modal" @click.self="closeModal()">
                        <div class="modal-content">
                            <div class="modal-inside">
                                <span class="close" @click="closeModal()">&times;</span>
                                <img :src="selectedProduct.image" alt="Product Image">
                                <h2>{{ selectedProduct.name }}</h2>
                                <p>Ingredienti: {{ selectedProduct.ingredients }}</p>
                                <p>Price: <strong>{{ selectedProduct.price }}&euro;</strong></p>
                                <div class="add_remove">
                                    <button class="add_product" @click="productIncrement()">+</button>
                                    <div class="product_quantity">{{ quantity }}</div>
                                    <button class="remove_product" @click="productDecrement()">-</button>
                                </div>
                                <button @click="addItemToCart(product)">Aggiungi a carrello</button>
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>
        </template>
    </main>
</template>

<style>
@import '/src/components/css/_restaurant.css';
</style>