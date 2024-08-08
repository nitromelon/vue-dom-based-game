import { defineStore } from "pinia";

export type CoffeeURL = {
    url: string,
    id: number,
};

export const MAX_INVENTORY = 7
export const inventory = defineStore("inventory", {
    state: () => ({
        slot: new Array<CoffeeURL | undefined>(),
    }),

    actions: {
        refresh(value: CoffeeURL[]) {
            this.slot = value.slice(0, MAX_INVENTORY);
        },

        push(value: CoffeeURL) {
            if (this.slot.length + 1 > MAX_INVENTORY) return;
            this.slot.push(value);
        },

        delete(index: number) {
            if (index >= 0 && index < MAX_INVENTORY) {
                this.slot.splice(index, 1);
            }
        },
    },
});
