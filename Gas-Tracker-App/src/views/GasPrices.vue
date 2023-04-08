<template>
  <div class="bg-slate-800 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 flex items-center justify-between">
      <span></span>
      <h2 class="text-4xl text-neutral-200 font-bold text-center py-8">Gas Prices</h2>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <template v-if="loggedIn">
            <span class="text-sm font-semibold text-neutral-200">
              {{ userName }}
            </span>
          </template>
          <template v-else>
            <MenuButton @click="switchToLoginScreen()"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Login
            </MenuButton>
          </template>
        </div>
      </Menu>
    </div>
    <div class="max-w-4xl mx-auto px-4 flex items-center justify-between">
      <Menu v-if="managerLoggedIn" as="div" class="relative inline-block text-left">
        <div>
          <MenuButton @click="switchToAddScreen()"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Add
            <PlusIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>
      </Menu>
      <Menu v-if="managerLoggedIn" as="div" class="relative inline-block text-left">
        <div>
          <MenuButton @click="switchToDeleteScreen()"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Delete
            <TrashIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>
      </Menu>
      <Menu v-if="managerLoggedIn" as="div" class="relative inline-block text-left">
        <div>
          <MenuButton @click="switchToEditScreen()"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Edit
            <PencilIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>
      </Menu>
      <span></span><span></span>
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
          <button v-if="showDeleteButtons" @click="deleteGasPrice(gasPrice.PriceID)"
            class="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-red-700 ml-4">
            Delete
          </button>

        </div>
      </li>
    </ul>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from 'vuex';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon, TrashIcon, PlusIcon, PencilIcon } from '@heroicons/vue/20/solid';


const router = useRouter();
const store = useStore();

const gasPrices = ref([]);
const companies = ref([]);
const fuelTypes = ref([]);

const showDeleteButtons = ref(false);
const managerLoggedIn = computed(() => store.state.managerLoggedIn);
const loggedIn = computed(() => store.state.loggedIn);
const userName = computed(() => store.state.userName);

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

async function deleteGasPrice(selectedPriceID) {
  console.log(selectedPriceID);
  try {
    console.log("axios time");
    await axios.delete("http://localhost:3000/delete-fuel", {
      data: {
        PriceID: selectedPriceID,
      },
    });
    alert("Deleted fuel price successfully");
    console.log("fetching gas prices");
    fetchGasPrices();
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

function switchToAddScreen() {
  router.push({ name: "vueAdd" });
}

function switchToDeleteScreen() {
  showDeleteButtons.value = !showDeleteButtons.value;
}

function switchToLoginScreen() {
  router.push({ name: "vueSignup" });
}

function switchToEditScreen() {
  router.push({ name: "vueEdit" });
}

onMounted(() => {
  fetchGasPrices();
  fetchCompanies();
  fetchFuelTypes();
});
</script>
  
<style scoped>
/* You can add additional custom styles here */
</style>
  