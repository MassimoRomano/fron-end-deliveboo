<script>
import { store } from '../store.js';
export default {
    name: 'AppCart',
    data() {
        return {
            store,
        };
    },
    mounted() {
        //Azzero il carrello
        this.store.Cart.items = 0
    }
};
</script>

<template>

    <div class="order_completed">
        <div class="completed">
            <div class="completed-text">
                <h1 class="title">Grazie per il tuo ordine!</h1>
                <p>Abbiamo provvedeuto a mandare tutti i dettagli alla tua email!</p>
                <p>Buon appetito!</p>

                <router-link :to="{ name: 'Home' }" class="btn_pay">
                    <span>
                        Torna alla home
                    </span>
                </router-link>
            </div>
        </div>
        <!-- /.container -->
    </div>

</template>

<style>
@import '../css/_order_complete.css';
</style>