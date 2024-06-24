<script>
import axios from 'axios';

export default {
    name: 'AppOrder',
    data() {
        return {
            customer_name: null,
            customer_lastname: null,
            customer_address: null,
            customer_phone_number: null,
            customer_email: null,
            customer_note: null,
            total_price: null,
        }
    },
    methods: {
        newOrder() {
            const url = "http://127.0.0.1:8000/api/add-order";
            const data = {
                customer: {
                    customer_name: this.customer_name,
                    customer_lastname: this.customer_lastname,
                    customer_address: this.customer_address,
                    customer_phone_number: this.customer_phone_number,
                    customer_email: this.customer_email,
                    customer_note: this.customer_note,
                    total_price: this.total_price,
                    restaurant_id: JSON.parse(localStorage.getItem("restaurantID")),
                    total_price: JSON.parse(localStorage.getItem("total")),
                },
                cartItems: JSON.parse(localStorage.getItem("order")),
            };
            console.log(url, data);
        },
    },
    mounted() {
    }
}
</script>

<template>
    <section class="order">
        <div class="container">
            <h2 class="order_title">Inserisci i tuoi dati per completare l'ordine</h2>
            <div class="row">
                <div class="col">
                    <h3>Ristorante NOME</h3>
                    <p>Prezzo totale</p>
                </div>
                <!-- /.col -->
                <div class="col">
                    <form action="" method="post" @submit.prevent="newOrder()">
                        <div class="mb-3">
                            <label for="customer_name" class="form-label">Nome</label>
                            <input type="text" class="form-control pad-3" name="customer_name" id="customer_name"
                                aria-describedby="helpId" v-model="customer_name" />
                        </div>
                        <!-- /name -->
                        <div class="mb-3">
                            <label for="customer_lastname" class="form-label">Cognome</label>
                            <input type="text" class="form-control pad-3" name="customer_lastname"
                                id="customer_lastname" aria-describedby="helpId" v-model="customer_lastname" />
                        </div>
                        <!-- /lastname -->
                        <div class="mb-3">
                            <label for="customer_address" class="form-label">Indirizzo</label>
                            <input type="text" class="form-control pad-3" name="customer_address" id="customer_address"
                                aria-describedby="helpId" v-model="customer_address" />
                        </div>
                        <!-- /address -->
                        <div class="mb-3">
                            <label for="customer_phone_number" class="form-label">Telefono</label>
                            <input type="" class="form-control pad-3" name="customer_phone_number"
                                id="customer_phone_number" aria-describedby="helpId" v-model="customer_phone_number" />
                        </div>
                        <!-- /phone number -->
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="customer_email" class="form-label">Email</label>
                                <input type="email" class="form-control pad-3" name="customer_email" id="customer_email"
                                    v-model="customer_email" />
                            </div>
                        </div>
                        <!-- /email -->
                        <div class="mb-3">
                            <label for="customer_note" class="form-label">Note</label>
                            <textarea class="form-control pad-3" name="customer_note" id="customer_note" rows="3"
                                v-model="customer_note"></textarea>
                        </div>
                        <!-- /notes -->
                        <button type="submit" class="btn_pay">
                            <span>Conferma e vai al pagamento</span>
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
</style>