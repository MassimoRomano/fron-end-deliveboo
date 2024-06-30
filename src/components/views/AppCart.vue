<script>
import { store } from '../store.js';
export default {
    name: 'AppCart',
    data() {
        return {
            store,
            cartQuantity: 0, // Modifica questo valore con la quantità reale
        };
    },
    methods: {
        goToRestaurant() {
            const restaurantSlug = JSON.parse(localStorage.getItem("restaurant_slug"));
            if (restaurantSlug) {
                this.$router.push({ name: 'restaurant', params: { slug: restaurantSlug } });
            }
        },
    },
};

</script>


<template>
    <div class="app-carrello">
        <div class="carrello-wrapper" @click="this.goToRestaurant()">
            <!-- Icona del carrello -->
            <i class="carrello-icon fa-solid fa-cart-shopping"></i>
            <!-- Nuvoletta con la quantità nel carrello -->
            <span class="carrello-quantity">{{ store.Cart.items.length }}</span>
        </div>
        <!-- Aggiungi qui il contenuto del carrello -->
    </div>
</template>

<style>
.app-carrello {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    /* Assicura che il carrello sia sopra gli altri elementi */
}

.carrello-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #8a2be2;
    /* Colore viola del cerchio */
    border-radius: 50%;
    /* Forma circolare */
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    /* Ombra leggera */
    transition: background-color 0.3s ease;
    /* Transizione per il cambio di colore al passaggio del mouse */
}

.carrello-wrapper:hover {
    background-color: #6b1d9e;
    /* Cambio di colore al passaggio del mouse */
}

.carrello-icon {
    font-size: 24px;
    color: white;
}

.carrello-quantity {
    position: absolute;
    top: -10px;
    /* Posiziona la nuvoletta sopra l'icona */
    right: -10px;
    /* Allinea la nuvoletta a destra dell'icona */
    background-color: red;
    /* Colore di sfondo della nuvoletta */
    color: white;
    /* Colore del testo */
    border-radius: 50%;
    /* Forma circolare */
    padding: 2px 6px;
    /* Spaziatura interna */
    font-size: 14px;
    /* Dimensione del testo */
    font-weight: bold;
    /* Testo in grassetto */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
