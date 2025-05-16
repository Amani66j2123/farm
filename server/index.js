import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import FeedbackModel from "./Models/FeedbackModel.js";
import CustomerModel from "./Models/CustomerModel.js";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/PostsModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer"; // Import nodemailer
import crypto from "crypto"; // Import crypto
import moment from "moment"; // Import moment
import * as ENV from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//const con =
 // "mongodb+srv://admin:csse3101@farmcluster.ggyy1gr.mongodb.net/farmDb?retryWrites=true&w=majority&appName=farmCluster";
 const con =
 `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=farmCluster`;
mongoose
  .connect(con)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
  //Middleware 
const corsOptions = { 
  origin: ['http://localhost:3000', 'https://farm1-mijs.onrender.com'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, // Enable credentials (cookies, authorization headers, etc.) 
  }; 
  app.use(cors(corsOptions)); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //using destructuring
    //search the user
    const user = await UserModel.findOne({ email: email });

    //if not found
    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //if everything is ok, send the user and message
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST API-logout
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

const upload = multer({ storage: storage });

// Function to generate a verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationToken();

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      isVerified: false,
    });

    await user.save();
  app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check password strength
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    // Create the user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    await user.save();

    // Send verification email (implement your email sending logic here)

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false, // Ensure isAdmin defaults to false
      },
      msg: "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      error: "An error occurred during registration." 
    });
  }
});

// Start your server (example)
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


    
    


    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res.status(201).json({
      user: user,
      msg:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
});

// Route to verify the account
app.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // 1. Find the user with the matching verification token
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).send("Invalid verification token.");
    }

    // 2. Mark the account as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Remove the token
    await user.save();

    // 3. Redirect to a success page or login page
    res.redirect("http://localhost:3000/login"); // Replace with your actual frontend URL
  } catch (error) {
    console.error("Error verifying account:", error);
    res.status(500).send("Error verifying account");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "Please verify your email before logging in." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Login successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/manageUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const userToUpdate = await UserModel.findById(id);
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }

    userToUpdate.name = name;
    userToUpdate.email = email;
    if (password) {
      const passwordMatch = await bcrypt.compare(
        password,
        userToUpdate.password
      );
      if (!passwordMatch) {
        userToUpdate.password = await bcrypt.hash(password, 10);
      }
    }

    await userToUpdate.save();
    res.status(200).send("User updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({ msg: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email } = req.body;
    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });
    await post.save();
    res
      .status(201)
      .send({ post: post, msg: "Post added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.status(200).send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  try {
    const postToUpdate = await PostModel.findOne({ _id: postId });
    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }
    const userIndex = postToUpdate.likes.users.indexOf(userId);
    if (userIndex !== -1) {
      postToUpdate.likes.count -= 1;
      postToUpdate.likes.users.pull(userId);
    } else {
      postToUpdate.likes.count += 1;
      postToUpdate.likes.users.addToSet(userId);
    }
    await postToUpdate.save();
    res
      .status(200)
      .json({
        post: postToUpdate,
        msg: userIndex !== -1 ? "Post unliked." : "Post liked.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/dislikePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  try {
    const postToUpdate = await PostModel.findOne({ _id: postId });

    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }

    const userIndex = postToUpdate.dislikes.users.indexOf(userId);

    if (userIndex !== -1) {
      postToUpdate.dislikes.count -= 1;
      postToUpdate.dislikes.users.pull(userId);
    } else {
      postToUpdate.dislikes.count += 1;
      postToUpdate.dislikes.users.addToSet(userId);
    }
    await postToUpdate.save();
    res
      .status(200)
      .json({
        post: postToUpdate,
        msg: userIndex !== -1 ? "Dislike removed." : "Post disliked.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put('/updateUserProfile/:email', upload.single('profilePic'), async (req, res) => {
  const oldEmail = req.params.email;
  const { name, newEmail, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: oldEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (newEmail) user.email = newEmail;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (req.file) {
      user.profilePic = req.file.filename;
    }

    const updatedUser = await user.save();

    // Return safe user data
    const sanitizedUser = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    };

    res.status(200).json({ user: sanitizedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during update" });
  }
});  

app.post("/addf", async (req, res) => {
  const {
    fullName,
    phoneNo,
    email,
    date,
    opinionFarm,
    opinionServices,
    ratingClean,
    ratingElectrical,
    rentAgain,
    details,
  } = req.body;
  try {
    const momentDate = moment(date, "YYYY-MM-DD");
    if (!momentDate.isValid()) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const formattedDate = momentDate.format("YYYY-MM-DD");

    // 🛑 Prevent duplicate feedback on the same date
    const existingFeedback = await FeedbackModel.findOne({ date: formattedDate });
    if (existingFeedback) {
      return res
        .status(409)
        .json({ error: "Feedback already submitted for this date." });
    }

    const Feedback = new FeedbackModel({
      fullName,
      phoneNo,
      email,
      date: formattedDate,
      opinionFarm,
      opinionServices,
      ratingClean,
      ratingElectrical,
      rentAgain,
      details,
    });

    await Feedback.save();
    res.status(201).send("Feedback submit successfully.");
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).send("Error adding feedback");
  }
});

app.get("/manage", async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find({});
    const count = await FeedbackModel.countDocuments({});
    res.status(200).send({ feedbacks, count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server Error");
  }
});
app.get("/getregiser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await FeedbackModel.findById(id);
    res.status(200).send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/getf/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await FeedbackModel.findById(id);
    res.status(200).send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.put("/updatef/:id", async (req, res) => {
  const id = req.params.id;
  const {
    fullName,
    phoneNo,
    email,
    date,
    opinionFarm,
    opinionServices,
    ratingClean,
    ratingElectrical,
    rentAgain,
    details,
  } = req.body;
  try {
    if (!fullName) {
      return res.status(400).send("fullName is required");
    }

    const docUpdate = await FeedbackModel.findOne({ _id: id });
    if (!docUpdate) {
      return res.status(404).send("Document not found!");
    }

    docUpdate.fullName = fullName;
    docUpdate.phoneNo = phoneNo;
    docUpdate.email = email;
    docUpdate.date = date;
    docUpdate.opinionFarm = opinionFarm;
    docUpdate.opinionServices = opinionServices;
    docUpdate.ratingClean = ratingClean;
    docUpdate.ratingElectrical = ratingElectrical;
    docUpdate.rentAgain = rentAgain;
    docUpdate.details = details;
    await docUpdate.save();
    res.status(200).send("Feedback Updated Updated!");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});
app.delete("/deletef/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteFeedback = await FeedbackModel.findByIdAndDelete(id).exec();
    if (!deleteFeedback) {
      return res.status(404).send({ error: "feedback not found" });
    }
    const count = await FeedbackModel.countDocuments({});
    res.status(200).send({ msg: "Record Deleted!", count });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});
{/*
app.post("/addc", async (req, res) => {
  const {
    fullName,
    civilNo,
    phoneNo,
    email,
    day,
    date, // Expecting YYYY-MM-DD format
    time,
    customerType,
    numAdults,
    numChildren,
    celebrationType,
    payment,
    details,
    totalPrice,
    result,
  } = req.body;

  console.log("Backend: Received Date (addc):", date);

  try {
    // Check if the selected date and time are already booked
    const momentDate = moment(date, "YYYY-MM-DD"); // Parse the date
    if (!momentDate.isValid()) {
      console.error("Backend: Invalid date format received in /addc.");
      return res.status(400).json({ error: "Invalid date format received." });
    }

    const formattedDateForQuery = momentDate.format("YYYY-MM-DD"); // Format for query

    const existingRental = await CustomerModel.findOne({
      date: formattedDateForQuery,
      time: time,
    });

    if (existingRental) {
      return res
        .status(400)
        .json({ error: "This date and time are already booked." });
    }

    const customer = new CustomerModel({
      fullName,
      civilNo,
      phoneNo,
      email,
      day,
      date: formattedDateForQuery, // Store the formatted date
      time,
      customerType,
      numAdults,
      numChildren,
      celebrationType,
      payment,
      details,
      totalPrice,
      result,
    });
    await customer.save();
    res.status(201).send("Record Succesfully added");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Adding record");
  }
});*/}
//update reservation
app.put('/updateC/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    // Update the logic using MongoDb 
    const result = await CustomerModel.findByIdAndUpdate(id, updatedData, { new: true });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/manageC", async (req, res) => {
  try {
    const customers = await CustomerModel.find({});
    const count = await CustomerModel.countDocuments({});
    res.status(200).send({ customers, count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server Error");
  }
});

app.get("/getCustomer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await CustomerModel.findById(id);
    res.status(200).send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/checkAvailability", async (req, res) => {
  const { date, time } = req.body;
  console.log("Backend: Received Date (checkAvailability):", date);

  try {
    // Use moment to parse the date
    const momentDate = moment(date, "YYYY-MM-DD"); // Specify the format
    if (!momentDate.isValid()) {
      console.error("Backend: Invalid date format received.");
      return res
        .status(400)
        .json({ error: "Invalid date format received." });
    }

    // Format the date for the database query (if needed)
    const formattedDateForQuery = momentDate.format("YYYY-MM-DD");

    const existingRental = await CustomerModel.findOne({
      date: formattedDateForQuery,
      time: time,
    });

    if (existingRental) {
      console.log("Backend: Date and time are already booked.");
      return res.json({ isAvailable: false });
    }

    console.log("Backend: Date and time are available.");
    return res.json({ isAvailable: true });
  } catch (error) {
    console.error("Backend: Error checking availability:", error);
    res.status(500).json({ error: "Failed to check availability" });
  }
});app.post("/addc", async (req, res) => {
  const {
    fullName,
    civilNo,
    phoneNo,
    email,
    day,
    date, // format: YYYY-MM-DD
    time,
    customerType,
    numAdults,
    numChildren,
    celebrationType,
    payment,
    details,
    totalPrice,
    result,
  } = req.body;

  try {
    const momentDate = moment(date, "YYYY-MM-DD");
    if (!momentDate.isValid()) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const formattedDate = momentDate.format("YYYY-MM-DD");

    const existingRental = await CustomerModel.findOne({
      date: formattedDate,
      time: time,
    });

    if (existingRental) {
      return res
        .status(409)
        .json({ error: "This time slot is already booked." });
    }

    const customer = new CustomerModel({
      fullName,
      civilNo,
      phoneNo,
      email,
      day,
      date: formattedDate,
      time,
      customerType,
      numAdults,
      numChildren,
      celebrationType,
      payment,
      details,
      totalPrice,
      result,
    });

    await customer.save();

    res.status(201).json({
      msg: "Booking successfully saved!",
      customer,
    });
  } catch (error) {
    console.error("🚨 Error in /addc:", error);

    // If duplicate key error due to index
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ error: "This time slot is already booked. (DB constraint)" });
    }

    res.status(500).json({
      error: "An unexpected error occurred while saving booking.",
    });
  }
});
app.delete('/deleteC/:id', async (req, res) => {
  try {
    const deletedCR = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!deletedCR) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    const count = await CustomerModel.countDocuments();
    res.json({ msg: '✅ Customer reservation deleted successfully', count });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ msg: '❌ Server error during delete' });
  }
});
app.get("/bookings/:email", async (req, res) => {
  try {
    const bookings = await CustomerModel.find({ email: req.params.email });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Server error while fetching bookings.");
  }
});

const port = ENV.PORT || 3001; 
app.listen(port, () => { 
console.log(`You are connected at port: ${port}`); 
}); 