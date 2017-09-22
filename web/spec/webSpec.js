const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.setState({message: "TIE"})
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