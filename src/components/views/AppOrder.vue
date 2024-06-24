<script>
import axios from 'axios';

export default {
    name: 'AppOrder',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<template>
    <div class="container_order">
        <h3 class="order_title">Inserisci i tuoi dati per cmpletare l'ordine</h3>
        <h5>Ristorante <!-- {{  resturant.name }} --></h5>
        <p>Prezzo totale</p>
        <form action="" method="post" class="order_form">
            <div class="mb-3">
                <label for="customer_name" class="form-label">Nome</label>
                <input type="text" class="form-control pad-3" name="customer_name" id="customer_name"
                    aria-describedby="helpId" />
            </div>
            <!-- /name -->
            <div class="mb-3">
                <label for="customer_lastname" class="form-label">Cognome</label>
                <input type="text" class="form-control pad-3" name="customer_lastname" id="customer_lastname"
                    aria-describedby="helpId" />
            </div>
            <!-- /lastname -->
            <div class="mb-3">
                <label for="customer_address" class="form-label">Indirizzo</label>
                <input type="text" class="form-control pad-3" name="customer_address" id="customer_address"
                    aria-describedby="helpId" />
            </div>
            <!-- /address -->
            <div class="mb-3">
                <label for="customer_phone_number" class="form-label">Telefono</label>
                <input type="" class="form-control pad-3" name="customer_phone_number" id="customer_phone_number"
                    aria-describedby="helpId" />
            </div>
            <!-- /phone number -->
            <div class="mb-3">
                <div class="mb-3">
                    <label for="customer_email" class="form-label">Email</label>
                    <input type="email" class="form-control pad-3" name="customer_email" id="customer_email" />
                </div>
            </div>
            <!-- /email -->
            <div class="mb-3">
                <label for="customer_note" class="form-label">Note</label>
                <textarea class="form-control pad-3" name="customer_note" id="customer_note" rows="3"></textarea>
            </div>
            <!-- /notes -->
            <button type="submit">Conferma e paga</button>
        </form>
        <!-- /form -->
    </div>
    <!-- /.container -->
</template>

<style>
@import '/src/components/css/_restaurant.css';

.container_order {
    margin: 0 auto;
    width: 80%;
}

.order_title {
    margin: 3rem auto 0.5rem;
}

.order_form {
    display: flex;
    align-items: start;
    flex-direction: column;
}

.pad-3 {
    padding: 0.3rem;
    margin: 1rem 0.3rem;
}
</style>