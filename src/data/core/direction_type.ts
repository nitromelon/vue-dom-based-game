const enum DirectionType {
    Up,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
    None,
}

export function get_opposite_direction(direction: DirectionType): DirectionType {
    switch (direction) {
        case DirectionType.Up:
            return DirectionType.Down;
        case DirectionType.Down:
            return DirectionType.Up;
        case DirectionType.Left:
            return DirectionType.Right;
        case DirectionType.Right:
            return DirectionType.Left;
        case DirectionType.UpLeft:
            return DirectionType.DownRight;
        case DirectionType.UpRight:
            return DirectionType.DownLeft;
        case DirectionType.DownLeft:
            return DirectionType.UpRight;
        case DirectionType.DownRight:
            return DirectionType.UpLeft;
        default:
            return DirectionType.None;
    }
}

export default DirectionType;
