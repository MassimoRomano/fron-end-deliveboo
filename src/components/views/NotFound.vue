<script>


export default {
    name: 'NotFound',
    data() {
        return {
            not_found: true,
        };
    },
};
</script>

<template>
    <div class="container_404">
        <div class="banner_404">
            <h1>404</h1>
            <h2>Page NotFound!</h2>
        </div>
    </div>
</template>


<style>
@import '../css/_search.css';

.container_404 {
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .banner_404 {
        padding: 20px;
        text-align: center;
        max-width: 800px;
        width: 90%;
        border: 2px solid;
    }
}
</style>