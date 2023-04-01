<template>
  <div class="bg-slate-800 min-h-screen">
    <h2 class="text-4xl text-neutral-200 font-bold text-center py-8">Gas Prices</h2>
    <div class="max-w-4xl mx-auto px-4 flex items-center justify-between">
      <span></span><span></span><span></span><span></span><span></span><span></span>
      <span class="text-2xl text-neutral-200">Filter By: </span>
      <span>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Companies
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }" v-for="(company, index) in companies" :key="index">
                  <a @click="setCompany(company.CompanyName)"
                  :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                    company.CompanyName }}</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </span>
      <span>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Gas Types
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }" v-for="(fuelType, index) in fuelTypes" :key="index">
                <a @click="setFuelType(fuelType.FuelTypeName)"
                  :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                    fuelType.FuelTypeName }}</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </span>
    </div>
    <ul class="max-w-4xl mx-auto px-4 text-neutral-200">
      <li v-for="(gasPrice, index) in gasPrices" :key="index"
        class="border-b border-gray-300 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl font-bold mr-3">{{ gasPrice.CompanyName }}</span>
          <span class="text-2xl font-semibold">{{ gasPrice.StationName }}:</span>
        </div>
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

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const gasPrices = ref([]);
const companies = ref([]);
const fuelTypes = ref([]);

async function fetchGasPrices(companyName, fuelTypeName) {
  const queryParams = new URLSearchParams();

  if (companyName) {
    queryParams.append('companyName', companyName);
  }

  if (fuelTypeName) {
    queryParams.append('fuelTypeName', fuelTypeName);
  }

  try {
    const response = await axios.get(`http://localhost:3000/gas-prices?${queryParams.toString()}`);
    gasPrices.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCompanies() {
  try {
    const response = await axios.get('http://localhost:3000/companies');
    companies.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchFuelTypes() {
  try {
    const response = await axios.get('http://localhost:3000/fuel-types');
    fuelTypes.value = response.data;
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

const selectedCompany = ref('');
const selectedFuelType = ref('');

function setCompany(company) {
  selectedCompany.value = company;
  fetchGasPrices(selectedCompany.value, selectedFuelType.value);
}

function setFuelType(fuelType) {
  selectedFuelType.value = fuelType;
  fetchGasPrices(selectedCompany.value, selectedFuelType.value);
}

onMounted(() => {
  fetchGasPrices();
  fetchCompanies();
  fetchFuelTypes();
});
</script>

<style scoped>/* You can add additional custom styles here */</style>
