import app from "./app.js";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

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

/**
 * GET /homefeed
 * This endpoint is responsible for fetching all posts from the database.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/homefeed'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If there are no posts in the database, it returns a 404 status code with a message "No posts found."
 * - If there are posts, it returns a 200 status code along with the posts in JSON format.
 * - If there's an error while fetching the posts, it returns a 500 status code with a message "Failed to fetch posts."
 */
app.get("/homefeed", async (req, res) => {
  try {
    const posts = await postCollection.find().toArray();

    if (!posts) {
      res.status(404).json({ message: "No posts found." });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts." });
  }
});

/**
 * POST /add-comment
 * This endpoint is responsible for adding a comment to a post in the database.
 * It uses the Express.js framework to define a route handler for the POST HTTP method at the path '/add-comment'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The body of the request should contain 'postId', 'commentText', and 'commentDate'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the post is found, it adds the comment to the post's 'comment_list' and returns a 200 status code with a success message.
 * - If the post is not found, it returns a 404 status code with a message "Post not found."
 * - If there's an error while adding the comment, it returns a 500 status code with a message "Failed to add comment."
 */
app.post("/add-comment", async (req, res) => {
  try {
    const reqData = req.body;

    const post = await postCollection.findOne({
      _id: ObjectId.createFromHexString(reqData.postId),
    });

    if (post) {
      post.comment_list.push({
        username: req.session.username,
        commentText: reqData.commentText,
        commentDate: reqData.commentDate,
      });

      await postCollection.updateOne(
        { _id: ObjectId.createFromHexString(reqData.postId) },
        { $set: { comment_list: post.comment_list } }
      );

      res
        .status(200)
        .json({ username: req.session.username, message: "Comment successfully added." });
    } else {
      res.status(404).json({ message: "Post not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment." });
  }
});

/**
 * GET /getProfile
 * This endpoint is responsible for checking if the requested profile belongs to the currently logged in user.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/getProfile'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The query of the request should contain 'username'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the 'username' query parameter matches the 'username' stored in the session, it returns a 200 status code with a JSON object { isSessionUser: true }.
 * - If the 'username' query parameter does not match the 'username' stored in the session, it returns a 200 status code with a JSON object { isSessionUser: false }.
 * - If there's an error while processing the request, it returns a 500 status code with a message "Failed to fetch user data."
 */
app.get("/getProfile", async (req, res) => {
  try {
    const username = req.query.username;
    const sessionUser = req.session.username;

    console.log("username", username);
    console.log("sessionUser", sessionUser);

    if (username === sessionUser) {
      res.status(200).json({ isSessionUser: true });
    } else {
      res.status(200).json({ isSessionUser: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user data." });
  }
});

/**
 * GET /myProfile
 * This endpoint is responsible for fetching the profile data of the currently logged in user.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/myProfile'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The session of the request should contain 'username'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the user is found, it returns a 200 status code with a JSON object containing the user's data (excluding the password) and all the posts made by the user.
 * - If the user is not found, it returns a 404 status code with a message "User not found."
 * - If there's an error while processing the request, it returns a 500 status code with a message "Failed to fetch user data."
 */
app.get("/myProfile", async (req, res) => {
  try {
    const username = req.session.username;

    const user = await userCollection.findOne({ name: username }, { projection: { password: 0 } });

    // Find all the post for the user
    const posts = await postCollection.find({ username: username }).toArray();

    if (user) {
      res.status(200).json({ userData: user, posts: posts });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user data." });
  }
});

/**
 * GET /getOtherProfile
 * This endpoint is responsible for fetching the profile data of a specified user.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/getOtherProfile'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The query of the request should contain 'username'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the user is found, it returns a 200 status code with a JSON object containing the user's data (excluding the password) and all the posts made by the user.
 * - If the user is not found, it returns a 404 status code with a message "User not found."
 * - If there's an error while processing the request, it returns a 500 status code with a message "Failed to fetch user data."
 */
app.get("/getOtherProfile", async (req, res) => {
  try {
    const username = req.query.username;

    const user = await userCollection.findOne({ name: username }, { projection: { password: 0 } });

    // Find all the post for the user
    const posts = await postCollection.find({ username: username }).toArray();

    if (user) {
      res.status(200).json({ userData: user, posts: posts });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user data." });
  }
});

/**
 * GET /search-users
 * This endpoint is responsible for searching users based on the provided query.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/search-users'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The query of the request should contain 'value'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If users are found, it returns a 200 status code with a JSON object containing the users' data and a success message.
 * - If no users are found, it returns a 404 status code with a message "No users found."
 * - If there's an error while processing the request, it returns a 500 status code with a message "Failed to fetch users."
 */
app.get("/search-users", async (req, res) => {
  try {
    const query = req.query.value;

    const users = await userCollection.find({ name: { $regex: query, $options: "i" } }).toArray();

    console.log(users);
    if (users != []) {
      res.status(200).json({ users: users, message: "users found" });
    } else {
      res.status(404).json({ message: "No users found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

/**
 * GET /search-posts
 * This endpoint is responsible for searching posts based on the game title.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/search-posts'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The query of the request should contain 'value'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If posts are found, it returns a 200 status code with a JSON object containing the found posts and a success message.
 * - If no posts are found, it returns a 404 status code with a message "No posts found."
 * - If there's an error while processing the request, it returns a 500 status code with a message "Failed to fetch posts."
 */
app.get("/search-posts", async (req, res) => {
  try {
    const query = req.query.value;

    const posts = await postCollection
      .find({ gameTitle: { $regex: query, $options: "i" } })
      .toArray();

    if (posts != []) {
      res.status(200).json({ posts: posts, message: "posts found" });
    } else {
      res.status(404).json({ message: "No posts found." });
    }
  } catch (error) {
    console.log(error);
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
