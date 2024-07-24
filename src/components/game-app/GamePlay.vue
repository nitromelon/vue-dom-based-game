<script setup lang="ts">
import BaseChunk, { basechunk_extract_map_data } from "@/data/base/chunk";
import { onMounted, reactive } from "vue";
import MainMap from "./main/MainMap.vue";
import MainChunk from "./main/MainChunk.vue";
import BaseGameMap from "@/data/base/game-map";
import BaseEntity from "@/data/base/entity";
import MainCharEntity from "./main/MainCharEntity.vue";
import KeyboardEventStreamer from "@/data/core/event_listener/keyboard";
import keyboard_direction, {
    get_steps_reference,
} from "@/data/core/event_listener/direction_keyboard";
import DirectionType from "@/data/core/direction_type";
import {
    map_set_up_chunk_bricks,
    map_set_up_chunk_linking,
} from "@/data/base/welcome-to-the-madness";
import { EventEntityDistanceType } from "@/data/core/event_entity";

const map = BaseGameMap.new();
const chunks = await Promise.all(basechunk_extract_map_data().map((v) => BaseChunk.new(v, [])));

const STARTER_NUMBER = 57;
const main_char_entity = chunks[STARTER_NUMBER].create_relative_entity(50, 50, 32, 1);
const main_char_image_promises = [
    "../../resources/entity/main/main1.png",
    "../../resources/entity/main/main2.png",
    "../../resources/entity/main/main3.png",
    "../../resources/entity/main/main4.png",
].map((path) => import(path));

const main_char = BaseEntity.new(
    main_char_entity,
    await Promise.all(main_char_image_promises).then((imgs) => imgs.map((img) => img.default)),
    32,
    44,
);

let current_chunk = chunks[STARTER_NUMBER].info;

map_set_up_chunk_linking(map.map, chunks); // 🗣️🔥🔥🔥
map_set_up_chunk_bricks(chunks); // 🗣️🔥🔥🔥

// quầy lễ tân
let collide = false;
chunks[59].create_relative_entity(34, 384, 82, 103).with_distance_callback((in_out) => {
    // callback have input: number but maybe we don't need that
    switch (in_out) {
        case EventEntityDistanceType.In:
            collide = true;
            console.log("in");
            break;
        case EventEntityDistanceType.Out:
            if (collide) {
                collide = false;
                console.log("out");
            }
            break;
    }
});

// quầy cà phê
chunks[4].create_relative_entity(171, 134, 85, 101).with_distance_callback(() => {
    // same as above
    // alert("lol");
});

map.map.calbrate_position_from(main_char_entity);

const diagonal_number = Math.sqrt(2) / 2;
const callback = (d: DirectionType, steps: number) => {
    if (d === DirectionType.None) return;

    switch (d) {
        case DirectionType.UpLeft:
            callback(DirectionType.Up, diagonal_number * steps);
            callback(DirectionType.Left, diagonal_number * steps);
            return;
        case DirectionType.UpRight:
            callback(DirectionType.Up, diagonal_number * steps);
            callback(DirectionType.Right, diagonal_number * steps);
            return;
        case DirectionType.DownLeft:
            callback(DirectionType.Down, diagonal_number * steps);
            callback(DirectionType.Left, diagonal_number * steps);
            return;
        case DirectionType.DownRight:
            callback(DirectionType.Down, diagonal_number * steps);
            callback(DirectionType.Right, diagonal_number * steps);
            return;
    }

    let min_steps = current_chunk.get_available_steps_for(main_char.info, steps, d);
    const distance_from_edge = current_chunk.get_future_distance_from_edge(
        main_char.info,
        min_steps,
        d,
    );

    if (distance_from_edge < 0) {
        const next_chunk = map.map.get_next_chunk(current_chunk, d);
        if (next_chunk !== null) {
            current_chunk.remove_entity(main_char.info);
            next_chunk.add_entity(main_char.info);
            current_chunk = next_chunk;
            min_steps = current_chunk.get_available_steps_for(main_char.info, steps, d);

            // debug chunk bug for now.
            // map.map.set_opacity_gradient_from(current_chunk)
        } else {
            min_steps += distance_from_edge;
        }
    }

    main_char.get_image_for(d);
    main_char.info.position.move(min_steps, d);
    current_chunk.sort_entities();
    map.map.calbrate_position_from(main_char.info);
};

onMounted(() => {
    window.addEventListener("resize", () => {
        map.map.calbrate_position_from(main_char.info);
    });
    KeyboardEventStreamer.get_instance().add_callback(keyboard_direction(callback));
});
</script>

<!-- 
    Note for future structure (dom structure):
    + Map
        + Chunk 1
        + Chunk n
        ...
        + Entities whose top is smaller or equal than current character
        + Main character
        + Entities whose top is larger than current character

    When entity move (not just limit at players, but npc I guess)
    !! Warning: steps should be small (like 10 - 20-ish), otherwise it will go through the objects
        + chunk.get_available_steps_for to get max step
        + chunk.get_distance_from_edge to get know if chunk get out of chunk
            + map will spawn next chunk (or just do nothing)
            + this_current_chunk = next chunk
                + then chunk.get_available_steps_for again
        + if not then just move to edge and done
        + move the entity
        + calibrate position (only main player only)
        + check if stand on event-like block?

    Note for current bugs:
        + implement map scale in / out (cause it's cool)
        + make a recursive function to move (basically detect collision for future move on next chunk)

    Other note:
    recurive calculate steps:
        calculateMinSteps(current_chunk, style1, steps, d) {
            let min_steps = current_chunk.get_available_steps_for(style1, steps, d);
            const distance_from_edge = current_chunk.get_future_distance_from_edge(style1, min_steps, d);

            if (distance_from_edge < 0) {
                const next_chunk = this.demo_map.get_next_chunk(current_chunk, d);
                if (next_chunk !== null) {
                    console.log("Switch");
                    const remaining_steps = steps - min_steps;
                    return this.calculateMinSteps(next_chunk, style1, remaining_steps, d);
                } else {
                    console.log("No switch :(");
                    min_steps += distance_from_edge;
                }
            }
            return min_steps;
        }
-->

<template>
    <div id="wrapper">
        <MainMap :style="map.get_style()">
            <MainChunk
                v-for="(chunk_style, index) in reactive(chunks.map((c) => c.get_style()))"
                :key="index"
                :style="chunk_style"
                :debug="index"
            />
            <MainCharEntity :style="main_char.get_style()" />
        </MainMap>
    </div>
</template>

<style scoped>
#wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #1a1a1a;
}
</style>
