import { IncrementState, CounterTypes, INCREMENT } from "../actions/types";
const initialState: IncrementState = {
    counter: 0
}

export function increment(state = initialState, action: CounterTypes): IncrementState {
    switch(action.type) {
        case INCREMENT:
            return {
                counter: state.counter
            }
        default:
            return initialState;
    }
}