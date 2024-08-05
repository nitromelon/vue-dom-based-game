<script setup lang="ts">
import MainTitleBar from "./tooltip/MainTitleBar.vue";
import MainNotification from "./tooltip/MainNotification.vue";
import TooltipNavigation from "./tooltip/TooltipNavigation.vue";
import { computed } from "vue";

const is_portrait = computed(() => {
    return window.innerHeight > window.innerWidth;
});
</script>

<template>
    <div class="game-tooltip">
        <RouterView />
        <MainTitleBar></MainTitleBar>
        <MainNotification></MainNotification>
        <!-- <TooltipNavigation v-if="is_portrait"></TooltipNavigation> -->
    </div>
</template>

<style scoped>
.game-tooltip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.game-tooltip > * {
    pointer-events: auto;
}

h1 {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
