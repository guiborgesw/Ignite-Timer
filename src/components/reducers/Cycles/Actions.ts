import type { Cycle } from "./Reducer"

export const ActionTypes = {
    ADD_NEW_CYCLE: 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE: 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED: 'MARK_CURRENT_CYCLE_AS_FINISHED',
} as const

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes]

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        }
    }
}

export function InterruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}

export function MarkCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}

export type CyclesActionTypes =
    | ReturnType<typeof addNewCycleAction>
    | ReturnType<typeof InterruptCurrentCycleAction>
    | ReturnType<typeof MarkCurrentCycleAsFinishedAction>