import { CounterTypes, INCREMENT } from "./types";

export function increment(counter: number): CounterTypes {
    return {
        type: INCREMENT,
        counter: counter + 1
    }
}