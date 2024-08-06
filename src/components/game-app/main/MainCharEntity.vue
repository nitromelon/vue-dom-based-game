<script setup lang="ts">
import type { EntityStyle } from "@/data/base/common-type";
import type { KeyboardEventCallback } from "@/data/core/event_listener/keyboard";
import KeyboardEventStreamer from "@/data/core/event_listener/keyboard";
import { onMounted, onUnmounted, ref, type Ref } from "vue";

const props = defineProps<{ style: EntityStyle, this_user: boolean }>();

const video_display = ref(false);
const video_element: Ref<HTMLVideoElement | null> = ref(null);
let stream: MediaStream | undefined = undefined;
let last_press_time = 0;

const callback: KeyboardEventCallback = async (keys) => {
    const current_time = Date.now();
    if (current_time - last_press_time < 250) return;
    last_press_time = current_time
    if (keys.has("v")) {
        video_display.value = !video_display.value
        if (!video_display.value && stream) {
            stream.getTracks().forEach(t => t.stop())
            return;
        };

        if (props.this_user) {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true })
                    if (video_element.value) {
                        video_element.value.srcObject = stream
                        video_element.value.play();
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("implemented")
        }
    }
}

onMounted(async () => {
    KeyboardEventStreamer.get_instance().add_callback(callback)
})

onUnmounted(() => {
    KeyboardEventStreamer.get_instance().remove_callback(callback)
    if (stream) {
        stream.getTracks().forEach(t => t.stop())
    }
})
</script>

<template>
    <div class="parent" :style="{
        top: `${style.base.top}px`,
        left: `${style.base.left}px`,
        width: `${style.base.width}px`,
        height: `${style.base.height}px`,
    }">
        <div class="child" :style="{
            width: `${style.size.width}px`,
            height: `${style.size.height}px`,
            background: `url(${style.size.backgroundImage})`,
        }">
            <!-- This will be video -->
            <div class="rect-on-top" :style="{ display: video_display === true ? 'block' : 'none' }">
                <video ref="video_element" class="webcam-video"></video>
            </div>
        </div>
    </div>
</template>

<style scoped>
.parent {
    position: absolute;
    overflow: visible;
    transition: 0.25s cubic-bezier(0, 1, 0, 1);
}

.child {
    position: absolute;
    bottom: 0;
    left: 0;
}

.rect-on-top {
    position: absolute;
    top: calc(-8px - 140px);
    left: 50%;
    height: 140px;
    width: 256px;
    transform: translate(-50%);
    border: 1px solid #4b4b44;
    border-radius: 8px;
    opacity: 0.1;
    filter: blur(10px);
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    overflow: hidden;
}

.rect-on-top:hover {
    opacity: 1;
    filter: none;
}

.webcam-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
