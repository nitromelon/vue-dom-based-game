import { reactive, type Reactive } from "vue";
import Chunk from "../core/chunk";
import Entity from "../core/entity";
import Position from "../core/position";
import type { Style } from "./common-type";

const PREFIX = "../../resources/map";
export default class BaseChunk {
    private chunk: Chunk;
    private url: string;

    private constructor(chunk: Chunk, url: string) {
        this.chunk = chunk;
        this.url = url;
    }

    static async new(e: Style, entities: Entity[]): Promise<BaseChunk> {
        // return reactive(
        //     new BaseChunk(
        //         new Chunk(new Position(e.left, e.top), e.width, e.height, entities),
        //         (await import(`${PREFIX}/${e.backgroundImage}`)).default,
        //     ),
        // ) as BaseChunk;
        return new BaseChunk(
            new Chunk(new Position(e.left, e.top), e.width, e.height, entities),
            (await import(`${PREFIX}/${e.backgroundImage}`)).default,
        );
    }

    create_relative_entity(top: number, left: number, width: number, height: number): Entity {
        const entity = new Entity(new Position(left, top), width, height);
        this.chunk.add_relaive_entity(entity);
        return entity;
    }

    get_style(): Reactive<Style> {
        return reactive({
            top: this.chunk.position.y,
            left: this.chunk.position.x,
            width: this.chunk.width,
            height: this.chunk.height,
            backgroundImage: this.url,
            opacity: this.chunk.opacity,
        });
    }

    get info() {
        return this.chunk;
    }
}

// for game map json part
import GAME_MAP_DATA from "../../resources/map/positions.json";

export function basechunk_extract_map_data(): Style[] {
    return GAME_MAP_DATA.map((e) => {
        return {
            top: e.position.y,
            left: e.position.x,
            width: e.size.width,
            height: e.size.height,
            backgroundImage: e.filename,
            opacity: 1,
        };
    });
}
