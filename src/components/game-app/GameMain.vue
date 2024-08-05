<script setup lang="ts">
import GameTooltip from "./GameTooltip.vue";
import GamePlay from "./GamePlay.vue";

// TODO: Prevent default zoom (Ctrl + mouse wheel, Ctrl + +, Ctrl + -)
</script>

<!-- 2 component will communicate through pinia I guess -->

<template>
    <Suspense>
        <template #default>
            <GamePlay />
        </template>
        <template #fallback>
            <p>Loading...</p>
        </template>
    </Suspense>
    <GameTooltip />
</template>

<style>
* {
    image-rendering: pixelated;
    background-size: cover;
    font-family: monospace !important;
}
</style>
