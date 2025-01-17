//////////////////// 1 ////////////////////
/* function FilePath() {
  console.log(__filename);
}
FilePath(); */

///////////////////// 2 /////////////////////
/* function FileExtension(filePath) {
  return filePath.slice(filePath.lastIndexOf("."));
}
const filePath = "path/to/file.txt";
console.log(FileExtension(filePath)); */

////////////////// 3 ////////////////////////
/* const path = require("path");

function CheckPath(filePath) {
  return path.isAbsolute(filePath);
}
console.log(CheckPath("/path/to/file.txt"));
console.log(CheckPath("file.txt")); */

///////////////// 4 ////////////////////////
/* const path = require("path");
function JoinPaths(path1, path2) {
  return path.join(path1, path2);
}
console.log(JoinPaths("/folder1", "folder2/file.txt"));
 */

/////////////////// 5 ////////////////////////
/* const path = require("path");

function parseAndFormat(filePath) {
  const pathParse = path.parse(filePath);
  console.log("Parsed Object: ", pathParse);

  const formatedPath = path.format(pathParse);
  console.log("Formatted Object: ", formatedPath);
}
parseAndFormat("/path/to/file.txt"); */

//////////////////// 6 //////////////////////////
/* const fs = require("fs");

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`Failed To Delete The File ${err.message}`);
    } else {
      console.log(`File Deleted Successfully`);
    }
  });
}
deleteFile("file.txt");
 */

//////////////////////// 7 /////////////////////////////////
/* const fs = require("fs");

function createFolder(folderPath) {
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.log(`Failed To Create The Folder ${err.message}`);
    } else {
      console.log(`Folder Created Successfully`);
    }
  });
}
createFolder("NewFolder"); */

///////////////////////////// 8 /////////////////////////////
/* const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

function createAndTriggerEvent(eventName, message) {
  eventEmitter.on(eventName, (msg) => {
    console.log(`The event is triggered and the message ${msg} is logged.`);
  });
  eventEmitter.emit(eventName, message);
}
createAndTriggerEvent("greet", "Hello Event!"); */
