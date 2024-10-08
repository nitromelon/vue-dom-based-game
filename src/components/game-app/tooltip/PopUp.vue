<template>
    <div class="pop-up-bg" v-if="is_valid" ref="popup_bg">
        <div class="pop-up">
            <div class="display">
                <component :is="component_table_lookup"></component>
            </div>
            <div class="close">
                <RouterLink to="/" id="close">X</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { keyboard_streamer_should_stop } from "@/data/state/keyboard";
import { defineAsyncComponent, onMounted, onUnmounted, type ComponentOptionsMixin, type DefineComponent, type ExtractPropTypes, type PublicProps } from "vue";
import { useRoute } from "vue-router";
type Component = DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}, {}>;

const keyboard_stop_state = keyboard_streamer_should_stop();
const route = useRoute();
const STORES_NAME = new Set(["register", "coffee", "login"]);

const path_id = ref(route.params.id);

if (Array.isArray(path_id.value)) {
    path_id.value = path_id.value[0] || "";
}

const is_valid = ref(STORES_NAME.has(path_id.value));
const component_table_lookup = shallowRef<undefined | Component>(undefined);

const updateComponent = () => {
    switch (path_id.value) {
        case "register":
            component_table_lookup.value = defineAsyncComponent(() => import("./place/RegisterPlace.vue"));
            break;
        case "login":
            component_table_lookup.value = defineAsyncComponent(() => import("./place/LoginPlace.vue"));
            break;
        case "coffee":
            component_table_lookup.value = defineAsyncComponent(() => import("./place/CoffeePlace.vue"));
            break;
        default:
            component_table_lookup.value = undefined;
            break;
    }
};

updateComponent();

watch(() => route.params.id, (newId) => {
    if (Array.isArray(newId)) {
        path_id.value = newId[0] || "";
    } else {
        path_id.value = newId;
    }
    is_valid.value = STORES_NAME.has(path_id.value);
    updateComponent();
});

onMounted(() => {
    keyboard_stop_state.on();
});

onUnmounted(() => {
    keyboard_stop_state.off();
});
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

.display {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
}
</style>
