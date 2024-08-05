<template>
    <div class="notification" v-if="should_show" @click="click_callback">
        <p>Do you want to use {{ value }} service?</p>
        <p>Then click here.</p>
    </div>
</template>

<script setup lang="ts">
import { should_show_notification } from "@/data/state/notification";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const notification_state = should_show_notification();
const should_show = computed(() => notification_state.should_show);
const value = computed(() => (notification_state.value !== "" ? notification_state.value : "this"));

const click_callback = () => {
    router.push(`/${notification_state.value}`);
    notification_state.off();
};
</script>

<style scoped>
.notification {
    position: absolute;
    right: 12px;
    top: 12px;
    height: 72px;
    aspect-ratio: 42/9;
    max-width: 100%;
    background: #d5c4a1;
    border: 2px solid #1d2021;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 8px 16px;
    border-radius: 8px;
    user-select: none;
    transition: 0.25s cubic-bezier(0, 0, 0, 1);
    animation: step_in 0.25s cubic-bezier(0, 0, 0, 1) forwards;
}

.notification:active {
    transform: scale(0.95);
}

@keyframes step_in {
    0% {
        right: 0px;
        opacity: 0;
    }

    100% {
        right: 12px;
        opacity: 1;
    }
}
</style>
