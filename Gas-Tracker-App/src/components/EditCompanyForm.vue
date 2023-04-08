<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Edit Company</h3>
        <div class="space-y-4">
            <div class="mb-4">
                <label for="company" class="block text-neutral-200 text-sm font-bold mb-2">
                    Company
                </label>
                <select id="company" v-model="selectedCompany"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Select a company</option>
                    <option v-for="(company, index) in companies" :key="index" :value="company.CompanyID">
                        {{ company.CompanyName }}
                    </option>
                </select>
            </div>
            <div>
                <label for="companyName" class="block text-neutral-200 text-sm font-bold mb-2">
                    Company Name
                </label>
                <input v-model="companyName" id="companyName" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the company's name" />
            </div>
            <div>
                <label for="companyName" class="block text-neutral-200 text-sm font-bold mb-2">
                    Date Created
                </label>
                <input v-model="companyDateCreated" id="companyDateCreated" type="date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the company's founding date" />
            </div>
            <div>
                <label for="companyValue" class="block text-neutral-200 text-sm font-bold mb-2">
                    Company Value
                </label>
                <input v-model="companyValue" id="companyValue" type="number" step="0.01"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the company's value" />
            </div>
            <div>
                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit Company
                </button>
            </div>
        </div>
    </form>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const companyName = ref('');
const companyDateCreated = ref(null);
const companyValue = ref(null);
const companies = ref([]);
const selectedCompany = ref(null);

async function submitForm() {
  console.log(companyName.value, companyDateCreated.value, companyValue.value);
  try {
    const response = await axios.put(`http://localhost:3000/edit-company/`, {
      companyName: companyName.value,
      companyDateCreated: companyDateCreated.value,
      companyValue: companyValue.value,
      companyID: selectedCompany.value,
    });

    console.log(response.data);
    alert('Company edited successfully');
  } catch (error) {
    console.error('Error:', error);
    alert('Error editing company');
  }
}

async function fetchCompanies() {
  try {
    const response = await axios.get('http://localhost:3000/companies');
    companies.value = response.data;
    console.log(companies.value);
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(fetchCompanies);
</script>

<style scoped>
/* Add custom styles if needed */
</style>