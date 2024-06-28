<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';


export default {
    name: 'AppOrder',
    data() {
        return {
            cart: null,
            total_price: null,
            customer_name: '',
            customer_lastname: '',
            customer_address: '',
            customer_phone_number: '',
            customer_email: '',
            customer_note: '',
            loading: false,
            success: false,
            errorMessage: '',
            formErrors: {},
            restaurant_name: '',
            restaurant_slug: '',
            myToken: '',
            base_api_url: 'http://127.0.0.1:8000/api/',
            orderDone: false,
            paymentMethodNonce: null,
            instance: null,
            paymentMessage: '',
            orderMessage: '',
            errors: '',
            cantYouPay: null,
            orderToPrint: "",
            errors: '',

        }
    },
    methods: {

        giveMeToken() {
            let url = this.base_api_url + "pay/token";
            //console.log(url);
            // Aggiungo un ritardo di 1 secondo prima di eseguire la richiesta
            axios
                .get(url)
                .then(response => {
                    //Ecco il token!
                    //console.log(response.data.clientToken);
                    this.myToken = response.data.clientToken;
                    this.initializeBraintree();
                })
                .catch(error => {
                    console.error('Error getting token:', error);
                });
        },

        initializeBraintree() {
            const button = document.querySelector('#submit-button');

            dropin.create({
                authorization: this.myToken,
                container: '#dropin-container',
                locale: 'it_IT'
            }, (createErr, instance) => {
                if (createErr) {
                    console.error('Error creating Braintree Drop-in:', createErr);
                    return;
                }
                this.instance = instance
                //console.log(instance);
            });
        },

        newOrder() {
            // Validazione del form
            if (!this.validateForm()) {
                return;
            }
            //caricamento in corso
            this.loading = true;
            //chiedo al metodo pay il nonce 
            this.pay()
                //continuo solo se ho ottenuto il nonce da pay
                .then(paymentMethodNonce => {
                    //prendo i valori dallo
                    const restaurant_id = JSON.parse(localStorage.getItem("restaurantID"));
                    const total_price = JSON.parse(localStorage.getItem("total"));
                    const cartItems = JSON.parse(localStorage.getItem("order"));

                    //preparo i dati per la richiesta post al server
                    const data = {
                        restaurant_id: restaurant_id,
                        customer_name: this.customer_name,
                        customer_lastname: this.customer_lastname,
                        customer_address: this.customer_address,
                        customer_phone_number: this.customer_phone_number,
                        customer_email: this.customer_email,
                        customer_note: this.customer_note,
                        total_price: total_price,
                        cartItems: cartItems,
                        paymentMethodNonce: paymentMethodNonce
                    };

                    //faccio la chiamata api una volta che ho la certezza che tutto sia al suo posto
                    return axios.post(this.base_api_url + 'add-order', data);
                })

                //stessa cosa di prima, gestendo la risposta del server
                .then(response => {
                    //la risposta
                    console.log(response);

                    //se va a buon fine
                    if (response.data.success) {

                        this.customer_name = '';
                        this.customer_lastname = '';
                        this.customer_address = '';
                        this.customer_phone_number = '';
                        this.customer_email = '';
                        this.customer_note = '';
                        this.errors = '';
                        this.success = response.data.message;
                        this.orderDone = true;
                        this.orderMessage = 'Ordine effettuato con successo';
                        this.paymentMessage = ''
                        this.cantYouPay = false
                        this.orderToPrint = response.data.order,
                            console.log(response.data.order);
                        //chiudo il drop-in di Braintree
                        this.instance.teardown(teardownErr => {
                            if (teardownErr) {
                                console.error('Could not tear down Drop-in UI:', teardownErr);
                            } else {

                                localStorage.clear();
                                console.info('Drop-in UI has been torn down successfully.');
                            }
                        });
                        //se ci sono errori li salviamo per mostrali all'utente
                    } else if (response.data.errors) {/*  */
                        this.success = false;
                        this.errors = response.data.errors;
                    }

                    //Reimpostiamo false perché l'operazione è terminata
                    this.loading = false;
                })

                //gestisco altri errori durante il processo
                .catch(err => {
                    console.error(err);
                    this.loading = false;
                    this.cantYouPay = true;
                    this.errorMessage = "Abbiamo riscontrato qualche problema con la transazione, riprova"
                    this.giveMeToken()
                });
        },

        pay() {
            //dichiaro una promessa per gestire le operazioni asincrone
            return new Promise((resolve, reject) => {
                //verifico di aver inizializzato l'istanza di Brainfree
                if (this.instance) {
                    //richiedo il pagamento
                    this.instance.requestPaymentMethod((err, payload) => {
                        //se non va bene c'è un errore
                        if (err) {
                            console.error('Error requesting payment method:', err);
                            //promessa respinta 
                            reject(err);
                        }
                        else {
                            //promessa mantenuta e passaggio del parametro
                            resolve(payload.nonce);
                        }
                    });
                    //restituisco un errore nel caso l'istanza non esista
                } else {
                    reject(new Error('Braintree instance not initialized.'));
                }
            });
        },

        createCart() {
            // Recupero i dati dal localStorage
            let order = localStorage.getItem('order');
            if (order) {
                // parso i dati JSON
                let orderItems = JSON.parse(order);

                //li vedo
                //console.log(orderItems);
                return orderItems;
            }
        },

        validateForm() {
            this.formErrors = {};
            let isValid = true;

            //verifica nome
            if (!this.customer_name || this.customer_name.length < 3) {
                this.formErrors.customer_name = ['Questo campo deve contenere almeno 3 caratteri'];
                isValid = false;
            }

            //verifica cognome
            if (!this.customer_lastname || this.customer_lastname.length < 3) {
                this.formErrors.customer_lastname = ['Questo campo deve contenere almeno 3 caratteri'];
                isValid = false;
            }

            //verifica indirizzo
            if (!this.customer_address || this.customer_address.length < 6) {
                this.formErrors.customer_address = ['Questo campo deve contenere almeno 6 caratteri'];
                isValid = false;
            }

            // Verifica numero di telefono
            if (!this.customer_phone_number || this.customer_phone_number.length < 10 || !/^\d{10,}$/.test(this.customer_phone_number)) {
                this.formErrors.customer_phone_number = ['Questo campo deve essere un numero di almeno 10 cifre'];
                isValid = false;
            }

            //modo di verificare che la stringa inserista sia una mail 
            if (!this.customer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customer_email)) {
                this.formErrors.customer_email = ['Questo campo deve essere un indirizzo email valido'];
                isValid = false;
            }

            return isValid;
        },

        canYouOrder() {
            this.total_price = JSON.parse(localStorage.getItem("total"))
            this.restaurant_name = JSON.parse(localStorage.getItem("restaurant_name"))
            this.restaurant_slug = JSON.parse(localStorage.getItem("restaurant_slug"))
        }

    },
    mounted() {
        window.scrollTo(0, 0);
        this.total_price = JSON.parse(localStorage.getItem("total"))
        this.restaurant_name = JSON.parse(localStorage.getItem("restaurant_name"))
        this.restaurant_slug = JSON.parse(localStorage.getItem("restaurant_slug"))
        this.cart = this.createCart()
        this.giveMeToken()
    }
}
</script>

<template>
    <section class="order p-5" v-if="this.total_price > 0">

        <router-link :to="{ path: '/restaurant/' + this.restaurant_slug }" class="btn_back">
            <span>
                <i class="fa-solid fa-circle-arrow-left"></i>
                Torna al ristorante
            </span>
        </router-link>

        <div class="container">
            <!-- alert di successo del campo form lato laravel-->
            <template v-if="success">
                <div class="alert alert-success">
                    <div class="info">{{ success }}</div>
                    <div class="" @click="success = !success">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </template>

            <!-- alert di errore del campo form lato laravel -->
            <template v-if="errors">
                <div class="alert alert-danger">
                    <div class="info">
                        <h4 class="py-1">Errors:</h4>
                        <ul class="list-errors">
                            <li v-for="error in errors">{{ error[0] }}</li>
                        </ul>
                    </div>
                    <div class="" @click="errors = !errors">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </template>



            <h2 v-if="!this.orderDone" class="fw_bold text_center">Inserisci i tuoi dati per completare l'ordine</h2>

            <div class="row">

                <div class="col">
                    <form v-if="!this.orderDone" action="" method="post" @submit.prevent="newOrder">

                        <div class="mb-3">
                            <label for="customer_name" class="form-label">Nome *</label>
                            <input type="text" class="form-control pad-3" name="customer_name" id="customer_name"
                                aria-describedby="helpId" v-model="customer_name"
                                :class="{ 'border-red': formErrors.customer_name }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="formErrors.customer_name">
                                <div class="text-red" v-for="error in formErrors.customer_name" :key="error">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /name -->
                        <div class="mb-3">
                            <label for="customer_lastname" class="form-label">Cognome *</label>
                            <input type="text" class="form-control pad-3" name="customer_lastname"
                                id="customer_lastname" aria-describedby="helpId" v-model="customer_lastname"
                                :class="{ 'border-red': formErrors.customer_lastname }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="formErrors.customer_lastname">
                                <div class="text-red" v-for="error in formErrors.customer_lastname" :key="error">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /lastname -->
                        <div class="mb-3">
                            <label for="customer_address" class="form-label">Indirizzo *</label>
                            <input type="text" class="form-control pad-3" name="customer_address" id="customer_address"
                                aria-describedby="helpId" v-model="customer_address"
                                :class="{ 'border-red': formErrors.customer_address }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="formErrors.customer_address">
                                <div class="text-red" v-for="error in formErrors.customer_address" :key="error">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /address -->
                        <div class="mb-3">
                            <label for="customer_phone_number" class="form-label">Telefono *</label>
                            <input type="text" class="form-control pad-3" name="customer_phone_number"
                                id="customer_phone_number" aria-describedby="helpId" v-model="customer_phone_number"
                                :class="{ 'border-red': formErrors.customer_phone_number }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="formErrors.customer_phone_number">
                                <div class="text-red" v-for="error in formErrors.customer_phone_number" :key="error">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /phone number -->
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="customer_email" class="form-label">Email *</label>
                                <input type="email" class="form-control pad-3" name="customer_email" id="customer_email"
                                    v-model="customer_email" :class="{ 'border-red': formErrors.customer_email }" />
                                <!-- errore di validazione lato laravel -->
                                <template v-if="formErrors.customer_email">
                                    <div class="text-red" v-for="error in formErrors.customer_email" :key="error">
                                        {{ error }}
                                    </div>
                                </template>
                            </div>
                        </div>
                        <!-- /email -->
                        <div class="mb-3">
                            <label for="customer_note" class="form-label">Note</label>
                            <textarea class="form-control pad-3" name="customer_note" id="customer_note" rows="3"
                                v-model="customer_note" :class="{ 'border-red': formErrors.customer_note }"></textarea>
                            <!-- errore di validazione lato laravel -->
                            <template v-if="formErrors.customer_note">
                                <div class="text-red" v-for="error in formErrors.customer_note" :key="error">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /notes -->
                        <button @click="this.cantYouPay = false" id="submit-button" type="submit" class="btn_pay"
                            :disabled="loading">
                            <template v-if="!loading">
                                <span>Paga</span>
                            </template>
                            <template v-else>
                                <i class="fa-regular fa-paper-plane px-1"></i>
                                ATTENDI....
                            </template>
                        </button>
                    </form>
                    <!-- /form -->
                    <template v-if="orderMessage">
                        {{ (this.formErrors = null), (this.paymentMessage = '') }}
                        <div class="alert alert-success mt-3">
                            <div class="info">{{ orderMessage }}</div>
                        </div>
                        <router-link :to="{ name: 'Home' }" class="btn_pay">
                            <span>
                                Torna alla home
                            </span>
                        </router-link>
                    </template>
                </div>
                <!-- /.col -->

                <div class="col">
                    <div class="card">
                        <h3>Riepilogo ordine</h3>
                        <p class="restaurant_name">{{ restaurant_name }}</p>
                        <div>
                            <ul>
                                <li v-for="dish in this.cart" :key="dish.object.id">
                                    {{ dish.object.name }} <span> x{{ dish.quantity }}</span>
                                </li>
                            </ul>
                        </div>
                        <p v-if="total_price"> <span class="fw_bold">Totale Ordine:</span>
                            {{ total_price.toFixed(2) }} &euro;</p>

                        <template v-if="orderMessage">
                            {{ (this.formErrors = null), (this.paymentMessage = '') }}
                            <hr>
                            <h4>Indirizzo di spedizione</h4>
                            <p>
                                {{ orderToPrint.customer_name }}
                                {{ orderToPrint.customer_lastname }}
                            </p>
                            <p>
                                {{ orderToPrint.customer_address }}
                            </p>
                            <p>
                                {{ orderToPrint.customer_phone_number }}
                            </p>
                            <p>
                                {{ orderToPrint.customer_email }}
                            </p>
                            <p v-if="orderToPrint.customer_note">
                                Note: {{ orderToPrint.customer_note }}
                            </p>
                        </template>

                        <div class="my_container">
                            <!-- Messaggio per la carta rifiutata -->
                            <div id="dropin-wrapper">
                                <div id="checkout-message"></div>
                                <div id="dropin-container"></div>
                            </div>

                            <!-- Messaggio per la carta accettata -->
                            <template v-if="paymentMessage">
                                <div class="alert alert-success">
                                    <div class="info">{{ paymentMessage }}</div>
                                </div>
                            </template>

                            <template v-if="this.cantYouPay">
                                <div class="alert alert-danger">
                                    <div class="info">{{ this.errorMessage }}</div>
                                </div>
                            </template>

                        </div>
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <section v-else>Non hai nulla nel carrello!</section>
    <!-- /.order -->
</template>

<style>
@import '../css/_order.css';

.alert {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border: 3px solid;
    border-radius: 10px;
}

.alert-success {
    border-color: green;
    background-color: rgba(0, 128, 0, 0.395);
    margin-bottom: 2rem;
}

.alert-danger {
    border-color: red;
    background-color: rgba(255, 0, 0, 0.376);
}

.border-red {
    border: 2px solid red !important;
}


.text-red {
    color: red !important;
}

.list-errors {
    padding: 10px 20px;
}

.my_container {

    margin: auto;
}

.fw_bold {
    font-weight: bold;

}

.text_center {
    text-align: center;
}
</style>