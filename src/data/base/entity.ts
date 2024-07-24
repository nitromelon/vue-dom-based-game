import { reactive, type Reactive } from "vue";
import Entity from "../core/entity";
import type { EntityStyle } from "./common-type";
import DirectionType from "../core/direction_type";

export default class BaseEntity {
    private entity: Entity;
    private background: string[];
    private size: {
        width: number;
        height: number;
    };
    private current_index = 0;

    private constructor(
        entity: Entity,
        background: string[],
        size: {
            width: number;
            height: number;
        },
    ) {
        this.entity = entity;
        this.background = background;
        this.size = size;
    }

    static new(entity: Entity, background: string[], width: number, height: number): BaseEntity {
        return reactive(new BaseEntity(entity, background, { width, height })) as BaseEntity;
    }

    add_background(...background: string[]) {
        this.background.push(...background);
    }

    // get_background() {
    //     return this.background[this.current_index];
    // }

    next_background() {
        const max = this.background.length;
        this.current_index = Math.min(max, this.current_index);
        // return this.current_index;
    }

    get_style(): Reactive<EntityStyle> {
        return reactive({
            base: {
                top: this.entity.position.y,
                left: this.entity.position.x,
                width: this.entity.width,
                height: this.entity.height,
            },
            size: { ...this.size, backgroundImage: this.background[this.current_index] ?? "" },
        });
    }

    get info() {
        return this.entity;
    }

    // This is for main char only. For now there will not have any dynamic entity beside main char so...
    get_image_for(direction: DirectionType) {
        switch (direction) {
            case DirectionType.Up:
                this.current_index = 2;
                break;
            case DirectionType.Down:
                this.current_index = 0;
                break;
            case DirectionType.Left:
                this.current_index = 1;
                break;
            case DirectionType.Right:
                this.current_index = 3;
                break;
        }
    }
}
