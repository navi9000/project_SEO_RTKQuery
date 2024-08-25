function transliterate(input) {
    switch (input) {
        case "а": return "a"
        case "б": return "b"
        case "в": return "v"
        case "г": return "g"
        case "д": return "d"
        case "е": return "e"
        case "ё": return "yo"
        case "ж": return "zh"
        case "з": return "z"
        case "и": return "i"
        case "й": return "y"
        case "к": return "k"
        case "л": return "l"
        case "м": return "m"
        case "н": return "n"
        case "о": return "o"
        case "п": return "p"
        case "р": return "r"
        case "с": return "s"
        case "т": return "t"
        case "у": return "u"
        case "ф": return "f"
        case "х": return "h"
        case "ц": return "ts"
        case "ч": return "ch"
        case "ш": return "sh"
        case "щ": return "scsh"
        case "ъ": return ""
        case "ы": return "y"
        case "ь": return ""
        case "э": return "e"
        case "ю": return "u"
        case "я": return "ya"
        case " ": return "-"
        default: return input
    }
}

function convertNameIntoUrlSnippet(input) {
    return input.split("").map(symbol => transliterate(symbol)).join("")
}

function trimIdFromSnippet(input) {

    const splitUrl = input.split("-")
    splitUrl.pop()
    return splitUrl.join("-")
}

module.exports = {
    convertNameIntoUrlSnippet,
    trimIdFromSnippet
}