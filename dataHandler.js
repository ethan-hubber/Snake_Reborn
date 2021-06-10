const fs = require("fs");

function saveItem(score) {
    var data = {
        "score": score,
        "username": username,
        "time": new Date().toLocaleDateString()
    }
    saveToFile(data)
}

function saveToFile(data) {
    let json = fs.readFileSync("scores.json")
    json = JSON.parse(json)
    json["data"].push(data)
    fs.writeFile("scores.json", JSON.stringify(json), function(err, result) {
        if (err) console.log(err)
        console.log("SAVED!")
    })
}

function getData() {
    return fs.readFileSync("scores.json")
}

module.exports = {
    saveItem,
    getData
}