<script>
export default{
    name: 'AppHeader',
    mounted(){
        
    }
}
</script>

<template>
    <header>
        <div class="navbar">
            <div class="container">
                <div class="head">
                    <div class="logo">
                        <h2><router-link :to="{name:'Home'}"><i class="fa-solid fa-utensils"></i> Deliveboo</router-link></h2>
                    </div>
                    <div class="menu">
                        <a href="">Collabora con noi</a>
                        <a href="">Registrati o Accedi</a>
                        <a href="">Account</a>
                        <a href=""><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
@import '../css/_header.css';
</style>