function generate() {
    const input = document.getElementById("input").value

    let deduped = ""
    for (const c of input) {
        if (!deduped.includes(c)) deduped += c
    }

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
    let junk = ""

    for (let i = 0; i < deduped.length * 7; i++) {
        junk += charset[Math.floor(Math.random() * charset.length)]
    }

    let chars = (deduped + junk).split("")
    for (let i = 0; i < deduped.length * (6 + Math.floor(Math.random() * 7)); i++) {
        junk += charset[Math.floor(Math.random() * charset.length)]
    }

    const substr = chars.join("")
    const indices = [...input].map(c => substr.indexOf(c) + 1)
    const subexpr = indices
        .map(i => `_substr:sub(${i},${i})`)
        .join(" .. ")

    const lua =
`local _substr = "${substr}"
local _luxsubenc = ${subexpr}
`

    document.getElementById("output").value = lua
}

function copy() {
    navigator.clipboard.writeText(
        document.getElementById("output").value
    )
}

function download() {
    const blob = new Blob(
        [document.getElementById("output").value],
        { type: "text/plain" }
    )

    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "luxsubenc.lua"
    a.click()
    URL.revokeObjectURL(a.href)
}

