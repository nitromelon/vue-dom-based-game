import { reactive, type Reactive } from "vue";
import GameMap from "../core/map";

export default class BaseGameMap {
    private _map: GameMap;

    private constructor() {
        this._map = new GameMap();
    }

    static new(): BaseGameMap {
        return reactive(new BaseGameMap()) as BaseGameMap;
    }

    get_style(): Reactive<{
        top: number;
        left: number;
    }> {
        return reactive({
            top: this._map.position.y,
            left: this._map.position.x,
        });
    }

    get map() {
        return this._map;
    }
}
