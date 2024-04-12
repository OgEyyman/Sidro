import { app, webSocket } from "./app.js";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import axios from "axios";
import cheerio from "cheerio";

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
app.post("/M00952409/login", async (req, res) => {
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
app.post("/M00952409/register", async (req, res) => {
  try {
    const reqData = req.body;

    const existingUser = await findUserByUsername(reqData.username);

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
app.post("/M00952409/logout", (req, res) => {
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
 * GET /checkLoginStatus
 * This endpoint checks if the user is currently logged in.
 * It checks if the 'username' field exists in the user's session.
 * If it does, it responds with a 200 status code, indicating the user is logged in.
 * If it doesn't, it responds with a 401 status code, indicating the user is not authenticated.
 * If an error occurs during the operation, it responds with a 500 status code.
 *
 * @param {Object} req - Express request object. The session of the request should contain a 'username' field if the user is logged in.
 * @param {Object} res - Express response object
 */
app.get("/M00952409/checkLoginStatus", (req, res) => {
  try {
    if (req.session.username) {
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).end();
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
app.get("/M00952409/homefeed", async (req, res) => {
  try {
    // Retrieve posts only for users that the active user is following
    const activeUser = req.session.username;

    const users = await userCollection.findOne({ name: activeUser });

    let posts = await postCollection.find({ username: activeUser }).toArray();

    if (users.following) {
      const following = users.following;

      const userfeed = await postCollection.find({ username: { $in: following } }).toArray();

      posts = posts.concat(userfeed);

      if (!posts) {
        res.status(404).json({ message: "No posts found." });
      } else {
        res.status(200).json(posts);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts." });
  }
});

/**
 * GET /newsfeed
 * This endpoint is responsible for fetching news data from an external website.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/newsfeed'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the news data is successfully fetched, it returns a 200 status code along with the news data in JSON format.
 * - If there's an error while fetching the news data, it returns a 500 status code with a message "Failed to fetch news feed."
 * - If the fetched HTML is null or undefined, it returns a 400 status code with a message "Failed to fetch news feed."
 */
app.get("/M00952409/newsfeed", async (req, res) => {
  try {
    const websiteURL = "https://www.gameinformer.com/news";
    const html = await fetchHTML(websiteURL);

    if (html) {
      const newsData = scrapeNewsData(html);
      res.status(200).json(newsData);
    } else {
      res.status(400).json({ message: "Failed to fetch news feed." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news feed." });
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
app.post("/M00952409/add-comment", async (req, res) => {
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
app.get("/M00952409/getProfile", async (req, res) => {
  try {
    const username = req.query.username;
    const sessionUser = req.session.username;

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
app.get("/M00952409/myProfile", async (req, res) => {
  try {
    const username = req.session.username;

    const { user, posts } = await getUserAndPosts(username);

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
app.get("/M00952409/getOtherProfile", async (req, res) => {
  try {
    const username = req.query.username;

    const activeUser = req.session.username;

    const user = await userCollection.findOne({ name: username }, { projection: { password: 0 } });

    // Find all the post for the user
    const posts = await postCollection.find({ username: username }).toArray();

    // Check if activeUser is in the friend request list of username
    const friendRequest = await userCollection.findOne({
      name: username,
      friendRequests: activeUser,
    });

    let friendJSON = {};

    if (friendRequest) {
      friendJSON = { message: "Friend request" };
    } else {
      // Check if in the following array of activeUser contains username
      const following = await userCollection.findOne({ name: activeUser, following: username });
      if (following) {
        friendJSON = { message: "Following" };
      } else {
        friendJSON = { message: "none" };
      }
    }

    if (user) {
      res.status(200).json({ userData: user, posts: posts, friendJSON });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user data." });
  }
});

/**
 * GET /retrieve-friend-requests
 * This endpoint is responsible for fetching the friend requests of the currently logged in user.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/retrieve-friend-requests'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The session of the request should contain 'username'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the user is found and has friend requests, it returns a 200 status code with a JSON object containing the friend requests.
 * - If the user is found but has no friend requests, it returns a 404 status code with a message "No friend requests found."
 * - If there's an error while processing the request, it returns a 500 status code.
 */
app.get("/M00952409/retrieve-friend-requests", async (req, res) => {
  try {
    const username = req.session.username;

    const user = await userCollection.findOne({ name: username });

    if (user) {
      // Fetch the friend request array of user
      const friendRequests = user.friendRequests;

      if (friendRequests) {
        res.status(200).json({ friendRequests: friendRequests });
      } else {
        res.status(404).json({ message: "No friend requests found." });
      }
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).end();
  }
});

/**
 * GET /retrieve-friend-requests
 * This endpoint is responsible for fetching the friend requests of the currently logged in user.
 * It uses the Express.js framework to define a route handler for the GET HTTP method at the path '/retrieve-friend-requests'.
 *
 * @async
 * @function
 * @param {Object} req - Express 'request' object. The session of the request should contain 'username'.
 * @param {Object} res - Express 'response' object
 *
 * @returns {Object} JSON response
 * - If the user is found and has friend requests, it returns a 200 status code with a JSON object containing the friend requests.
 * - If the user is found but has no friend requests, it returns a 404 status code with a message "No friend requests found."
 * - If there's an error while processing the request, it returns a 500 status code.
 */
app.post("/M00952409/accept-friend-request", async (req, res) => {
  try {
    const username = req.session.username;
    const friendName = req.body.username;

    const result = await userCollection.updateOne(
      { name: friendName },
      {
        $push: { following: username },
      }
    );

    const result2 = await userCollection.updateOne(
      { name: username },
      {
        $pull: { friendRequests: friendName },
      }
    );

    if (result.modifiedCount === 1 && result2.modifiedCount === 1) {
      res.status(200).json({ message: "Friend request accepted." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).end();
  }
});

/**
 * POST /decline-friend-request
 * This endpoint handles declining a friend request from another user.
 * It first retrieves the username from the session and the friend's username from the request body.
 * Then, it updates the user's document to remove the friend's username from the friendRequests array.
 * If the update is successful, it responds with a 200 status code and a message indicating the friend request was declined.
 * If an error occurs during the operation, it logs the error and responds with a 500 status code.
 *
 * @param {Object} req - Express request object. The session of the request should contain a 'username' field with the name of the logged in user, and the body of the request should contain a 'username' field with the name of the user whose friend request is being declined.
 * @param {Object} res - Express response object
 */
app.post("/M00952409/decline-friend-request", async (req, res) => {
  try {
    const username = req.session.username;
    const friendName = req.body.username;

    // Update the user's document to remove the friendName from friendRequests array
    const result = await userCollection.updateOne(
      { name: username },
      {
        $pull: { friendRequests: friendName },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Friend request declined." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).end();
  }
});

/**
 * POST /addFriend
 * This endpoint handles sending a friend request from the active user to another user.
 * It first checks if the active user is already in the friend list of the user they clicked on.
 * If they are, it responds with a 400 status code and a message indicating they are already friends.
 * If they are not, it updates the userClicked's document in the userCollection to include the active user's name in their friendRequests array.
 * It then responds with a 200 status code and a message indicating the friend request was sent.
 * If an error occurs during the operation, it responds with a 500 status code.
 *
 * @param {Object} req - Express request object. The body of the request should contain a 'username' field with the name of the user to send a friend request to.
 * @param {Object} res - Express response object
 */
app.post("/M00952409/addFriend", async (req, res) => {
  try {
    const userClicked = req.body.username;

    const activeUser = req.session.username;

    // Check if activeUser is in friend list of userClicked
    const user = await userCollection.findOne({ name: userClicked, friendRequests: activeUser });

    if (user) {
      res.status(400).json({ message: "Already friends with the user." });
    } else {
      const result = await addFriendRequest(userClicked, activeUser);

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Friend request sent." });
      }
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).end();
  }
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
app.post("/M00952409/share-post", async (req, res) => {
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
app.get("/M00952409/search-users", async (req, res) => {
  try {
    const query = req.query.value;

    const users = await userCollection.find({ name: { $regex: query, $options: "i" } }).toArray();

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
app.get("/M00952409/search-posts", async (req, res) => {
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

webSocket.on("connection", (ws) => {
  console.log("Connected to webSocket");

  ws.on("message", async (message) => {
    const postID = JSON.parse(message).postId;

    const post = await postCollection.findOne({ _id: ObjectId.createFromHexString(postID) });
    let likes = post.likes;
    likes++;

    const result = await postCollection.updateOne(
      { _id: ObjectId.createFromHexString(postID) },
      { $set: { likes: likes } }
    );

    webSocket.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ postId: postID, likes: likes }));
      }
    });
  });
});

/**
 * Finds a user by their username.
 *
 * @param {string} username - The username to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the user object if found, or null if not found.
 */
async function findUserByUsername(username) {
  return await userCollection.findOne({ name: username });
}

/**
 * Retrieves a user and their posts from the database.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<{ user: Object, posts: Array<Object> }>} - A promise that resolves to an object containing the user and their posts.
 */
async function getUserAndPosts(username) {
  const user = await userCollection.findOne({ name: username }, { projection: { password: 0 } });
  const posts = await postCollection.find({ username: username }).toArray();
  return { user, posts };
}

/**
 * Adds a friend request from the active user to the clicked user.
 *
 * @param {string} userClicked - The name of the user who was clicked.
 * @param {string} activeUser - The name of the active user.
 * @returns {Promise} A promise that resolves to the result of the update operation.
 */
async function addFriendRequest(userClicked, activeUser) {
  return await userCollection.updateOne(
    { name: userClicked },
    { $push: { friendRequests: activeUser } }
  );
}

/**
 * Fetches the HTML content from the specified URL.
 * @param {string} url - The URL to fetch the HTML from.
 * @returns {Promise<string|null>} - A promise that resolves with the HTML content, or null if an error occurs.
 */
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    return null;
  }
}

/**
 * Scrapes news data from HTML and returns an array of news objects.
 *
 * @param {string} html - The HTML content to scrape data from.
 * @returns {Array} - An array of news objects containing title, link, and published date.
 */
function scrapeNewsData(html) {
  const $ = cheerio.load(html);
  const newsData = [];

  // Select the viewrows within the specified class and extract data from each
  $(".views-infinite-scroll-content-wrapper .views-row")
    .slice(0, 5)
    .each((index, element) => {
      const newsTitle = $(element).find(".page-title").find("a").text().trim();
      const newsLink = $(element).find(".page-title").find("a").attr("href");
      const newsPublished = $(element)
        .find(".node__submitted")
        .find(".field--name-created")
        .text()
        .trim();

      newsData.push({ title: newsTitle, link: newsLink, published: newsPublished });
    });

  return newsData;
}

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
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on("upgrade", (request, socket, head) => {
      webSocket.handleUpgrade(request, socket, head, (socket) => {
        webSocket.emit("connection", socket, request);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });

export { connectDatabase, findUserByUsername, getUserAndPosts, addFriendRequest };
