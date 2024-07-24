<script setup lang="ts">
defineProps<{
    style: {
        top: number;
        left: number;
    };
}>();
</script>

<template>
    <div
        class="main"
        :style="{
            top: `${style.top}px`,
            left: `${style.left}px`,
        }"
    >
        <slot />
    </div>
</template>

<style scoped>
.main {
    position: absolute;
}
</style>
