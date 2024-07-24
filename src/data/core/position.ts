import DirectionType from "./direction_type";

export default class Position {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    clone_from_move(steps: number, direction: DirectionType): Position {
        const clone = new Position(this.x, this.y);
        clone.move(steps, direction);
        return clone;
    }

    move(steps: number, direction: DirectionType) {
        switch (direction) {
            case DirectionType.Up:
                this.y -= steps;
                break;
            case DirectionType.Down:
                this.y += steps;
                break;
            case DirectionType.Left:
                this.x -= steps;
                break;
            case DirectionType.Right:
                this.x += steps;
                break;
        }
    }
}
