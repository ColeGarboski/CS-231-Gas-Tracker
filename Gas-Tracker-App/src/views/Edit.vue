<template>
    <div class="bg-slate-800 min-h-screen">
      <h2 class="text-4xl text-neutral-200 font-bold text-center py-8">Edit Data</h2>
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
              Edit Company
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
              Edit Station
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
              Edit Fuels
            </button>
          </nav>
  
          <div v-if="activeForm === 'company'" class="mt-6">
            <EditCompanyForm />
          </div>
          <div v-if="activeForm === 'station'" class="mt-6">
            <EditStationForm />
          </div>
          <div v-if="activeForm === 'fuel'" class="mt-6">
            <EditFuelForm />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EditCompanyForm from "@/components/EditCompanyForm.vue";
  import EditStationForm from "@/components/EditStationForm.vue";
  import EditFuelForm from "@/components/EditFuelForm.vue";
  
  export default {
    components: {
      EditCompanyForm,
      EditStationForm,
      EditFuelForm,
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
  