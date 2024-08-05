import { defineStore } from "pinia";

export const should_show_notification = defineStore("notification", {
    state: () => ({
        should_show: false,
        value: "",
    }),

    actions: {
        on(value: string) {
            this.should_show = true;
            this.value = value;
        },

        off() {
            this.should_show = false;
            this.value = "";
        },

        is_empty() {
            return this.value === "";
        },
    },

    persist: true,
});
