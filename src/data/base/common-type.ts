export type Style = {
    top: number;
    left: number;
    width: number;
    height: number;
    backgroundImage: string;
    opacity: number;
};

export type EntityStyle = {
    base: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    size: {
        width: number;
        height: number;
        backgroundImage: string;
    };
};
