<script>


export default {
    name: 'NotFound',
    data() {
        return {
            not_found: true,
        };
    },
    methods: {
        hasHistory() { return window.history.length > 2 }
    }
};
</script>

<template>
    <div class="container_404">
        <div class="banner_404">
            <h1>404</h1>
            <h2>Pagina non trovata!</h2>
            <div class="return_home">
                <button @click="hasHistory() ? $router.go(-2) : $router.push('/')" class="btn_return">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    Indietro
                </button>
            </div>
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
        background-color: rgb(224, 224, 224);
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.4) 3px 3px 29px 0px;
        color: rgb(142, 121, 248);

        &>h1 {
            font-size: 90px;
        }

        .btn_return {
            background-color: rgb(142, 121, 248);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 5px;
            border: none;

            &:hover {
                background-color: rgba(109, 72, 178, 1);
                cursor: pointer;
            }
        }
    }
}
</style>