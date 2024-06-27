<script>
import axios from 'axios';
import AppLoading from '../partials/AppLoading.vue';


export default {
    name: 'AppRestaurant',
    components: {
        AppLoading,
    },
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
            restaurant_name: '',
            restaurant_slug: '',
            restaurant_id: '',
            dish: null,
            loading: true,

        }
    },
    methods: {

        /* Chiamata API */
        callApi(url) {
            this.loading = true
            axios
                .get(url)
                .then(response => {

                    console.log(response);
                    if (response.data.success) {
                        // console.log(response.data.response);
                        // inserisco nell'istanza restaurants il ristorante
                        this.restaurants = response.data.response
                        //console.log(this.restaurants)
                        console.log(this.restaurants)

                        // ciclo perche me lo da come array
                        this.restaurants.forEach(restaurant => {

                            // salva l'id del ristorante del ristorante in cui si trovo il consumatore
                            this.ristoranteSalvato = restaurant.id;

                            // salva il nome del ristorante del ristorante in cui si trovo il consumatore
                            this.restaurant_name = restaurant.name;

                            this.restaurant_slug = restaurant.slug;

                            // inserisco nel local storage il nome del ristorante del l'ordinr
                            localStorage.setItem("restaurant_name", JSON.stringify(this.restaurant_name));
                            localStorage.setItem("restaurant_slug", JSON.stringify(this.restaurant_slug));
                            // console.log(restaurant);
                        });

                        // ricavo nel local storage l'id del ristorante
                        let restaurant_id = JSON.parse(localStorage.getItem("restaurantID"))

                        // verifico che l'ordine che sto facendo non e di due ristoranti
                        if (restaurant_id == this.ristoranteSalvato) {

                            //ricaviamo l'ordine dal local storage per savarlo e printaro sul carrello
                            this.cart = JSON.parse(localStorage.getItem("order"));
                            //console.log(this.cart);
                            this.total = JSON.parse(localStorage.getItem("total"));
                        }

                        if (restaurant_id != this.ristoranteSalvato) {
                            this.total = 0;
                        }
                    } else {
                        this.$router.push({ name: 'not-found' })
                    }

                })
                .catch(error => {
                    console.error(error);

                })
            this.loading = false;
        },

        /* Aprire la modale */
        openModal(dish) {
            //salviamo il restaurantID che era stato salvato in local storage
            let restaurant_id = JSON.parse(localStorage.getItem("restaurantID"));
            let count = JSON.parse(localStorage.getItem("order"));
            // console.log(count.length);

            if (count == null) {
                this.ristoranteSalvato = 0
                count = 0;
            }
            console.log(this.ristoranteSalvato, count, count.length === 0, restaurant_id);
            // controlliamo se l'id del ristorante del l'ordinwe combaccia con quello del piatto che hai aggiunto, cioe puoi aggiungere nell'ordine solo i piatti del ristorante in cui stai facendo l'ordine
            if (count.length === 0 || ((this.ristoranteSalvato == 0) && restaurant_id == null)) {
                //console.log("qui");
                console.log(dish)
                this.addItemToCart(dish);
            } else if (restaurant_id != this.ristoranteSalvato) {
                //console.log(count);

                this.dish = dish;
                this.showModal = true;
            } else {
                // aggiunge il prodotto
                //console.log("qui");

                // console.log(dish)
                this.addItemToCart(dish);
            }
        },

        // button modal "prosegui"
        orderProceed(dish) {
            // aggiunge il prodotto al carello
            // console.log(dish)
            this.addItemToCart(dish);
            // chiude la modale
            this.closeModal();

        },
        /* Chiudere la modale */
        closeModal() {
            this.showModal = false;
        },

        /* Agiungere il piatto al carrello */
        addItemToCart(product) {
            // puliamo il localStorage dei dati vecchi
            localStorage.clear();

            // costruiamo la variabile che inseriremo nel local storage
            let product_quantity = {
                object: product,
                quantity: 1,
                price: parseFloat(product.price).toFixed(2),
            }
            //console.log(product_quantity);

            // check per non fare aggiungere due piatti con lo stesso nome nella card
            let check_product = this.cart.find(product_quantity => product_quantity.object.name === product.name);

            // se il nome del piatto non ce nella card
            if (!check_product) {
                this.cart.push(product_quantity);
                // chiamo l'istanza total e aggiungo il prezzo del prodotto
                this.total = this.total + parseFloat(product.price);
                // console.log(this.total)
            }



            // inseriamo nel localStorage l'istanza restaurant_name con la chiave restaurant_name
            localStorage.setItem("restaurant_name", JSON.stringify(this.restaurant_name));

            // inseriamo nel localStorage l'istanza restaurant_name con la chiave restaurant_slug
            localStorage.setItem("restaurant_slug", JSON.stringify(this.restaurant_slug));

            // inseriamo nel localStorage l'istanza total(che sarebbe il totale del carello) con la chiave total
            localStorage.setItem("total", JSON.stringify(this.total))

            // inseriamo nel localStorage l'istanza cart(che sarebbe i piatti) con la chiave order
            //trasforma il dato in stringa e lo salva con il nome Order
            localStorage.setItem("order", JSON.stringify(this.cart));

            // inseriamo nel localStorage l'istanza restaurantID(che sarebbebbero) con la chiave order
            //trasforma il dato in stringa e lo salva con il nome restaurantID
            localStorage.setItem("restaurantID", JSON.stringify(this.ristoranteSalvato));
            //console.log(ordineSavato);
        },
        /* Aumentare quantità del carrello */
        increase_cart_quantity(product) {
            product.quantity += 1

            // moltiplico il prezzo unitario per la quantita diventa un numero di due cifre dopo la virgola(attenzione diventa una stringa con toFixed())
            product.price = parseFloat(product.object.price * product.quantity).toFixed(2);

            // sovrascrivo Order per cambiargli la quantita
            localStorage.setItem("order", JSON.stringify(this.cart));

            // aggiunge al totale il costo del prodotto
            this.total += parseFloat(product.object.price);

            // sovrascrivo total per cambiare il totale del carello del local storage
            localStorage.setItem("total", JSON.stringify(this.total));
        },
        /* Ridurre quantità del carrello */
        decrease_cart_quantity(product, index) {
            // se la quantita e meno 1
            if (product.quantity <= 1) {

                // cancella il prodoto dall'istanza cart
                this.cart.splice(index, 1)
                // console.log(product.object.price)

                // sovrascrivo Order per aggiornare i prodotti
                localStorage.setItem("order", JSON.stringify(this.cart));

                // tolgo il costo del prodotto dall'istanza total
                this.total -= parseFloat(product.object.price);

                // sovrascrivo total per cambiare il totale del carello del local storage
                localStorage.setItem("total", JSON.stringify(this.total));
            } else {
                // decremento la quantita del prodottto
                product.quantity -= 1

                // moltiplico il prezzo unitario per la quantita diventa un numero di due cifre dopo la virgola(attenzione diventa una stringa con toFixed())
                product.price = parseFloat(product.object.price * product.quantity).toFixed(2);
                // sovrascrivo Order per aggiornare i prodotti
                localStorage.setItem("order", JSON.stringify(this.cart));

                // tolgo il costo del prodotto dall'istanza total
                this.total -= parseFloat(product.object.price);
                // sovrascrivo total per cambiare il totale del carello del local storage
                localStorage.setItem("total", JSON.stringify(this.total));
            }
        },
        addOrder() {

            //salviamo il restaurantID che era stato salvato in local storage
            let restaurant_id = JSON.parse(localStorage.getItem("restaurantID"))

            let count = JSON.parse(localStorage.getItem("order"));
            // console.log(count.length);
            if (count === null) {
                count = 0;
            }
            // controlliamo se l'id del ristorante dell'ordinwe combaccia con quello del piatto che hai aggiunto, cioe puoi aggiungere nell'ordine solo i piatti del ristorante in cui stai facendo l'ordine
            if (count.length === 0 && !null) {
                return true
            } else if (restaurant_id != this.ristoranteSalvato) {
                return true
            } else {
                return false
            }
        },
    },
    mounted() {

        this.restaurant_id = JSON.parse(localStorage.getItem("restaurantID"))
        this.restaurant_slug = JSON.parse(localStorage.getItem("restaurantID"))
        let url = this.base_api_url + this.base_restaurants_url + "/" + this.$route.params.slug;
        this.callApi(url);
    }
}
</script>

<template>
    <AppLoading v-if="loading" />
    <main class="rest" v-else>
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
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, natus ex
                                praesentium assumenda a deserunt
                                doloribus, optio non rem reprehenderit fugit neque iure, odio nisi. Architecto eos ad
                                sunt nobis.
                                Quasi reprehenderit asperiores, quo dolorum accusamus eius illum earum atque deleniti
                                expedita nobis possimus.
                                Pariatur nulla veniam voluptate saepe tenetur earum, sequi iusto provident eos deleniti
                                ut voluptatem tempore
                                veritatis.
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

                    <section class="product">
                        <div class="product-info">
                            <section class="new-dish-display">
                                <div v-for="dish in restaurant.dishes" class="">
                                    <div v-if="dish.visibility === 1" class="new-card">
                                        <template v-if="dish.image && dish.image.startsWith('uploads')">
                                            <div class="card-image">
                                                <img :src="base_api_url + 'storage/' + dish.image" alt="">
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="card-image">
                                                <img :src="base_api_url + dish.image"
                                                    :alt="'Image of the dish: ' + dish.name">
                                            </div>
                                        </template>
                                        <div class="new-card-content">
                                            <p class="dish-name">
                                                {{ dish.name }}
                                            </p>
                                            <p class="dish-ingredients">
                                                <span>Ingredienti:</span>
                                                {{ dish.ingredients }}
                                            </p>
                                            <p class="dish-price">
                                                <span>Prezzo:</span>
                                                {{ dish.price }} &euro;
                                            </p>
                                            <button @click="openModal(dish)" class="add_to_cart">
                                                Aggiungi al carrello
                                            </button>
                                        </div>
                                        <!-- /new card content -->

                                    </div>
                                    <!-- /new card -->
                                    <div v-if="showModal" class="modal" @click.self="closeModal()">
                                        <div class="modal-content">
                                            <div class="modal-inside">
                                                <span class="close" @click="closeModal()">&times;</span>
                                                <h2>Attenzione!</h2>
                                                <p>
                                                    Hai già l'ordine di un altro ristorante nel carrello, cliccando
                                                    prosegui andrai a cancellare il vecchio ordine per far spazio al
                                                    nuovo
                                                </p>
                                                <div class="add_remove">
                                                    <button @click="orderProceed(this.dish)"
                                                        class="btn_prosegui">Prosegui</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <!-- /new-dish-dispay -->
                        </div>
                        <!-- /.row -->

                        <div class="cart">
                            <div class="icon-cart">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <h2>Carrello</h2>
                            </div>
                            <div class="text-cart">
                                <p class="tot-prod-in-cart" v-if="cart">
                                    {{ cart.length }}
                                    oggett<span v-if="cart.length == 1">o</span>
                                    <span v-else>i</span>
                                    nel carrello
                                </p>
                                <div v-for="(product, index) in cart" class="prod-cart-price">
                                    <p>
                                        {{ product.object.name }}
                                        <button class="remove_product"
                                            @click="decrease_cart_quantity(product, index)">-</button>
                                        <span class="n_off_poducts">{{ product.quantity }}</span>
                                        <button class="add_product" @click="increase_cart_quantity(product)">+</button>
                                    </p>
                                    <p class="prod-price">Totale prodotto: <span>{{ product.price }} &euro;</span> </p>
                                </div>
                            </div>
                            <p class="tot-cart" v-if="this.total > 0">Totale carrello: {{ this.total.toFixed(2) }}
                                &euro;</p>

                            <div v-if="!addOrder()" class="ordina">
                                <router-link :to="{ name: 'order' }" class="pay">
                                    Ordina
                                </router-link>
                            </div>

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