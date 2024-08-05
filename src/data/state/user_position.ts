import { defineStore, type StoreDefinition } from "pinia";
import type { User, Users } from "./user-structure";

export const user_data: StoreDefinition<string, Users> = defineStore("user_data", {
    state: () => ({
        current_user: "",
        accounts: [] as User[],
    }),

    actions: {
        is_logged_in() {
            return this.current_user !== "";
        },

        log_in(name: string) {
            this.current_user = name;
        },

        get_user(): User | null {
            if (this.current_user === "") return null;
            const account = this.accounts.find((v) => v.name === this.current_user);
            if (account === undefined) return null;
            return account;
        },
    },

    persist: true,
});
