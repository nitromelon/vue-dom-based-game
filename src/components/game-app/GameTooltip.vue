<script setup lang="ts"></script>

<template>
    <div class="game-tooltip">
        <h1>Text holder for game tooltip</h1>
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
