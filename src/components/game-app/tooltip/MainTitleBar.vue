<template>
    <div class="titlebar">
        <div v-for="(s, index) in MAX_INVENTORY" :key="s" class="items" :class="{ selected: index === selected }"
            :style="{
                transform: `scale(${0.5 / (Math.abs(index - selected) + 1) + 0.5})`,
            }" @click="click_callback(index)">
            <h2 v-if="state.slot[index] === undefined">Slot {{ index + 1 }}</h2>
            <div v-else class="wrapper">
                <div class="image" :style="{ backgroundImage: `url(${state.slot[index].url})` }"
                    @click="callback(state.slot[index]?.id)">
                    <p>1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import debounce from "@/data/base/debounce";
import { inventory, MAX_INVENTORY } from "@/data/state/inventory";
import { user_position } from "@/data/state/user_position";
import { onMounted, onUnmounted, ref } from "vue";

const user_state = user_position();
const state = inventory();
const selected = ref(0);

const wheel_callback = debounce((e: WheelEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.pop-up')) {
        return;
    }

    if (e.deltaY > 0) {
        selected.value = (selected.value + 1) % MAX_INVENTORY;
    } else {
        selected.value = (selected.value - 1 + MAX_INVENTORY) % MAX_INVENTORY;
    }
}, 30);

const keyboard_callback = (e: KeyboardEvent) => {
    if (e.code >= "Digit1" && e.code <= "Digit7") {
        e.preventDefault();
        const digit = parseInt(e.code.replace("Digit", ""));
        selected.value = digit - 1; // Convert 1-based digit to 0-based index
    } else if (e.code === "e") {
        e.preventDefault();
        // use
    }
};

const click_callback = (index: number) => (selected.value = index);

const callback = async (product_id: number | undefined) => {
    if (product_id === undefined) return;

    try {
        const result = await fetch("http://localhost:3000/api/buy_delete/this", {
            method: "DELETE",
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
                state.refresh(r)
            })
            .catch(e => console.log(e))
    } catch (e) {
        user_state.logged = false;
        console.log(e)
    }
}

if (user_state.logged === true) {
    fetch("http://localhost:3000/api/buy_delete/this", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(r => r.json())
        .then((r) => {
            state.refresh(r)
        })
        .catch(e => console.log(e))
}

onMounted(() => {
    window.addEventListener("wheel", wheel_callback);
    window.addEventListener("keydown", keyboard_callback);
    fetch("http://localhost:3000/api/buy_delete/this", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(r => r.json())
        .then((r) => {
            state.refresh(r)
        })
        .catch(e => console.log(e))
});

onUnmounted(() => {
    window.removeEventListener("wheel", wheel_callback);
    window.removeEventListener("keydown", keyboard_callback);
});
</script>

<style scoped>
.titlebar {
    position: absolute;
    bottom: 12px;
    /* Rewrite in pinia state */
    left: 50%;
    transform: translateX(-50%);
    height: 72px;
    width: fit-content;
    max-width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap-reverse;
}

.items {
    position: relative;
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1d2021;
    background: #d5c4a1;
    border-radius: 8px;
    z-index: 0;
    overflow: hidden;
    transition: 0.25s cubic-bezier(0, 0, 0, 1);
}

.selected {
    background: #fbf1c7;
    z-index: 1;
}

.wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image {
    position: relative;
    height: calc(100% - 8px);
    aspect-ratio: 1;
    border-radius: 8px;
    border: 1px solid #1d2021;
}

.image p {
    position: absolute;
    bottom: 4px;
    left: 4px;
    font-size: 20px;
}
</style>
