const ReportQueryPage = require("./ReportQueryPage")
// @ponicode
describe("componentWillReceiveProps", () => {
    let inst

    beforeEach(() => {
        inst = new ReportQueryPage.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps("dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.componentWillReceiveProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onPressDelegationPage", () => {
    let inst

    beforeEach(() => {
        inst = new ReportQueryPage.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onPressDelegationPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onPressPositionDetailsQueryPage", () => {
    let inst

    beforeEach(() => {
        inst = new ReportQueryPage.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onPressPositionDetailsQueryPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onPressPositionSummaryPage", () => {
    let inst

    beforeEach(() => {
        inst = new ReportQueryPage.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onPressPositionSummaryPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})
