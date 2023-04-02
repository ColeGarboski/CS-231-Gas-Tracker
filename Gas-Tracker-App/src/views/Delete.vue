
<template>
    <h1>delete</h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

function deleteGasPrice(id) {
  axios.delete(`http://localhost:3000/gas-prices/${id}`)
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
