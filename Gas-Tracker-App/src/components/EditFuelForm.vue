<template>
    <div class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">
            Edit Fuels
        </h3>
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="price" class="block text-neutral-200 text-sm font-bold mb-2">
                    Price
                </label>
                <select id="edit" v-model="selectedPrice"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Select a price</option>
                    <option v-for="(price, index) in prices" :key="index" :value="price.PriceID">
                        {{ price.StationName }} : {{ price.FuelTypeName }} : {{ price.Price }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="station" class="block text-neutral-200 text-sm font-bold mb-2">
                    Station
                </label>
                <select id="station" v-model="selectedStation"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Select a station</option>
                    <option v-for="(station, index) in stations" :key="index" :value="station.StationID">
                        {{ station.StationName }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="fuelType" class="block text-neutral-200 text-sm font-bold mb-2">
                    Fuel Type
                </label>
                <select id="fuelType" v-model="selectedFuelType"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Select a fuel type</option>
                    <option v-for="(fuelType, index) in fuelTypes" :key="index" :value="fuelType.FuelTypeID">
                        {{ fuelType.FuelTypeName }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="price" class="block text-neutral-200 text-sm font-bold mb-2">
                    Price
                </label>
                <input type="number" id="price" v-model="price" min="0" step="0.01"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter fuel price" />
            </div>
            <button type="submit"
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit Fuel
            </button>
        </form>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const selectedStation = ref(null);
const selectedFuelType = ref(null);
const selectedPrice = ref(null);
const price = ref(null);
const stations = ref([]);
const fuelTypes = ref([]);
const prices = ref([]);

const submitForm = async () => {
  console.log(selectedStation.value, selectedFuelType.value, price.value, selectedPrice.value);
  try {
    await axios.put("http://localhost:3000/edit-fuel", {
      StationID: selectedStation.value,
      FuelTypeID: selectedFuelType.value,
      Price: price.value,
      PriceID: selectedPrice.value
    });
    alert("Fuel edited successfully");
    selectedStation.value = "";
    selectedFuelType.value = "";
    price.value = "";
  } catch (error) {
    console.error(error);
    alert("Failed to edit fuel");
  }
};

const fetchStations = async () => {
  try {
    const response = await axios.get("http://localhost:3000/stations");
    stations.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchFuelTypes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/fuel-types");
    fuelTypes.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchPrices = async () => {
  try {
    const response = await axios.get("http://localhost:3000/gas-prices");
    prices.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchStations();
  await fetchFuelTypes();
  await fetchPrices();
});
</script>



<style scoped>
/* You can add additional custom styles here */
</style>
