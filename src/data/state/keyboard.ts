import { defineStore } from "pinia";

export const keyboard_streamer_should_stop = defineStore("global_keyboard_stop", {
    state: () => ({
        should_stop: false,
    }),

    actions: {
        on() {
            this.should_stop = true;
        },
        off() {
            this.should_stop = false;
        },
    },

    // persist: true,
});
