<template>
    <div class="coffee-shop">
        <h1>Funky Coffee Shop</h1>
        <div class="search">
            <input v-model="searchQuery" type="text" placeholder="Search..." />
        </div>
        <div v-if="filteredData.length" class="grid-container">
            <div v-for="coffee in filteredData" :key="coffee.id" class="coffee-item">
                <h2>{{ coffee.type }}</h2>
                <img :src="coffee.url" :alt="coffee.type" class="coffee-image" />
                <div class="ratings">
                    <button class="rating-button" :disabled="!is_user" @click="callback('like', coffee.id)">👍 {{
                        coffee.like
                    }}</button>
                    <button v-if="is_user" class="buy-button" @click="buy(coffee.id)">Buy</button>
                    <button class="rating-button" :disabled="!is_user" @click="callback('dislike', coffee.id)">👎 {{
                        coffee.dislike
                    }}</button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inventory } from '@/data/state/inventory';
import { user_position } from '@/data/state/user_position';
import { onMounted, ref, computed } from 'vue';

type Item = {
    id: number;
    type: string;
    url: string;
    like: number;
    dislike: number;
}

const state = user_position();
const data = ref<Item[]>([]);
const is_user = ref(false);
const searchQuery = ref('');

const filteredData = computed(() => {
    return data.value.filter(coffee =>
        coffee.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const callback = async (v: "like" | "dislike", product_id: number) => {
    const url = `http://localhost:3000/api/like_dislike`;
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choice: v,
                product_id
            }),
            credentials: 'include'
        }).then(res => res.json());

        console.log(result);
        await refresh();
    } catch (error) {
        state.logged = false;
        console.log(error)
    }
}

const buy = async (product_id: number) => {
    try {
        const result = await fetch("http://localhost:3000/api/buy_delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id
            }),
            credentials: 'include'
        })

        console.log(result)

        fetch("http://localhost:3000/api/buy_delete/this", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(r => r.json())
            .then((r) => {
                inventory().refresh(r)
            })
            .catch(e => console.log(e))
    } catch (e) {
        state.logged = false;
        console.log(e)
    }
}

async function refresh() {
    try {
        const result = await fetch("http://localhost:3000/api/upload_content/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        // data.value = await result.json();
        const output = await result.json();
        data.value = output.data
        is_user.value = output.haveSession
    } catch (e) {
        state.logged = false;
        console.log(e)
    }
}

onMounted(async () => {
    await refresh();
})
</script>

<style scoped>
.search {
    position: relative;
    width: 80%;
    height: 32px;
    background-color: white;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    border-radius: 100px;
    margin-top: 8px;
}

.search input {
    width: 100%;
    border: none;
    outline: none;
    padding: 8px;
    border-radius: 100px;
}

.coffee-shop {
    text-align: center;
    font-family: Arial, sans-serif;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
    width: auto;
    max-width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    object-fit: cover;
}

.ratings {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
}

.rating-button,
.buy-button {
    border: 1px solid #ccc;
    border-radius: 100px;
    background: transparent;
    padding: 8px 16px;
    cursor: pointer;
}

h1 {
    font-size: 1.5rem;
}

h2 {
    font-size: 1.25rem;
}

@media (max-width: 600px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
</style>