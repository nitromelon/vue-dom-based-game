import type Position from "./position";

export default class Thing {
    private _position: Position;
    private _width: number;
    private _height: number;

    constructor(position: Position, width: number, height: number) {
        this._position = position;
        this._width = width;
        this._height = height;
    }

    get position() {
        return this._position;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    demo_export() {
        return {
            top: `${this.position.y}px`,
            left: `${this.position.x}px`,
            width: this._width + "px",
            height: this.height + "px",
        };
    }
}
