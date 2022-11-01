const decimalPlaces = 100

Big.strict = true
Big.DP = decimalPlaces

let input = {
    nCount: undefined,
    numerator: undefined,
    denominator: undefined,
    getFracValue: function() {
        return (new Big(input.numerator)).div(input.denominator)
    },
    reset: function() {
        this.nCount = undefined,
        this.numerator = undefined,
        this.denominator = undefined
    }
}

let allSolutions = new Set()

$(document).ready(function() {
    $("#equationinfo").submit(function(event) {
        event.preventDefault()

        input.reset()
        input.nCount = parseInt($("#nCount").val())
        input.numerator = $("#numerator").val()
        input.denominator = $("#denominator").val()

        /*
        console.log(input.denominator, input.numerator, input.denominator < input.numerator)

        if (input.denominator < input.numerator) {
            $("#denominator")[0].setCustomValidity("The denominator must be greater than or equal to the numerator.")
            $("#denominator")[0].reportValidity()
            return
        }
        */

        solve()

        let solutions = `${allSolutions.size} solution${allSolutions.size != 1 ? "s" : ""} found<br><br>`

        allSolutions.forEach((solution) => {
            solutions += solution + "<br>"
        })

        $("#solutions").html(solutions)
    })
})

function getBounds(count, ans) {
    return {
        upper: Math.floor((new Big(count.toString())).div(ans).toString()), // count/ans
        lower: Math.floor((new Big("1")).div(ans).plus("1").toString()) // 1/ans + 1
    }
}

function checkSolution(terms) {
    let termSum = new Big("0")

    for (const term of terms) {
        const inverseTerm = (new Big("1")).div(term) // 1/term
        termSum = termSum.plus(inverseTerm)
    }

    if (termSum.toPrecision(decimalPlaces - 5) == input.getFracValue().toPrecision(decimalPlaces - 5)) {
        addSolution(terms)
    }
}

function addSolution(terms) {
    terms.sort((first, second) => parseInt(first) - parseInt(second))
    allSolutions.add(terms.join(", "))
}

function generatePossibleSolutions(count, ans, terms = []) {
    if (ans.lte("0")) {
        return
    }

    if (count == 1) {
        const finalTerm = Math.round((new Big("1")).div(ans).toString())
        terms.push(finalTerm.toString())

        if (terms[terms.length - 1] == `1e+${decimalPlaces}`) { // almost 0
            return
        }

        checkSolution(terms)
        return
    }

    const bounds = getBounds(count, ans)

    for (let i = bounds.lower; i <= bounds.upper; ++i) {
        const inverseValue = (new Big("1")).div(i.toString()) // 1/i
        let newTerms = [...terms]
        newTerms.push(i.toString())
        generatePossibleSolutions(count - 1, ans.minus(inverseValue), newTerms)
    }
}

function solve() {
    allSolutions = new Set()
    generatePossibleSolutions(input.nCount, input.getFracValue())
}
