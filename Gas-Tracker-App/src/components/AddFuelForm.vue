<template>
    <div class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">
            Add Fuel to Station
        </h3>
        <form @submit.prevent="submitForm">
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
                Add Fuel to Station
            </button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            stationId: null,
            fuelTypeId: null,
            price: -1,
            stations: [],
            fuelTypes: [],
        };
    },
    methods: {
        async submitForm() {
            console.log(this.stationId, this.fuelTypeId, this.price)
            try {
                await axios.post('http://localhost:3000/add-fuel', {
                    stationId: this.stationId,
                    fuelTypeId: this.fuelTypeId,
                    price: this.price,
                });
                alert('Fuel added to station successfully');
                this.stationId = '';
                this.fuelTypeId = '';
                this.price = '';
            } catch (error) {
                console.error(error);
                alert('Failed to add fuel to station');
            }
        },
        async fetchStations() {
            try {
                const response = await axios.get('http://localhost:3000/stations');
                this.stations = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchFuelTypes() {
            try {
                const response = await axios.get('http://localhost:3000/fuel-types');
                this.fuelTypes = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.fetchStations();
        this.fetchFuelTypes();
    },
};
</script>


<style scoped>
/* You can add additional custom styles here */
</style>