
<template>
    <h1>update</h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

function updateGasPrice(id) {
  axios.put(`http://localhost:3000/gas-prices/${id}`)
    .then(() => {
      fetchGasPrices();
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>

</style>
