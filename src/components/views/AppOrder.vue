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
                    <form action="" method="post">
                        <div class="mb-3">
                            <label for="customer_name" class="form-label">Nome</label>
                            <input type="text" class="form-control pad-3" name="customer_name" id="customer_name"
                                aria-describedby="helpId" />
                        </div>
                        <!-- /name -->
                        <div class="mb-3">
                            <label for="customer_lastname" class="form-label">Cognome</label>
                            <input type="text" class="form-control pad-3" name="customer_lastname"
                                id="customer_lastname" aria-describedby="helpId" />
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
                            <input type="" class="form-control pad-3" name="customer_phone_number"
                                id="customer_phone_number" aria-describedby="helpId" />
                        </div>
                        <!-- /phone number -->
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="customer_email" class="form-label">Email</label>
                                <input type="email" class="form-control pad-3" name="customer_email"
                                    id="customer_email" />
                            </div>
                        </div>
                        <!-- /email -->
                        <div class="mb-3">
                            <label for="customer_note" class="form-label">Note</label>
                            <textarea class="form-control pad-3" name="customer_note" id="customer_note"
                                rows="3"></textarea>
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