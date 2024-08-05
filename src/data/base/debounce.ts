const debounce = (fn: (...args: any[]) => void, time: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
        const later = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, time);
    };
};

export default debounce;
