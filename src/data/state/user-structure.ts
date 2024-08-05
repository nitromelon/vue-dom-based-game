export type Item = {
    name: string;
    description: string;
    quantity: number;
    like: number;
    dislike: number;
};

export type User = {
    name: string;
    position: {
        chunk_id: number;
        x: number;
        y: number;
    };
    inventory: Array<Item>; // fixed 7 items
};

export type Users = {
    current_user: string;
    accounts: User[];
};
