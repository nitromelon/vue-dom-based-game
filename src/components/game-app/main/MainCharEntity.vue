<script setup lang="ts">
import type { EntityStyle } from "@/data/base/common-type";

defineProps<{ style: EntityStyle }>();
</script>

<template>
    <div class="parent" :style="{
        top: `${style.base.top}px`,
        left: `${style.base.left}px`,
        width: `${style.base.width}px`,
        height: `${style.base.height}px`,
    }">
        <div class="child" :style="{
            width: `${style.size.width}px`,
            height: `${style.size.height}px`,
            background: `url(${style.size.backgroundImage})`,
        }"></div>
    </div>
</template>

<style scoped>
.parent {
    position: absolute;
    overflow: visible;
    transition: 0.25s cubic-bezier(0,1,0,1);
}

.child {
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>
