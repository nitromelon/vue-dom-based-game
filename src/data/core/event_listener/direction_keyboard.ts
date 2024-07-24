import DirectionType from "../direction_type";
import type { KeyboardEventCallback } from "./keyboard";

type DirectionEventCallback = (direction: DirectionType, steps: number) => void;

const STEPS_INPUT = 12;
// const STEPS = 60;

let steps_reference = STEPS_INPUT;
export function get_steps_reference() {
    return steps_reference;
}

const UP_KEY = "w";
const DOWN_KEY = "s";
const LEFT_KEY = "a";
const RIGHT_KEY = "d";

export default function keyboard_direction(
    callback: DirectionEventCallback,
): KeyboardEventCallback {
    return (keys: Set<string>) => {
        const keys_size = keys.size;
        if (keys_size > 2) {
            callback(DirectionType.None, 0);
            return;
        }

        // Purpose of seed: random walk -1 to near 1 <- more natural walk I guess lol
        // and callback side effect from event entity can stop being 0 all the time.
        const seed = Math.random() * 2 - 1;
        const STEPS = STEPS_INPUT + seed;
        steps_reference = STEPS;

        const up_key = keys.has(UP_KEY);
        const left_key = keys.has(LEFT_KEY);
        const down_key = keys.has(DOWN_KEY);
        const right_key = keys.has(RIGHT_KEY);

        if (up_key && left_key) {
            callback(DirectionType.UpLeft, STEPS);
            return;
        }

        if (up_key && right_key) {
            callback(DirectionType.UpRight, STEPS);
            return;
        }

        if (down_key && left_key) {
            callback(DirectionType.DownLeft, STEPS);
            return;
        }

        if (down_key && right_key) {
            callback(DirectionType.DownRight, STEPS);
            return;
        }

        if (keys_size !== 1) {
            callback(DirectionType.None, 0);
            return;
        }

        if (up_key) {
            callback(DirectionType.Up, STEPS);
            return;
        }

        if (down_key) {
            callback(DirectionType.Down, STEPS);
            return;
        }

        if (left_key) {
            callback(DirectionType.Left, STEPS);
            return;
        }

        if (right_key) {
            callback(DirectionType.Right, STEPS);
            return;
        }
    };
}
