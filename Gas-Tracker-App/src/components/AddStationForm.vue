<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Add Station</h3>
        <div class="space-y-4">
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
                    Add Station
                </button>
            </div>
        </div>
    </form>
</template>
  
<script>
import axios from 'axios';

export default {
    props: {
        companies: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            stationName: "",
            stationAddress: "",
            selectedCompany: "",
        };
    },
    methods: {
    async submitForm() {
      try {
        const response = await axios.post('/add-station', {
            stationName: this.stationName,
            stationAddress: this.stationAddress,
            selectedCompany: this.selectedCompany,
        });

        console.log(response.data);
        alert('Company added successfully');
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding company');
      }
    },
  },
};
</script>
  
<style scoped>
/* Add custom styles if needed */
</style>