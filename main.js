const fs = require("fs");
const sleep = require("sleep");
const os = require("os");
const spawn = require("child_process");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var colors = require("colors");
var board = "wg";
var threadID = 7120187;

// TODO: refactor, and remove spaghet
function getPage() {
    var url = "http://boards.4chan.org/" + board + "/thread/" + threadID;
    spawn.exec("wget " + url); // im sure there's a better way to do this. maybe with JSDOM?
}
function isFileEmpty(_file) {
    if(file == null || file == undefined) {
        return true; // there's probably something wrong is this is true. i should probably let it try to fetch it again. who fucking knows
    }
    else { return false; }
}

function renameList() {
if(isFileEmpty(_file)) {
    fs.rename("./" + threadID, "wpList.html", (err,data) => console.log(err, + "\n"+data));
} 
}

getPage(); 
sleep.sleep(4); // there's this weird issue with racing. fs.readFileSync() gets called before the page is actually downloaded.
var _file = fs.readFileSync("./" + threadID, "utf8");
sleep.sleep(4);
renameList();
var file = _file;
const dom = new JSDOM(file);
var images = dom.window.document.getElementsByClassName("fileThumb");
var links = new Array(images.length+1);
// console.log(images.item(3).toString());
for(i = images.length-1;0 < i;i--) {
   // console.log(images.item(i).toString());
   // var incomp = images.item(i).toString().split("//")[1]
   // links[i] = images.item(i).toString();
   spawn.exec("cd images;wget " + images.item(i).toString().split("//")[1], (err, stdout) => console.log(stdout));
}