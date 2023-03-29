<template>
  <div>
    <h2 class="text-6xl">Gas Prices</h2>
    <ul>
      <li v-for="(gasPrice, index) in gasPrices" :key="index">
        <span>{{ gasPrice.StationName }}: </span>
        <span>{{ gasPrice.FuelTypeName }}: </span>
        <span>{{ getEmoji(gasPrice.FuelTypeName) }} </span>
        <span>${{ gasPrice.Price.toFixed(2) }} </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const gasPrices = ref([]);

async function fetchGasPrices() {
  try {
    const response = await axios.get('http://localhost:3000/gas-prices');
    gasPrices.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

// Helper function to get the appropriate emoji based on the fuel type
function getEmoji(fuelType) {
  switch (fuelType.toLowerCase()) {
    case 'regular':
      return '⛽️';
    case 'premium':
      return '🚀';
    case 'diesel':
      return '🚚';
    case 'electric':
      return '🔌';
    case 'compressed natural gas':
      return '🌳';
    case 'biofuel':
      return '🌿';
    default:
      return '❓';
  }
}

onMounted(() => {
  fetchGasPrices();
});
</script>

<style scoped>

</style>