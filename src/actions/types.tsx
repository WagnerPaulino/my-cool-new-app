export const INCREMENT = 'INCREMENT'

interface Increment {
    type: typeof INCREMENT
    counter: number
}

export interface IncrementState {
    counter: number;
}

export type CounterTypes = Increment