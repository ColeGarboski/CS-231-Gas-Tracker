<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Add Company</h3>
        <div class="space-y-4">
            <div>
                <label for="companyName" class="block text-neutral-200 text-sm font-bold mb-2">
                    Company Name
                </label>
                <input v-model="companyName" id="companyName" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the company's name" />
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
                    Add Company
                </button>
            </div>
        </div>
    </form>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      companyName: '',
      companyDateCreated: '',
      companyValue: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/add-company', {
          companyName: this.companyName,
          companyDateCreated: this.companyDateCreated,
          companyValue: this.companyValue,
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