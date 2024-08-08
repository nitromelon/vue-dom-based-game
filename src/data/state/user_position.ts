import { defineStore } from "pinia";

export const user_position = defineStore("user_position", {
    state: () => ({
        logged: false,
        current_chunk: 57,
        x: 0,
        y: 0,
    }),
})