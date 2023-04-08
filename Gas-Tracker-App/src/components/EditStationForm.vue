<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Edit Station</h3>
        <div class="space-y-4">
            <div class="mb-4">
                <label for="station" class="block text-neutral-200 text-sm font-bold mb-2">
                    Station
                </label>
                <select id="edit" v-model="selectedStation"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Select a station</option>
                    <option v-for="(station, index) in stations" :key="index" :value="station.StationID">
                        {{ station.StationName }}
                    </option>
                </select>
            </div>
            <div>
                <label for="stationName" class="block text-neutral-200 text-sm font-bold mb-2">
                    Station Name
                </label>
                <input v-model="stationName" id="stationName" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the station name" />
            </div>
            <div>
                <label for="stationAddress" class="block text-neutral-200 text-sm font-bold mb-2">
                    Station Address
                </label>
                <input v-model="stationAddress" id="stationAddress" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the station's address" />
            </div>
            <div>
                <label for="company" class="block text-neutral-200 text-sm font-bold mb-2">
                    Company
                </label>
                <select v-model="selectedCompany" id="company"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>Select Company</option>
                    <option v-for="(company, index) in companies" :key="index" :value="company.CompanyID">
                        {{ company.CompanyName }}
                    </option>
                </select>
            </div>
            <div>
                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit Station
                </button>
            </div>
        </div>
    </form>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const stationName = ref("");
const stationAddress = ref("");
const selectedCompany = ref("");
const selectedStation = ref("");

const stations = ref([]);
const companies = ref([]);

const submitForm = async () => {
  console.log(stationName.value, stationAddress.value, selectedCompany.value);
  try {
    const response = await axios.put('http://localhost:3000/edit-station', {
      stationName: stationName.value,
      stationAddress: stationAddress.value,
      companyID: selectedCompany.value,
      stationID: selectedStation.value,
    });

    console.log(response.data);
    alert('Station edited successfully');
  } catch (error) {
    console.error('Error:', error);
    alert('Error editing station');
  }
};

const fetchCompanies = async () => {
  try {
    const response = await axios.get('http://localhost:3000/companies');
    companies.value = response.data;
    console.log(companies.value);
  } catch (error) {
    console.error(error);
  }

  if (companies.value.length > 0) {
    selectedCompany.value = companies.value[0].CompanyID; // Set the default value to the first company ID
  }
};

const fetchStations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/stations');
    stations.value = response.data;
    console.log(stations.value);
  } catch (error) {
    console.error(error);
  }

  if (stations.value.length > 0) {
    selectedStation.value = stations.value[0].StationID; // Set the default value to the first station ID
  }
};

onMounted(async () => {
  await fetchCompanies();
  await fetchStations();
});
</script>
  
<style scoped>
/* Add custom styles if needed */
</style>