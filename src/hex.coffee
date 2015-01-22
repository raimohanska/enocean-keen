pad2 = (x) -> if (x.length >= 2) then x else "0" + x

formatHex = (n) -> pad2(n.toString(16))

parseHex = (n) -> parseInt(n, 16)

module.exports = { formatHex, parseHex }
