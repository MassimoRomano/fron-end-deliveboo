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
            ristoranteSalvato: null,
            total: 0,
            restaurantOrder: null,
            verify: false,
        }
    },
    methods: {
        /* Aprire la modale */
        openModal(dish) {
            let restaurant_id = JSON.parse(localStorage.getItem("restaurantID")) //salviamo il restaurantID che era stato salvato in local storage
            if (restaurant_id != this.ristoranteSalvato) {
                this.showModal = true;
            } else {
                this.addItemToCart(dish);
            }
        },
        orderProceed(dish) {
            this.active = !this.active;
            this.closeModal();
            this.addItemToCart(dish);
            this.verify = true;
        },
        /* Chiudere la modale */
        closeModal() {
            this.showModal = false;
        },
        /* Chiamata API */
        callApi(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.response);
                    this.restaurants = response.data.response
                    //console.log(this.restaurants)
                    this.restaurants.forEach(restaurant => {
                        this.ristoranteSalvato = restaurant.id
                        console.log(restaurant);
                    });
                    let restaurant_id = JSON.parse(localStorage.getItem("restaurantID")) //salviamo il restaurantID che era stato salvato in local storage
                    //console.log(restaurant_id, this.ristoranteSalvato);
                    if (restaurant_id == this.ristoranteSalvato) {
                        this.cart = JSON.parse(localStorage.getItem("order")); //ricaviamo l'ordine dal local storage per savarlo e printaro sul carrello
                        //console.log(this.cart);
                    }
                })
                .catch(error => {
                    this.error.message = error.message;
                })
        },
        /* Agiungere il piatto al carrello */
        addItemToCart(product) {
            let product_quantity = {
                object: product,
                quantity: 1,
                price: parseFloat(product.price).toFixed(2),
            }
            //console.log(product_quantity);
            let check_product = this.cart.find(product_quantity => product_quantity.object.name === product.name);
            if (!check_product) {
                this.cart.push(product_quantity);
            }
            this.total = this.total + parseFloat(product.price);
            console.log(this.total)
            localStorage.clear();
            console.log(this.cart);
            localStorage.setItem("total", JSON.stringify(this.total))
            localStorage.setItem("order", JSON.stringify(this.cart)); //trasforma il dato in stringa e lo salva con il nome Order
            localStorage.setItem("restaurantID", JSON.stringify(this.ristoranteSalvato)); //trasforma il dato in stringa e lo salva con il nome restaurantID
            //console.log(ordineSavato);
        },
        /* Aumentare quantità del carrello */
        increase_cart_quantity(product) {
            product.quantity += 1
            product.price = parseFloat(product.object.price * product.quantity).toFixed(2);
            localStorage.setItem("order", JSON.stringify(this.cart));

            this.total += parseFloat(product.object.price);
            localStorage.setItem("total", JSON.stringify(this.total));
        },
        /* Ridurre quantità del carrello */
        decrease_cart_quantity(product, index) {
            if (product.quantity <= 1) {
                this.cart.splice(index, 1)
                console.log(product.object.price)
                localStorage.setItem("order", JSON.stringify(this.cart));

                this.total -= parseFloat(product.object.price);
                localStorage.setItem("total", JSON.stringify(this.total));
            } else {
                product.quantity -= 1
                product.price = parseFloat(product.object.price * product.quantity).toFixed(2);
                localStorage.setItem("order", JSON.stringify(this.cart));

                this.total -= parseFloat(product.object.price);
                localStorage.setItem("total", JSON.stringify(this.total));
            }
        },
        addOrder() {
            if (this.cart.length > 0) {

            }
        },
    },
    mounted() {
        let url = this.base_api_url + this.base_restaurants_url + "/" + this.$route.params.slug;
        this.verify = false;
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
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, natus ex praesentium assumenda a deserunt doloribus, optio non rem reprehenderit fugit neque iure, odio nisi. Architecto eos ad sunt nobis.
                                Quasi reprehenderit asperiores, quo dolorum accusamus eius illum earum atque deleniti expedita nobis possimus. Pariatur nulla veniam voluptate saepe tenetur earum, sequi iusto provident eos deleniti ut voluptatem tempore veritatis.
                            </p>
                            <p>
                                Indirizzo: 
                                <strong>{{ restaurant.address }}</strong>
                            </p>
                            <p>
                                Numero di Telefono: 
                               <strong>{{ restaurant.phone_number }}</strong> 
                            </p>
                        </div>
                    </section>

                    <h2 class="menu">Menù</h2>

                    <!-- DA CONTROLLARE I VISIBILITY -->


                    <section class="product">
                        <div class="product-info">
                            <div class="col-2 restaurant-dishes" v-for="dish in restaurant.dishes">
                                <div class="card-product" id="dish.id"
                                    :class="{ 'card-product-invisible': dish.visibility !== 1 }">
                                    <div v-if="showModal" class="modal" @click.self="closeModal()">
                                        <div class="modal-content">
                                            <div class="modal-inside">
                                                <span class="close" @click="closeModal()">&times;</span>
                                                <h2>Attenzione!</h2>
                                                <p>Hai già l'ordine di un altro ristorante nel carrello, cliccando
                                                    prosegui
                                                    andrai a
                                                    cancellare il
                                                    vecchio ordine per far spazio al nuovo </p>
                                                <div class="add_remove">
                                                    <button @click="orderProceed(dish)">Prosegui</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /warning modal -->
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
                                                <button @click="openModal(dish)" class="add_to_cart">
                                                    Aggiungi al carrello
                                                </button>
                                                <p v-if="dish.visibility !== 1" class="not-available">Non
                                                    disponibile</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- /.row -->

                        <div class="cart">
                            <div class="icon-cart">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <h2>Carrello</h2>
                            </div>
                            <div class="text-cart">
                                <p class="tot-prod-in-cart" v-if="cart">{{ cart.length }} oggetti nel carrello</p>
                                <div v-for="(product, index) in cart" class="prod-cart-price">
                                    <p>
                                        {{ product.object.name }}
                                        <button class="add_product" @click="increase_cart_quantity(product)">+</button>
                                        <span class="n_off_poducts">{{ product.quantity }}</span>
                                        <button class="remove_product"
                                            @click="decrease_cart_quantity(product, index)">-</button>
                                    </p>
                                    <p class="prod-price">Totale prodotto: <span>{{ product.price }} &euro;</span> </p>
                                </div>
                            </div>
                            <p class="tot-cart">Totale carrello: {{ this.total.toFixed(2) }}</p>
                            <button class="pay" @click="addOrder()">
                                <router-link :to="{ name: 'order' }">
                                    Ordina
                                </router-link>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </template>
    </main>
</template>

<style>
@import '/src/components/css/_restaurant.css';
</style>