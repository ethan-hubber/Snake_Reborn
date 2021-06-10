//file system so we can read the data
var fs = require("fs");
function readSyncJasonFile(){
 //data is of type string 
var data = fs.readFileSync("./scores.json")
//to change from string we do
console.log(JSON.parse(data))
}
//to import we need first to export
module.exports= {readSyncJasonFile};