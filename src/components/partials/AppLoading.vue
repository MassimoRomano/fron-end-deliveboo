<script>
export default {
    name: 'AppLoading'
}
</script>

<template>
    <div class="loading-page">
        <div class="load"></div>
        <p>Caricamento...</p>
    </div>
</template>

<style>
.loading-page {
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
}

.load {
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: #333;
  border-radius: 100%;
  animation: scale 1.0s infinite ease-in-out;
}

@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>