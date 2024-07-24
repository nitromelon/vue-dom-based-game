import Chunk from "./chunk";
import DirectionType, { get_opposite_direction } from "./direction_type";
import Entity from "./entity";
import Position from "./position";

// change _connection to 2D array of Chunk | null for better memory efficiency and better performance
export default class GameMap {
    private _position: Position;
    private _connection: Map<Chunk, Map<DirectionType, Chunk>>;

    constructor() {
        this._position = new Position(0, 0);
        this._connection = new Map();
    }

    private get_chunk_existence(target: Chunk): Map<DirectionType, Chunk> {
        return this._connection.get(target) ?? this._connection.set(target, new Map()).get(target)!;
    }

    get position() {
        return this._position;
    }

    set_connection(self: Chunk, target: Chunk, direction: DirectionType) {
        this.get_chunk_existence(self).set(direction, target);
        this.get_chunk_existence(target).set(get_opposite_direction(direction), self);
    }

    get_next_chunk(self: Chunk, direction: DirectionType): Chunk | null {
        return this.get_chunk_existence(self).get(direction) ?? null;
    }

    calbrate_position_from(target: Entity) {
        const {
            position: { x: target_x, y: target_y },
            width: target_width,
            height: target_height,
        } = target;

        const { x: map_x, y: map_y } = this._position;
        const { innerHeight, innerWidth } = window;

        const map_x_offset = innerWidth / 2 - (map_x + target_x + target_width / 2);
        const map_y_offset = innerHeight / 2 - (map_y + target_y + target_height / 2);

        this._position.x += map_x_offset;
        this._position.y += map_y_offset;
    }

    // experimental
    set_opacity_gradient_from(current_chunk: Chunk) {
        current_chunk.opacity = 1;
        const next_left = this.get_next_chunk(current_chunk, DirectionType.Left);
        const next_right = this.get_next_chunk(current_chunk, DirectionType.Right);
        const next_top = this.get_next_chunk(current_chunk, DirectionType.Up);
        const next_bottom = this.get_next_chunk(current_chunk, DirectionType.Down);

        if (next_left !== null) {
            next_left.opacity = 0.5;
        }

        if (next_right !== null) {
            next_right.opacity = 0.5;
        }

        if (next_top !== null) {
            next_top.opacity = 0.5;
        }

        if (next_bottom !== null) {
            next_bottom.opacity = 0.5;
        }
    }
}
