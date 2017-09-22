const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.props.rps.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    tie(){
        this.setState({message: "TIE"})
    }

    p1Wins(){
        this.setState({message: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({message: "P2 Wins!"})
    }

    invalid(){
        this.setState({message: "INVALID!!!!"})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.message}
            <input type="text" name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input type="text" name="p2Throw" onChange={this.inputChanged.bind(this)}/>
            <button onClick={this.submitForm.bind(this)}>PLAY</button>
        </div>
    }
}

describe("play form", function () {
    describe("when the game logic declares a tie", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, observer){
                    observer.tie()
                }
            })
        })

        it("displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })

    })

    describe("when the game logic declares p1 wins", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, observer){
                    observer.p1Wins()
                }
            })
        })

        it("displays 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitForm()
            expect(page()).toContain("P1 Wins!")
        })

    })

    describe("when the game logic declares p2 wins", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, observer){
                    observer.p2Wins()
                }
            })
        })

        it("displays 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitForm()
            expect(page()).toContain("P2 Wins!")
        })
    })

    describe("when the game logic declares invalid", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, observer){
                    observer.invalid()
                }
            })
        })

        it("displays 'INVALID!!!!'", function () {
            expect(page()).not.toContain("INVALID!!!!")
            submitForm()
            expect(page()).toContain("INVALID!!!!")
        })
    })

    it("sends the p1 and p2 throw user input to the game engine", function () {
        let playSpy = jasmine.createSpy()

        mountApp({
            play: playSpy
        })

        let p1ThrowInputElement = document.querySelector("input[name='p1Throw']")
        let p2ThrowInputElement = document.querySelector("input[name='p2Throw']")

        p1ThrowInputElement.value = "foo"
        p2ThrowInputElement.value = "bar"

        ReactTestUtils.Simulate.change(p1ThrowInputElement)
        ReactTestUtils.Simulate.change(p2ThrowInputElement)


        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })


    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "playFormTestFixture"
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function mountApp(rps) {
        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})