function play(p1, p2, observer) {
    new PlayRequest(p1, p2, observer).execute()
}

function PlayRequest(p1, p2, observer) {
    this.execute = function() {
        if (throwInvalid())
            observer.invalid()
        else if (draw())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    const validShapes = ["rock", "paper", "scissors"]

    function throwInvalid() {
        return !validShapes.includes(p1) || !validShapes.includes(p2)
    }

    function draw() {
        return p1 === p2
    }

    function p1Wins() {
        return(
            p1 === "rock"     && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper"    ||
            p1 === "paper"    && p2 === "rock"
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
            play("rock", "scissors", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            play("scissors", "paper", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            play("paper", "rock", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

    })

    describe("p2 wins scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            play("scissors", "rock", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            play("paper", "scissors", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            play("rock", "paper", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it("rock v. rock", function () {
            play("rock", "rock", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            play("paper", "paper", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            play("scissors", "scissors", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["invalid"])
        })

        it("<invalid> v. <valid>", function () {
            play(Math.random(), "scissors", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("<valid> v. <invalid>", function () {
            play("scissors", Math.random(), observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("invalid v. same invalid", function () {
            play("sailboat", "sailboat", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

    })
})