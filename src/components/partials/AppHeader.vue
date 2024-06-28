<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            dropdownVisible: false,
            cartQuantity: 0, // Initialize cart quantity
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        goToCart() {
            this.$router.push({ name: 'restaurant' });
        },
        updateCartQuantity() {
            let cart = JSON.parse(localStorage.getItem("order")) || [];
            this.cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        }
    },
    mounted() {
        this.updateCartQuantity();
        window.addEventListener('storage', this.updateCartQuantity);
    },
    beforeDestroy() {
        window.removeEventListener('storage', this.updateCartQuantity);
    }
}
</script>

<template>
    <header>
        <div class="navbar">
            <div class="container">
                <div class="head">
                    <div class="logo">
                        <h2><router-link :to="{ name: 'Home' }"><i class="fa-solid fa-utensils"></i>
                                Deliveboo</router-link></h2>
                    </div>
                    <div class="menu-head">
                        <button :class="{'dropdown-button': true, 'active': dropdownVisible}" @click="toggleDropdown">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <div class="dropdown-content" :class="{ show: dropdownVisible }">
                            <a href="http://127.0.0.1:8000" target="_blank">Collabora con noi</a>
                            <a href="http://127.0.0.1:8000/register" target="_blank">Registrati o Accedi</a>
                            <a href="http://127.0.0.1:8000/login" target="_blank">Account</a>
                        </div>
                        <div class="menu-links">
                            <a href="http://127.0.0.1:8000" target="_blank">Collabora con noi</a>
                            <a href="http://127.0.0.1:8000/register" target="_blank">Registrati o Accedi</a>
                            <a href="http://127.0.0.1:8000/login" target="_blank">Account</a>
                            <div class="cart-icon" @click="goToCart">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span v-if="cartQuantity" class="cart-quantity">{{ cartQuantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
@import '../css/_header.css';
</style>