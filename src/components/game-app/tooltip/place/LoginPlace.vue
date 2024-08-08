<template>
    <div class="login-container">
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required />
            </div>
            <button type="submit">Login</button>
            <p class="error-server" v-if="server_error !== ''">Oops there has error: {{ server_error }}</p>
            <p class="register">Don't have an account? <router-link to="/register">Register here</router-link></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { user_position } from '@/data/state/user_position';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = user_position();
const user = ref({
    username: '',
    password: ''
});

const server_error = ref('');

const login = async () => {
    console.log('User:', user.value);
    const input = JSON.stringify(user.value);
    try {
        const result = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: input,
            credentials: 'include'
        }).then(res => res.json());

        state.logged = true;
        console.log(result);
        router.push("/")
    } catch (error) {
        server_error.value = JSON.stringify(error);
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

h1 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 0.5rem;
    background-color: #1d2021;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #1a1c1d;
}

.error-server,
.register {
    margin-top: 8px;
    color: red;
}

li {
    margin: 0.5rem 0;
}
</style>