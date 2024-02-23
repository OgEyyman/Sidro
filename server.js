import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());

const uri =
  "mongodb+srv://ayman:bimbimbambam@coursework2.blgxzry.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

app.get("/M00952409/user-data", async (req, res) => {
  try {
    const db = client.db('Sidro');
    const collection = db.collection('users');
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data from the database.' });
  }
});

app.post("/M00952409/user-data", async (req, res) => {
  const user = {
    name: req.body.name,
    studentID: req.body.studentID,
    email: req.body.email
  };
  try {
    const document = await client.db('Sidro').collection('users').insertOne(user);
    if (document.insertedId) {
      res.status(201).json(document);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * Runs the application.
 * @returns {Promise<void>} A promise that resolves when the application finishes running.
 */
async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

run();