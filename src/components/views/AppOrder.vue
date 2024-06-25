<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';


export default {
    name: 'AppOrder',
    data() {
        return {
            total_price: null,
            customer_name: '',
            customer_lastname: '',
            customer_address: '',
            customer_phone_number: '',
            customer_email: '',
            customer_note: '',
            loading: false,
            errors: false,
            success: false,
            restaurant_name: '',
            myToken: '',
            base_api_url: 'http://127.0.0.1:8000/api/',
            paymentDone: false
        }
    },
    methods: {
        giveMeToken() {
            let url = this.base_api_url + "pay/token";
            console.log(url);
            // Aggiungo un ritardo di 1 secondo prima di eseguire la richiesta
            /* setTimeout(() => { */
            axios
                .get(url)
                .then(response => {
                    //Ecco il token!
                    console.log(response.data.clientToken);
                    this.myToken = response.data.clientToken;
                    this.initializeBraintree();
                })
                .catch(error => {
                    console.error('Error getting token:', error);
                });
            /* }, 1000); */
        },

        initializeBraintree() {
            const button = document.querySelector('#submit-button');

            dropin.create({
                authorization: this.myToken,
                container: '#dropin-container'
            }, (createErr, instance) => {
                if (createErr) {
                    console.error('Error creating Braintree Drop-in:', createErr);
                    return;
                }

                button.addEventListener('click', () => {
                    instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                        if (requestPaymentMethodErr) {
                            console.error('Error requesting payment method:', requestPaymentMethodErr);
                            return;
                        }
                        console.log(this.base_api_url + 'process-payment', { paymentMethodNonce: payload.nonce });
                        axios.post(this.base_api_url + 'process-payment', { paymentMethodNonce: payload.nonce, total_price: this.total_price })
                            .then(response => {
                                const result = response.data;
                                console.log(result);

                                this.orderDone = result.success
                                // console.log(this.orderDone)
                                // Tear down the Drop-in UI
                                instance.teardown(teardownErr => {
                                    if (teardownErr) {
                                        console.error('Could not tear down Drop-in UI!');
                                    } else {
                                        console.info('Drop-in UI has been torn down!');
                                        button.remove();
                                    }
                                });
                                console.log(result.success);
                                if (result.success) {
                                    document.querySelector('#checkout-message').innerHTML = `
                    <h1>Success</h1>
                    <p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p>
                    <p>Refresh to try another transaction.</p>
                  `;
                                } else {
                                    console.log(result);
                                    document.querySelector('#checkout-message').innerHTML = `
                    <h1>Error</h1>
                    <p>Check your console.</p>
                  `;
                                }
                            })
                            .catch(error => {
                                console.error('Error processing payment:', error);
                                document.querySelector('#checkout-message').innerHTML = `
                  <h1>Error</h1>
                  <p>Check your console.</p>
                  `;
                            });
                    });
                });
            });
        },


        newOrder() {

            this.loading = true;
            const url = "http://127.0.0.1:8000/api/add-order";
            const restaurant_id = JSON.parse(localStorage.getItem("restaurantID"));
            const total_price = JSON.parse(localStorage.getItem("total"));
            const cartItems = JSON.parse(localStorage.getItem("order"));
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
            };
            // console.log(url, data);
            axios.post(url, data).then(response => {
                console.log(response);

                // se ho sucesso con la compilazione dei dati del form
                if (response.data.success) {
                    this.customer_name = '';
                    this.customer_lastname = '';
                    this.customer_address = '';
                    this.customer_phone_number = '';
                    this.customer_email = '';
                    this.customer_note = '';
                    this.errors = false;
                    // console.log(response.data)
                    // inserisci il messaggio di successo nell'istanza di successo
                    this.success = response.data.message;
                    this.orderDone = true;
                } else if (response.data.errors) {//altrimenti se ti da errore
                    this.success = false;
                    // console.log(response.data)
                    // inserisci il messaggio di errore nell'istanza di errore
                    this.errors = response.data.errors;
                    // console.log(this.errors);
                }
                this.loading = false;
            }).catch(err => {
                console.error(err);
            })
        },
        checkFormData() {
            return true;
        }

    },
    mounted() {
        this.total_price = JSON.parse(localStorage.getItem("total"))
        this.restaurant_name = JSON.parse(localStorage.getItem("restaurant_name"))
    }
}
</script>

<template>
    <section class="order p-5">
        <div class="container">

            <!-- alert di successo del campo form lato laravel-->




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


            <h2 v-if="!this.orderDone" class="order_title">Inserisci i tuoi dati per completare l'ordine</h2>
            <div class="row">
                <div class="col">
                    <h3>{{ restaurant_name }}</h3>
                    <p v-if="total_price">Totale Ordine: {{ total_price.toFixed(2) }} &euro;</p>
                </div>
                <div class="my_container">
                    <div id="dropin-wrapper">
                        <div id="checkout-message"></div>
                        <div id="dropin-container"></div>
                        <button id="submit-button">Submit payment</button>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col">


                    <form v-if="!this.orderDone" action="" method="post" @submit.prevent="newOrder()">
                        <div class="mb-3">
                            <label for="customer_name" class="form-label">Nome*</label>
                            <input type="text" class="form-control pad-3" name="customer_name" id="customer_name"
                                aria-describedby="helpId" v-model="customer_name"
                                :class="{ 'border-red': errors.customer_lastname }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="errors.customer_name">
                                <div class="text-red" v-for="error in errors.customer_name">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /name -->
                        <div class="mb-3">
                            <label for="customer_lastname" class="form-label">Cognome*</label>
                            <input type="text" class="form-control pad-3" name="customer_lastname"
                                id="customer_lastname" aria-describedby="helpId" v-model="customer_lastname"
                                :class="{ 'border-red': errors.customer_lastname }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="errors.customer_lastname">
                                <div class="text-red" v-for="error in errors.customer_lastname">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /lastname -->
                        <div class="mb-3">
                            <label for="customer_address" class="form-label">Indirizzo*</label>
                            <input type="text" class="form-control pad-3" name="customer_address" id="customer_address"
                                aria-describedby="helpId" v-model="customer_address"
                                :class="{ 'border-red': errors.customer_address }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="errors.customer_address">
                                <div class="text-red" v-for="error in errors.customer_address">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /address -->
                        <div class="mb-3">
                            <label for="customer_phone_number" class="form-label">Telefono*</label>
                            <input type="" class="form-control pad-3" name="customer_phone_number"
                                id="customer_phone_number" aria-describedby="helpId" v-model="customer_phone_number"
                                :class="{ 'border-red': errors.customer_phone_number }" />
                            <!-- errore di validazione lato laravel -->
                            <template v-if="errors.customer_phone_number">
                                <div class="text-red" v-for="error in errors.customer_phone_number">
                                    {{ error }}
                                </div>
                            </template>
                        </div>
                        <!-- /phone number -->
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="customer_email" class="form-label">Email*</label>
                                <input type="email" class="form-control pad-3" name="customer_email" id="customer_email"
                                    v-model="customer_email" :class="{ 'border-red': errors.customer_email }" />
                                <!-- errore di validazione lato laravel -->
                                <template v-if="errors.customer_email">
                                    <div class="text-red" v-for="error in errors.customer_email">
                                        {{ error }}
                                    </div>
                                </template>
                            </div>
                        </div>
                        <!-- /email -->
                        <div class="mb-3">
                            <label for="customer_note" class="form-label">Note</label>
                            <textarea class="form-control pad-3" name="customer_note" id="customer_note" rows="3"
                                v-model="customer_note" :class="{ 'border-red': errors.customer_note }"></textarea>
                            <!-- errore di validazione lato laravel -->
                            <template v-if="errors.customer_note">
                                <div class="text-red" v-for="error in errors.customer_note">
                                    {{ error }}
                                </div>
                            </template>
                        </div>



                        <!-- /notes -->
                        <button type="submit" class="btn_pay" :disabled="loading" v-if="checkFormData()">
                            {{ giveMeToken() }}

                            <template v-if="loading == false && orderDone == true">
                                procedi con l'ordine
                            </template>



                            <template v-else>
                                <i class="fa-regular fa-paper-plane px-1"></i>
                                ATTENDI....
                            </template>
                        </button>
                    </form>
                    <!-- /form -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
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

.btn_pay {
    padding: 0.75rem 0.5rem;
    background-color: dark;
    color: white;
    border: 5px;
}

.list-errors {
    padding: 10px 20px;
}

.my_container {
    width: 50%;
    margin: auto;
}
</style>