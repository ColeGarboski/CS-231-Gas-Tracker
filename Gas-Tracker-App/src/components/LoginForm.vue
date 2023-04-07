
<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Log In</h3>
        <div class="space-y-4">
            <div>
                <label for="username" class="block text-neutral-200 text-sm font-bold mb-2">
                    Username
                </label>
                <input v-model="username" id="username" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your username" />
            </div>
            <div>
                <label for="passwordText" class="block text-neutral-200 text-sm font-bold mb-2">
                    Password
                </label>
                <input v-model="passwordText" id="passwordText" type="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password" />
            </div>
            <div>
                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Log In
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const router = useRouter();
const store = useStore();

const username = ref("");
const passwordText = ref("");
const passwordHash = ref("");

const submitForm = async () => {
    console.log(username.value);
    try {
        const response = await axios.post("http://localhost:3000/login", {
            UserName: username.value,
        });

        passwordHash.value = response.data[0].PasswordHash;

        const isPasswordCorrect = await bcrypt.compare(passwordText.value, passwordHash.value);

        if (isPasswordCorrect) {
            alert("Login Successful");
            passwordText.value = "";
            store.commit('setUser', { role: response.data[0].Role, username: response.data[0].UserName });
            router.push({ name: "vueGasPrices" });
        } else {
            alert("Incorrect Username or Password");
            username.value = "";
            passwordText.value = "";
        }
    } catch (error) {
        console.error(error);
        alert("Incorrect Username or Password");
    }
};
</script>

<style scoped></style>
