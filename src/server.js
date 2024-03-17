import e from "express";
import app from "./app.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const PORT = 3000;

const uri =
  "mongodb+srv://ayman:bimbimbambam@coursework2.blgxzry.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: false,
  },
});

const db = client.db("Sidro");
const userCollection = db.collection("users");
const postCollection = db.collection("homefeed");

/**
 * Handles POST requests to the "/login" endpoint.
 *
 * This asynchronous function attempts to log in a user. It first checks if a user with the provided username exists in the database.
 * If the user exists and the provided password matches the user's password, it sets the `username` session variable and responds with a 200 status code (OK).
 * If the user exists but the provided password does not match the user's password, it responds with a 401 status code (Unauthorized).
 * If the user does not exist, it responds with a 400 status code (Bad Request).
 * If there is an error during the operation, it responds with a 500 status code (Internal Server Error).
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The HTTP request body.
 * @param {string} req.body.username - The username provided by the client.
 * @param {string} req.body.password - The password provided by the client.
 *
 * @param {Object} res - The Express response object.
 */
app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const user = await userCollection.findOne({ name: username });

    if (user) {
      if (user.password === password) {
        req.session.username = username;
        res.status(200).json({ message: "User successfully logged in." });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(400).json({ message: "User does not exist." });
    }
  } catch (error) {
    res.status(500).end();
  }
});

/**
 * Handles POST requests to the "/register" endpoint.
 *
 * This asynchronous function attempts to register a new user. It first checks if a user with the provided username already exists in the database.
 * If the user already exists, it responds with a 409 status code (Conflict).
 * If the user does not exist, it inserts a new document into the `userCollection` with the provided username and password, sets the `username` session variable, and responds with a 201 status code (Created).
 * If there is an error during the operation, it logs the error and responds with a 500 status code (Internal Server Error).
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The HTTP request body.
 * @param {string} req.body.username - The username provided by the client.
 * @param {string} req.body.password - The password provided by the client.
 *
 * @param {Object} res - The Express response object.
 */
app.post("/register", async (req, res) => {
  try {
    const reqData = req.body;

    const existingUser = await userCollection.findOne({ name: reqData.username });

    if (existingUser) {
      res.status(409).json({ message: "Username already exists." });
    } else {
      await userCollection.insertOne({ name: reqData.username, password: reqData.password });
      req.session.username = reqData.username;
      res.status(201).json({ message: "User successfully created." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).end();
  }
});

/**
 * POST /logout
 * This endpoint handles user logout.
 * It destroys the user's session.
 * If an error occurs during the session destruction, it responds with a 500 status code.
 * Otherwise, it responds with a 200 status code and a success message.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      // If there's an error, respond with a 500 status code
      res.status(500).end();
    }
    // If the session is successfully destroyed, respond with a 200 status code and a success message
    res.status(200).json({ message: "User successfully logged out." });
  });
});
/**
 * POST /share-post
 * This endpoint handles sharing a new post.
 * It adds the username from the session to the request data and inserts it into the post collection.
 * If the operation is successful, it responds with a 201 status code and a success message.
 * If an error occurs during the operation, it responds with a 500 status code and an error message.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/share-post", async (req, res) => {
  try {
    const reqData = req.body;

    reqData.username = req.session.username;

    await postCollection.insertOne(reqData);
    res.status(201).json({ message: "Post successfully shared." });
  } catch (error) {
    res.status(500).json({ message: "Failed to share post." });
  }
});

app.get("/homefeed", async (req, res) => {
  try {
    const posts = await postCollection.find().toArray();

    if (!posts) {
      res.status(404).json({ message: "No posts found." });
    } else {
      console.log("Posts:", posts)
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts." });
  }
});

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
async function connectDatabase() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

/**
 * Connects to the database and starts the server.
 *
 * The function `connectDatabase` is called to establish a connection to the database.
 * If the connection is successful, the server starts listening on `PORT`.
 * If there is an error, it is logged to the console.
 */
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });
