import DirectionType, { get_opposite_direction } from "./direction_type";
import Entity from "./entity";
import Position from "./position";
import Thing from "./thing";

export default class Chunk extends Thing {
    // Only include the one that will potential block you in your way.
    // Otherwise, don't, for the sake of the performance.
    opacity = 1;
    private _entities: Entity[];
    constructor(position: Position, width: number, height: number, entities: Entity[]) {
        super(position, width, height);
        this._entities = entities;
    }

    get_future_distance_from_edge(target: Entity, steps: number, direction: DirectionType): number {
        const {
            position: { x: target_x, y: target_y },
            height: target_height,
            width: target_width,
        } = target;

        const {
            position: { x: chunk_x, y: chunk_y },
            height: chunk_height,
            width: chunk_width,
        } = this;

        switch (direction) {
            case DirectionType.Up:
                return target_y - steps - chunk_y;
            case DirectionType.Down:
                return chunk_y + chunk_height - (target_y + target_height + steps);
            case DirectionType.Left:
                return target_x - steps - chunk_x;
            case DirectionType.Right:
                return chunk_x + chunk_width - (target_x + target_width + steps);
            default:
                // 4 other directions will be calculated based on 4 existing direction above.
                console.error(
                    "class Chunk -> method get_future_distance_from_edge: Unreachable branch",
                );
                return 0;
        }
    }

    get_available_steps_for(target: Entity, steps: number, direction: DirectionType): number {
        let max_steps = steps;
        for (const e of this._entities) {
            if (target.is_it(e)) continue;

            const new_steps = e.get_min_step_from(
                target,
                max_steps,
                get_opposite_direction(direction),
            );

            if (new_steps === 0) return 0;
            max_steps = Math.min(max_steps, new_steps);
        }

        return max_steps;
    }

    // Experimental
    add_relaive_entity(target: Entity) {
        const target_position = target.position;
        const this_position = this.position;
        target_position.x += this_position.x;
        target_position.y += this_position.y;
        this.add_entity(target);
    }

    add_entity(target: Entity) {
        this._entities.push(target);
        this.sort_entities();
    }

    sort_entities() {
        // Topdown view so sort by top value
        this._entities.sort((a, b) => a.position.y - b.position.y);
    }

    remove_entity(target: Entity) {
        const index = this._entities.indexOf(target);
        if (index <= -1) return;
        this._entities.splice(index, 1);
    }

    get entities(): Entity[] {
        return this._entities;
    }
}
