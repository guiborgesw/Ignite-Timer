import { useEffect, useReducer, useState, type ReactNode } from "react"
import { addNewCycleAction, InterruptCurrentCycleAction, MarkCurrentCycleAsFinishedAction } from "../components/reducers/Cycles/Actions"
import { cyclesReducer, type Cycle } from "../components/reducers/Cycles/Reducer"
import { differenceInSeconds } from "date-fns"
import { CyclesContext, type createCycleData } from "./CyclesContextProvider"


interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    })

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            const secondsDifference = differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate),
            )

            return secondsDifference
        }

        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

    }, [cyclesState])



    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(MarkCurrentCycleAsFinishedAction())
    }

    function createNewCycle(data: createCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(InterruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}