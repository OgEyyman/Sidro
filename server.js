import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "CST2120_CW2",
    cookie: { maxAge: 36288000 },
    resave: false,
    saveUninitialized: false,
  })
);

const uri =
  "mongodb+srv://ayman:bimbimbambam@coursework2.blgxzry.mongodb.net/?retryWrites=true&w=majority";

app.get("/M00952409/user-data", async (req, res) => {
  try {
    const db = client.db("Sidro");
    const collection = db.collection("users");
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data from the database." });
  }
});

app.post("/M00952409/user-data", async (req, res) => {
  const user = {
    name: req.body.name,
    studentID: req.body.studentID,
    email: req.body.email,
  };
  try {
    const document = await client.db("Sidro").collection("users").insertOne(user);
    if (document.insertedId) {
      res.status(201).json(document);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * Establishes a connection to the mongoose database.
 * @async
 * @function connection_to_db
 * @throws {Error} If there is an error connecting to the database.
 */
async function connection_to_db() {
  try {
    await mongoose.connect(uri);

    bootServer();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

/**
 * Boots up the server and starts listening on the specified port.
 */
function bootServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

connection_to_db();
