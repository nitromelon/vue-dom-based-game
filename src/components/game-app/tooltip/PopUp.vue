<template>
    <div class="pop-up-bg" v-if="is_valid" ref="popup_bg">
        <div class="pop-up">
            <h1>{{ path_id.charAt(0).toUpperCase() + path_id.slice(1) }}</h1>
            <div class="close">
                <RouterLink to="/" id="close">X</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { keyboard_streamer_should_stop } from "@/data/state/keyboard";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const keyboard_stop_state = keyboard_streamer_should_stop();
const route = useRoute();
const STORES_NAME = new Set(["register", "coffee"]);

let path_id = route.params.id;
if (Array.isArray(path_id)) {
    path_id = path_id[0] || "";
}

const is_valid = STORES_NAME.has(path_id);

onMounted(() => {
    keyboard_stop_state.on();
})

onUnmounted(() => {
    keyboard_stop_state.off();
})
</script>

<style scoped>
.pop-up-bg {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: rgba(29, 32, 33, 0.8);
    backdrop-filter: blur(50px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.pop-up {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: min(calc(90vh - 82px - 8px), calc(100vw - 32px));
    aspect-ratio: 1;
    background: #f2e5bc;
    border-radius: 16px;
    padding: 16px;
}

#close {
    text-decoration: none;
    color: black;
    height: 100%;
    width: 100%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

p {
    color: white;
}

.close {
    position: absolute;
    right: -24px;
    top: -24px;
    height: 48px;
    width: 48px;
    background: #f2e5bc;
    border-radius: 8px;
    border: 1px solid black;
}
</style>
