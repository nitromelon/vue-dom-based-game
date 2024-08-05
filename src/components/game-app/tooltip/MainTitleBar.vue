<template>
    <div class="titlebar">
        <div v-for="(s, index) in SLOTS_NUMBER" :key="s" class="items" :class="{ selected: index === selected }" :style="{
            transform: `scale(${0.5 / (Math.abs(index - selected) + 1) + 0.5})`,
        }" @click="click_callback(index)">
            <h2>Slot {{ index + 1 }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import debounce from "@/data/base/debounce";
import { onMounted, onUnmounted, ref } from "vue";

const SLOTS_NUMBER = 7;
const selected = ref(0);
const wheel_callback = debounce((e: WheelEvent) => {
    // e.preventDefault();
    if (e.deltaY > 0) {
        selected.value = (selected.value + 1) % SLOTS_NUMBER;
    } else {
        selected.value = (selected.value - 1 + SLOTS_NUMBER) % SLOTS_NUMBER;
    }
}, 30);

const keyboard_callback = (e: KeyboardEvent) => {
    if (e.code >= "Digit1" && e.code <= "Digit7") {
        e.preventDefault();
        const digit = parseInt(e.code.replace("Digit", ""));
        selected.value = digit - 1; // Convert 1-based digit to 0-based index
    }
};

const click_callback = (index: number) => (selected.value = index);

onMounted(() => {
    window.addEventListener("wheel", wheel_callback);
    window.addEventListener("keydown", keyboard_callback);
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

    transition: 0.25s cubic-bezier(0, 0, 0, 1);
}

.selected {
    background: #fbf1c7;
    z-index: 1;
}
</style>
