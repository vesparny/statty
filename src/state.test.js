const rewire = require("rewire")
const state = rewire("./state")
const isObjectNotNull = state.__get__("isObjectNotNull")
// @ponicode
describe("isObjectNotNull", () => {
    test("0", () => {
        let callFunction = () => {
            isObjectNotNull(0, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            isObjectNotNull(-5.48, -5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            isObjectNotNull(100, { This: "is", an: "object", Do: 0, you: 1, Like: 2, it: 10000 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            isObjectNotNull(100, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            isObjectNotNull(-100, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            isObjectNotNull(NaN, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setStateIfNeeded", () => {
    let inst

    beforeEach(() => {
        inst = new state.default({ state: "Abruzzo" }, { __statty__: { inspect: "Message recipient is not the grader, the person being graded, or the controller", broadcast: "4.0.0-beta1\t" } })
    })

    test("0", () => {
        let callFunction = () => {
            inst.setStateIfNeeded({})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.setStateIfNeeded(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new state.default({ state: {} }, { __statty__: { inspect: "Top level object in 'override.yml' needs to be an object", broadcast: "v4.0.0-rc.4" } })
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentWillUnmount", () => {
    let inst

    beforeEach(() => {
        inst = new state.default({ state: {} }, { __statty__: { inspect: "Unable to allocate address", broadcast: "1.0.0" } })
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillUnmount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("render", () => {
    let inst

    beforeEach(() => {
        inst = new state.default({ state: {} }, { __statty__: { inspect: "unexpected error", broadcast: "^5.0.0" } })
    })

    test("0", () => {
        let callFunction = () => {
            inst.render()
        }
    
        expect(callFunction).not.toThrow()
    })
})
