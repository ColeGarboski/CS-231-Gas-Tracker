<template>
    <div class="bg-slate-800 min-h-screen">
      <h2 class="text-4xl text-neutral-200 font-bold text-center py-8">Sign in</h2>
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-gray-900 shadow rounded-lg p-6">
          <nav class="flex items-center justify-center space-x-6">
            <button
              @click="activeForm = 'signup'"
              :class="[
                activeForm === 'signup'
                  ? 'bg-gray-800 text-neutral-200'
                  : 'text-gray-500',
                'py-2 px-4 rounded',
              ]"
            >
              Sign Up
            </button>
            <button
              @click="activeForm = 'login'"
              :class="[
                activeForm === 'login'
                  ? 'bg-gray-800 text-neutral-200'
                  : 'text-gray-500',
                'py-2 px-4 rounded',
              ]"
            >
              Login
            </button>
          </nav>
  
          <div v-if="activeForm === 'login'" class="mt-6">
            <LoginForm />
          </div>
          <div v-if="activeForm === 'signup'" class="mt-6">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SignUpForm from "@/components/CreateAccountForm.vue";
  import LoginForm from "@/components/LoginForm.vue";
  
  export default {
    components: {
      SignUpForm,
      LoginForm,
    },
    data() {
      return {
        activeForm: "login",
      };
    },
  };
  </script>
  
  <style scoped>
  /* You can add additional custom styles here */
  </style>
  