<template>
    <div class="bg-slate-800 min-h-screen">
      <h2 class="text-4xl text-neutral-200 font-bold text-center py-8">Add Data</h2>
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-gray-900 shadow rounded-lg p-6">
          <nav class="flex items-center justify-center space-x-6">
            <button
              @click="activeForm = 'company'"
              :class="[
                activeForm === 'company'
                  ? 'bg-gray-800 text-neutral-200'
                  : 'text-gray-500',
                'py-2 px-4 rounded',
              ]"
            >
              Add Company
            </button>
            <button
              @click="activeForm = 'station'"
              :class="[
                activeForm === 'station'
                  ? 'bg-gray-800 text-neutral-200'
                  : 'text-gray-500',
                'py-2 px-4 rounded',
              ]"
            >
              Add Station
            </button>
            <button
              @click="activeForm = 'fuel'"
              :class="[
                activeForm === 'fuel'
                  ? 'bg-gray-800 text-neutral-200'
                  : 'text-gray-500',
                'py-2 px-4 rounded',
              ]"
            >
              Add Fuel to Station
            </button>
          </nav>
  
          <div v-if="activeForm === 'company'" class="mt-6">
            <AddCompanyForm />
          </div>
          <div v-if="activeForm === 'station'" class="mt-6">
            <AddStationForm />
          </div>
          <div v-if="activeForm === 'fuel'" class="mt-6">
            <AddFuelForm />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AddCompanyForm from "@/components/AddCompanyForm.vue";
  import AddStationForm from "@/components/AddStationForm.vue";
  import AddFuelForm from "@/components/AddFuelForm.vue";
  
  export default {
    components: {
      AddCompanyForm,
      AddStationForm,
      AddFuelForm,
    },
    data() {
      return {
        activeForm: "company",
      };
    },
  };
  </script>
  
  <style scoped>
  /* You can add additional custom styles here */
  </style>
  