
<template>
    <form @submit.prevent="submitForm" class="bg-gray-700 rounded-lg p-6 my-8">
        <h3 class="text-2xl text-neutral-200 font-bold mb-4">Sign Up</h3>
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
                <label for="role" class="block text-neutral-200 text-sm font-bold mb-2">
                    Role
                </label>
                <select v-model="role" id="role"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>Select role</option>
                    <option v-for="(role, index) in roles" :key="index" :value="role.RoleName">
                        {{ role.RoleName }}
                    </option>
                </select>
            </div>
            <div>
                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Account
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const username = ref("");
const passwordText = ref("");
const passwordHash = ref("");
const role = ref("");
const roles = ref([]);

const submitForm = async () => {
    await hashPass();

    console.log(username.value, passwordHash.value, role.value);
    try {
        await axios.post("http://localhost:3000/signup", {
            UserName: username.value,
            PasswordHash: passwordHash.value,
            Role: role.value,
        });
        alert("User registered successfully");
        username.value = "";
        passwordText.value = "";
        passwordHash.value = "";
        role.value = "";
    } catch (error) {
        console.error(error);
        alert("Failed to register user");
    }
};

const hashPass = async () => {
    const saltRounds = 10;
    const password = passwordText.value;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                passwordHash.value = hash;
                resolve();
            }
        });
    });
};

const fetchRoles = async () => {
    try {
        const response = await axios.get('http://localhost:3000/roles');
        roles.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(
    fetchRoles,
)
</script>

<style scoped></style>
