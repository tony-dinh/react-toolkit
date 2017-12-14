export const noop = () => {}

export const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()
