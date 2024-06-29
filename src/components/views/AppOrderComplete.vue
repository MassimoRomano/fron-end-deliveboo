<script>

</script>

<template>

    <div class="order_completed">

        <div class="container">
            <h1 class="title">Grazie per il tuo ordine!</h1>
            <p>Abbiamo provvedeuto a mandare tutti i dettagli alla tua email!</p>
            <p>Buon appetito!</p>

            <router-link :to="{ name: 'Home' }" class="btn_pay">
                <span>
                    Torna alla home
                </span>
            </router-link>
        </div>
        <!-- /.container -->
    </div>

</template>

<style>
@import '../css/_order_complete.css';
</style>