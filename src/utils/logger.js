/* global DEBUG */

export const Log = (...args) => {
    DEBUG && console.log(...args)
}