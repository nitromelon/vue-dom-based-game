import { EventEntityDistanceType, type EntityDistanceCallback } from "./event_entity";
import DirectionType from "./direction_type";
import Position from "./position";
import Thing from "./thing";
import { get_steps_reference } from "./event_listener/direction_keyboard";

export default class Entity extends Thing {
    // Todo: add z-index
    // private z_index = 0;
    // Solved: using array instead of set for entity => z-index = index of array
    private distance_callbacks: EntityDistanceCallback[] = [];
    constructor(position: Position, width: number, height: number) {
        super(position, width, height);
    }

    private distance_from(target: Entity, direction: DirectionType): number {
        let result;
        switch (direction) {
            case DirectionType.Up:
                result = Math.abs(this.position.y - (target.position.y + target.height));
                break;
            case DirectionType.Down:
                result = Math.abs(target.position.y - (this.position.y + this.height));
                break;
            case DirectionType.Left:
                result = Math.abs(this.position.x - (target.position.x + target.width));
                break;
            case DirectionType.Right:
                result = Math.abs(target.position.x - (this.position.x + this.width));
                break;
            default:
                // 4 other directions will be calculated based on 4 existing direction above.
                console.error("class Entity -> method distance_from: Unreachable branch");
                result = 0;
                break;
        }

        return result;
    }

    get_min_step_from(target: Entity, steps: number, direction: DirectionType): number {
        const {
            position: { x: this_x, y: this_y },
            width: this_width,
            height: this_height,
        } = this;

        const {
            position: { x: target_x, y: target_y },
            width: target_width,
            height: target_height,
        } = target;

        const { x: future_x, y: future_y } = this.position.clone_from_move(steps, direction);
        const min_x = Math.min(this_x, future_x);
        const max_x = Math.max(this_x + this_width, future_x + this_width);
        const min_y = Math.min(this_y, future_y);
        const max_y = Math.max(this_y + this_height, future_y + this_height);

        // If entity is about to collide
        if (
            max_x > target_x &&
            min_x < target_x + target_width &&
            max_y > target_y &&
            min_y < target_y + target_height
        ) {
            steps = this.distance_from(target, direction);

            if (steps !== 0) {
                this.distance_callbacks.forEach((c) => {
                    c(EventEntityDistanceType.In);
                });
            }
        }

        // Just a callback to notify entity when it moves away from event entity
        if (steps === get_steps_reference()) {
            this.distance_callbacks.forEach((c) => {
                c(EventEntityDistanceType.Out);
            });
        }

        return steps;
    }

    is_it(target: Entity): boolean {
        return (
            target.height === this.height &&
            target.width === this.width &&
            target.position.x === this.position.x &&
            target.position.y === this.position.y
        );
    }

    with_distance_callback(distance_callback: EntityDistanceCallback): Entity {
        this.distance_callbacks.push(distance_callback);
        return this;
    }
}
