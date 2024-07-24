<script setup lang="ts">
import type { Style } from "@/data/base/common-type";

defineProps<{
    style: Style;
    debug: number;
}>();
</script>

<template>
    <div class="map-chunk" :style="{
        top: `${style.top}px`,
        left: `${style.left}px`,
        width: `${style.width}px`,
        height: `${style.height}px`,
        backgroundImage: `url(${style.backgroundImage})`,
        opacity: style.opacity /* !== 1 ? 0: 1 */,
    }">
        <!-- <h1>{{ debug }}</h1>
        <div class="thing"></div> -->
    </div>
</template>

<style scoped>
.map-chunk {
    position: absolute;
    transition: opacity 0.5s;
}

h1 {
    color: white;
    background: black;
}

.thing {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    outline: 1px solid white;
}
</style>
