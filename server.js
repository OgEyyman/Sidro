import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.json());

const uri =
  "mongodb+srv://ayman:bimbimbambam@coursework2.blgxzry.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: false,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

run();

app.get("/M00952409", (req, res) => {});

app.post("/M00952409", async (req, res) => {
  try {
    const requestData = req.body; 
    const db = client.db('Sidro');
    const result = await db.collection('user').insertOne(requestData); 
    if (result.insertedId) {
        const insertedDocument = await db.collection('user').findOne({ _id: result.insertedId });
        res.status(201).json(insertedDocument);
    } else {
        throw new Error('No document was inserted.');
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
