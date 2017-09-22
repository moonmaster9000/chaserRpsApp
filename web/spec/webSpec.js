const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.props.rps.play("p1 throw", "p2 throw", this)
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

    render() {
        return <div>
            {this.state.message}
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