import { EventEntityDistanceType, type EntityDistanceCallback } from "../core/event_entity";

type Callback = () => void;

export default class EventEntityChain {
    private collide = false;
    private in_call_back?: Callback;
    private out_call_back?: Callback;

    static new(): EventEntityChain {
        return new EventEntityChain();
    }

    with_in(callback: Callback): EventEntityChain {
        this.in_call_back = callback;
        return this;
    }

    with_out(callback: Callback): EventEntityChain {
        this.out_call_back = callback;
        return this;
    }

    export(): EntityDistanceCallback {
        return (in_out) => {
            switch (in_out) {
                case EventEntityDistanceType.In:
                    this.collide = true;
                    this.in_call_back?.();
                    break;
                case EventEntityDistanceType.Out:
                    if (this.collide) {
                        this.collide = false;
                        this.out_call_back?.();
                    }
                    break;
            }
        };
    }
}
