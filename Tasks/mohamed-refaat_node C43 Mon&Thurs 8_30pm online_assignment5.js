const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, "users.json");

const readUsersFromFile = async () => {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const writeUsersToFile = async (users) => {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

app.post("/addUser", async (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = await readUsersFromFile();

  if (users.some((user) => user.email === email)) {
    return res.status(409).json({ message: "Email already exists." });
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  users.push({ id, name, age, email });
  await writeUsersToFile(users);

  res.status(201).json({ message: "User added successfully." });
});

//Task 1.2

app.patch("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  const users = await readUsersFromFile();

  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  if (
    email &&
    users.some((user, index) => user.email === email && index !== userIndex)
  ) {
    return res.status(409).json({ message: "Email already exists." });
  }

  if (name) users[userIndex].name = name;
  if (age) users[userIndex].age = age;
  if (email) users[userIndex].email = email;

  await writeUsersToFile(users);

  res.status(200).json({ message: "User updated successfully." });
});

//Task 1.3

app.delete(["/deleteUser/:id"], async (req, res) => {
  const id = req.params.id || req.body.id;

  const users = await readUsersFromFile();

  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User id not found." });
  }

  users.splice(userIndex, 1);
  await writeUsersToFile(users);

  res.status(200).json({ message: "User deleted successfully." });
});

//Task 1.4

app.get("/getUserByName", async (req, res) => {
  const { name } = req.query;

  const users = await readUsersFromFile();

  const user = users.find((user) => user.name === name);

  if (!user) {
    return res.status(404).json({ message: "User name not found." });
  }

  res.status(200).json(user);
});

//Task 1.5

app.get("/getUserById/:id", async (req, res) => {
  const { id } = req.params;

  const users = await readUsersFromFile();

  const user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).json({ message: "User id not found." });
  }

  res.status(200).json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Is Running On Port ${PORT}`);
});

//////////////////////////// Task 2 /////////////////////////////////
//Task 2.1
/* 
The Node.js Event Loop is a mechanism that enables non-blocking, asynchronous programming.
It allows Node.js to perform I/O operations, such as reading files or handling network requests,
without blocking the main thread, despite being single-threaded.
*/

//Task 2.2
/* 
It is an open-source, high-performance JavaScript and WebAssembly engine developed by Google, 
primarily used in the Chrome browser and Node.js runtime.
*/

//Task 2.3
/* 
The Node.js Thread Pool is part of the libuv library, 
which underpins Node.js and provides support for handling asynchronous operations.
While Node.js operates on a single-threaded event loop, 
certain tasks require background threads to handle operations that are computationally expensive or involve blocking I/O.

Setting the Thread Pool Size
The default size of the thread pool in Node.js is 4 threads
1- Use the UV_THREADPOOL_SIZE environment variable to configure the size.
2-Considerations:
The maximum size of the thread pool is 1024, but increasing it unnecessarily can lead to resource contention.
3-Runtime Check:
console.log('Thread Pool Size:', process.env.UV_THREADPOOL_SIZE || 4);
*/

//Task 2.4
/* 
The libuv library is a core part of Node.js that provides the platform's underlying infrastructure for handling asynchronous I/O operations.
It enables Node.js to perform non-blocking operations and powers the event-driven architecture that Node.js is known for.
*/

//Task 2.5
/*  Node.js handles asynchronous I/O operations using its event-driven, non-blocking architecture, 
which is built on the event loop and supported by the libuv library. 
This approach ensures that I/O-intensive tasks, such as file access or network requests,
do not block the main thread, enabling Node.js to remain highly responsive and scalable.

1-Initiating I/O Operations
2-Non-Blocking Execution
3-Event Loop and Callbacks
4-Promises and Async/Await
5-libuv Thread Pool
6-Scalability
*/
