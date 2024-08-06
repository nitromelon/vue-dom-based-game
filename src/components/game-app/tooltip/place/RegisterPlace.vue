<template>
    <div class="register-container">
        <h1>REGISTER</h1>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" required />
                <ul v-if="usernameErrors.length">
                    <li v-for="(error, index) in usernameErrors" :key="index">{{ error }}</li>
                </ul>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required />
                <ul v-if="passwordErrors.length">
                    <li v-for="(error, index) in passwordErrors" :key="index">{{ error }}</li>
                </ul>
            </div>
            <button type="submit" :disabled="hasErrors">Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const user = ref({
    username: '',
    password: ''
});

const usernameErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

const usernameRules = [
    {
        rule: (value: string) => /^[a-zA-Z0-9_]+$/.test(value),
        message: 'Username must contain only letters, numbers, and underscores.'
    },
    {
        rule: (value: string) => value.length > 3,
        message: 'Username must be longer than 3 characters.'
    }
];

const passwordRules = [
    {
        rule: (value: string) => value.length >= 6,
        message: 'Password must be at least 6 characters long.'
    },
    {
        rule: (value: string) => /[A-Z]/.test(value),
        message: 'Password must contain at least one uppercase letter.'
    }
];

watch(user.value, (newValue) => {
    usernameErrors.value = [];
    usernameRules.forEach(rule => {
        if (!rule.rule(newValue.username)) {
            usernameErrors.value.push(rule.message);
        }
    });

    passwordErrors.value = [];
    passwordRules.forEach(rule => {
        if (!rule.rule(newValue.password)) {
            passwordErrors.value.push(rule.message);
        }
    });
}, { deep: true });

const hasErrors = computed(() => {
    return usernameErrors.value.length > 0 || passwordErrors.value.length > 0;
});

const register = () => {
    if (!hasErrors.value) {
        console.log('User:', user.value);
        // Add registration logic
    }
};
</script>

<style scoped>
.register-container {
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

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

ul {
    color: red;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

li {
    margin: 0.5rem 0;
}
</style>