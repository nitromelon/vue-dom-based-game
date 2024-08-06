<template>
    <div class="coffee-shop">
        <h1>Funky Coffee Shop</h1>
        <div v-if="data.length" class="grid-container">
            <div v-for="coffee in data" :key="coffee.id" class="coffee-item">
                <h2>{{ coffee.type }}</h2>
                <img :src="coffee.url" :alt="coffee.type" class="coffee-image" />
                <div class="ratings">
                    <span>👍 {{ coffee.like }}</span>
                    <span>👎 {{ coffee.dislike }}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

type Item = {
    id: number;
    type: string;
    url: string;
    like: number;
    dislike: number;
}

const data = ref<Item[]>([]);

onMounted(async () => {
    try {
        const result = await fetch("http://localhost:3000/api/upload_content/all")
        data.value = await result.json();
    } catch (e) { console.log(e) }
})
</script>

<style scoped>
.coffee-shop {
    text-align: center;
    font-family: Arial, sans-serif;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
}

.coffee-item {
    border: 1px solid #ccc;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.coffee-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.ratings {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
}

h1 {
    font-size: 1.5rem;
}

@media (max-width: 600px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
</style>