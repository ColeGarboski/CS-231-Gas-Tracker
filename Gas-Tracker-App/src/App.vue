<template>
  <div class="bg-gray-100 min-h-screen">
    <h2 class="text-4xl font-bold text-center py-8">Gas Prices</h2>
    <ul class="max-w-4xl mx-auto px-4">
      <li v-for="(gasPrice, index) in gasPrices" :key="index" class="border-b border-gray-300 py-4 flex items-center justify-between">
        <span class="text-lg font-semibold">{{ gasPrice.StationName }}:</span>
        <div class="flex items-center">
          <span class="text-lg font-semibold">{{ gasPrice.FuelTypeName }}:</span>
          <span class="mx-2">{{ getEmoji(gasPrice.FuelTypeName) }}</span>
          <span class="text-lg font-semibold">${{ gasPrice.Price.toFixed(2) }}</span>
        </div>
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
/* You can add additional custom styles here */
</style>
