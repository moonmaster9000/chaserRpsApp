function playRound(p1Throw, p2Throw, observer) {
    new PlayRoundRequest(p1Throw, p2Throw, observer).execute()
}

function PlayRoundRequest(p1Throw, p2Throw, observer) {
    this.execute = function() {
        if (isInvalidThrow())
            observer.invalid()
        else if (isTie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    const validThrows = ["rock", "paper", "scissors"]

    function isInvalidThrow() {
        return !validThrows.includes(p1Throw) || !validThrows.includes(p2Throw)
    }

    function isTie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return(
            p1Throw === "rock"     && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper"    ||
            p1Throw === "paper"    && p2Throw === "rock"
        )
    }
}

describe("play", function () {
    let observer

    describe("p1 wins scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p1Wins"])
        })

        it("rock v. scissors", function () {
            playRound("rock", "scissors", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            playRound("scissors", "paper", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            playRound("paper", "rock", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

    })

    describe("p2 wins scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            playRound("scissors", "rock", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            playRound("paper", "scissors", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            playRound("rock", "paper", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it("rock v. rock", function () {
            playRound("rock", "rock", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            playRound("paper", "paper", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            playRound("scissors", "scissors", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["invalid"])
        })

        it("<invalid> v. <valid>", function () {
            playRound(Math.random(), "scissors", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("<valid> v. <invalid>", function () {
            playRound("scissors", Math.random(), observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("invalid v. same invalid", function () {
            playRound("sailboat", "sailboat", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

    })
})