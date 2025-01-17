const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const EventEmitter = require("events");
const os = require("os");
const zlib = require("zlib");
const { pipeline } = require("stream");
app.use(express.json());
// Task 1.1
app.post("/path-info", (req, res) => {
  const filePath = req.body.filePath;
  if (!filePath) {
    return res.status(404).send("File Path Is Not Correct");
  }
  const root = path.parse(filePath).root;
  const dir = path.parse(filePath).dir;
  const base = path.parse(filePath).base;
  const name = path.parse(filePath).name;
  const ext = path.parse(filePath).ext;

  const formattedString = `File Path: ${filePath}\nRoot: ${root}\nDirectory: ${dir}\nBaseName: ${base}\nFile Name: ${name}\nExtension: ${ext}`;
  res.send(formattedString);
});

//Task 1.2
app.post("/path-check", (req, res) => {
  const filePath = req.body.filePath;
  if (!filePath) {
    return res.status(404).send("File Path Is Not Correct");
  }

  const isAbsolute = path.isAbsolute(filePath);
  const basename = path.parse(filePath).base;
  const extname = path.parse(filePath).ext;
  const joinedPath = path.join(filePath);
  const resolvedPath = path.resolve(filePath);

  const response = {
    isAbsolute: isAbsolute,
    basename: basename,
    extname: extname,
    joinedPath: joinedPath,
    resolvedPath: resolvedPath,
  };
  res.json(response);
});

//Task 2
class FileEventEmitter extends EventEmitter {}
const fileEventEmitter = new FileEventEmitter();

fileEventEmitter.on("fileCreated", (fileName) => {
  console.log(`Event emitted: fileCreated for ${fileName}`);
});
fileEventEmitter.on("fileDeleted", (fileName) => {
  console.log(`Event emitted: fileDeleted for ${fileName}`);
});

app.post("/create-file", (req, res) => {
  const { fileName, content } = req.body;

  if (!fileName) {
    return res.status(400).send("File name is required");
  }

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).send("Error creating file");
    }
    fileEventEmitter.emit("fileCreated", fileName);
    res.status(201).send(`File ${fileName} created successfully`);
  });
});

app.delete("/delete-file", (req, res) => {
  const fileName = req.body.fileName;

  if (!fileName) {
    return res.status(400).send("File name is required");
  }

  fs.unlink(fileName, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).send("Error deleting file");
    }
    fileEventEmitter.emit("fileDeleted", fileName);
    res.status(200).send(`File ${fileName} deleted successfully`);
  });
});

//Task 3

app.get("/system-info", (req, res) => {
  const systemInfo = {
    architecture: os.arch(),
    platform: os.platform(),
    freeMemory: `${os.freemem()}`,
    totalMemory: `${os.totalmem()}`,
  };
  res.status("200").json(systemInfo);
});

//Task 4
//Task 4.1
app.post("/Create-File", (req, res) => {
  const { fileName, content } = req.body;
  if (!fileName || !content) {
    res.status(400).json({ message: "FileName And Content are REQUIRED!!!" });
  }
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      res.status(404).json({ message: "Error While Creating The File" });
    }
    res.status(200).json({ message: `File ${fileName} Created Successfully` });
  });
});

app.delete("/Delete-File", (req, res) => {
  const { fileName } = req.body;
  if (!fileName) {
    res.status(400).json({ message: "FileName Is Required!!!" });
  }
  fs.unlink(
    fileName,
    (err = {
      if(err) {
        res
          .status(400)
          .json({ message: `Error Deleting The File ${err.message}` });
      },
    })
  );
  res.status(200).json({ message: `File ${fileName} Deleted Successfully` });
});

//Task 4.2
app.post("/append-async", (req, res) => {
  const { fileName, content } = req.body;
  if (!fileName || !content) {
    res.status(400).json({ message: `FileName And Content Are Required` });
  }
  const filePath = path.join(__dirname, fileName);

  fs.appendFile(filePath, content, (error) => {
    if (error)
      return res
        .status(500)
        .json({ message: `Error While Appending to file: ${error.message}` });
  });
  return res.status(200).json({ message: `Content Appended Successfully` });
});

app.post("/read-async", (req, res) => {
  const { fileName } = req.body;
  if (!fileName)
    return res.status(400).json({ message: `File Name Is Required` });
  const filePath = path.resolve(__dirname, fileName);
  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        return res.status(400).json({ message: `File not found` });
      }
      return res
        .status(500)
        .json({ message: `Error while reading the file: ${error.message}` });
    }
    return res
      .status(200)
      .json({ message: `File read successfully`, content: data });
  });
});

//Task 5.1

app.post("/stream-file", (req, res) => {
  const fileName = req.body.fileName.trim();
  if (!fs.existsSync(fileName)) {
    return res.status(400).send("File Not Found");
  }
  const readStream = fs.createReadStream(fileName, {
    highWaterMark: 16,
  });
  console.log("Stream opened");
  readStream.on("data", (chunk) => {
    console.log(`Data event recieved: ${chunk}`);
  });
  readStream.on("end", () => {
    console.log(`Stream ended`);
    res.end();
  });
  readStream.on("error", (error) => {
    console.log(`Stream error: ${error.message}`);
    res.status(500).send(`Stream error: ${error.message}`);
  });
});

//Task 5.2

app.post("/copy-file", (req, res) => {
  const { sourceFile, destinationFile } = req.body;
  if (!fs.existsSync(sourceFile)) {
    return res.status(400).send("Source file not found");
  }
  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(destinationFile);
  console.log("Start copying the file...");
  readStream.on("error", (error) => {
    res.status(500).send(`Read stream error: ${error.message}`);
  });
  writeStream.on("error", (error) => {
    res.status(500).send(`Write stream error: ${error.message}`);
  });
  writeStream.on("finish", () => {
    console.log("File copied successfully");
    res.send("File copied successfully");
  });
  pipeline(readStream, writeStream, (err) => {
    if (err) {
      console.error(`Pipeline error: ${err.message}`);
      return res.status(500).send(`Pipeline error: ${err.message}`);
    }
    console.log("File successfully copied");
    res.send("File successfully copied");
  });
});

//Task 5.3

app.post("/compress-file", (req, res) => {
  const { fileName } = req.body;
  if (!fs.existsSync(fileName)) {
    return res.status(400).send("Source file not found");
  }
  const readStream = fs.createReadStream(fileName);
  const gzipStream = zlib.createGzip();
  const compressedFileName = `${fileName}.gz`;
  const writeStream = fs.createWriteStream(compressedFileName);
  console.log(`Start compressing...`);

  readStream.on("error", (error) => {
    res.status(500).send(`Read stream error: ${error.message}`);
  });
  writeStream.on("error", (error) => {
    res.status(500).send(`Write stream error: ${error.message}`);
  });
  writeStream.on("finish", () => {
    console.log("The file compressd successfully");
    res.send("The file compressed successfully");
  });
  pipeline(readStream, gzipStream, writeStream, (err) => {
    if (err) {
      console.error(`Pipeline error: ${err.message}`);
      res.status(500).send(`Pipeline error: ${err.message}`);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Is Running On Port:${PORT}`);
});
