import type { Store } from "pinia";

type KeyboardStopState = Store<
    "global_keyboard_stop",
    {
        should_stop: boolean;
    },
    {},
    {}
>;

export type KeyboardEventCallback = (keys: Set<string>) => void;

const FPS = 1000 / 30;
export default class KeyboardEventStreamer {
    private static _instance: KeyboardEventStreamer | null = null;
    private _callback: Set<KeyboardEventCallback> = new Set();
    private _pressed_keys: Set<string> = new Set();
    private _last_update_time = 0;
    private _keyboard_stop: KeyboardStopState | undefined;

    private _on_key_down = (event: KeyboardEvent) => {
        if (this._keyboard_stop !== undefined && this._keyboard_stop.should_stop) {
            // console.log(this._keyboard_stop.should_stop);
            this._pressed_keys.clear();
            return;
        }
        this._pressed_keys.add(event.key);
    };

    private _on_key_up = (event: KeyboardEvent) => {
        this._pressed_keys.delete(event.key);
    };

    private _loop = () => {
        const now = performance.now();
        if (now - this._last_update_time > FPS) {
            if (this._pressed_keys.size > 0) {
                this._return_callbacks();
            }

            this._last_update_time = now - (now % FPS);
        }

        requestAnimationFrame(this._loop);
    };

    private constructor() {
        window.addEventListener("keydown", this._on_key_down);
        window.addEventListener("keyup", this._on_key_up);
        requestAnimationFrame(this._loop);
    }

    static get_instance(): KeyboardEventStreamer {
        if (KeyboardEventStreamer._instance === null) {
            KeyboardEventStreamer._instance = new KeyboardEventStreamer();
        }
        return KeyboardEventStreamer._instance;
    }

    private _return_callbacks() {
        this._callback.forEach((callback) => callback(this._pressed_keys));
    }

    add_callback(callback: KeyboardEventCallback): KeyboardEventStreamer {
        this._callback.add(callback);
        return this;
    }

    with_stop_state(plugin: KeyboardStopState): KeyboardEventStreamer {
        this._keyboard_stop = plugin;
        return this;
    }
}
