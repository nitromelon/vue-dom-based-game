// Experimental
// export default class EventEntity extends Thing {
//     constructor(position: Position, width: number, height: number) {
//         super(position, width, height);
//     }
// }

// Side effect type
export const enum EventEntityDistanceType {
    In,
    Out,
}
export type EntityDistanceCallback = (distance: EventEntityDistanceType) => void;
