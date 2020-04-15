import { useDivideByFive } from "hooks/useDivideByFive"
import { renderHook, RenderHookResult, act } from "@testing-library/react-hooks"

describe("useDivideByFive hook", () => {
    let dbfHook: ReturnType<typeof okok>
    beforeEach(() => {
        dbfHook = okok()
    })

    function okok() {
        const { result: result, rerender } = renderHook(() => {
            return useDivideByFive()
        })
        return { result, rerender }
    }

    test("Initial state", () => {
        expect(dbfHook.result.current.divided).toBe(0)
    })

    test("Just set not do yet", () => {
        act(() => {
            dbfHook.result.current.setDivider(5)
        })
        expect(dbfHook.result.current.divided).toBe(0)
    })

    test("Divide by five", () => {
        act(() => {
            dbfHook.result.current.setDivider(5)
        })
        dbfHook.rerender()
        act(() => {
            dbfHook.result.current.divideNow()
        })
        expect(dbfHook.result.current.divided).toBe(1)
    })
})