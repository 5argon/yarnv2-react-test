import { renderHook, act } from "@testing-library/react-hooks"
import { useCalculateScore } from "hooks/useCalculateScore"
import { useDivideByFive } from "hooks/useDivideByFive"

describe("Both hooks", () => {
    test("Hook connection to score", () => {
        const { result: dbfResult, rerender: dbfRerender } = renderHook(() => useDivideByFive())
        const { result: csResult, rerender: csRerender } = renderHook(() => useCalculateScore(dbfResult.current.divided))

        act(() => {
            dbfResult.current.setDivider(5)
        })
        dbfRerender()
        act(() => {
            dbfResult.current.divideNow()
        })
        csRerender()

        act(() => {
            dbfResult.current.setDivider(10)
        })
        dbfRerender()
        act(() => {
            dbfResult.current.divideNow()
        })
        csRerender()

        act(() => {
            dbfResult.current.setDivider(15)
        })
        dbfRerender()
        act(() => {
            dbfResult.current.divideNow()
        })
        csRerender()

        expect(csResult.current.score).toBe(10000)
    })
})