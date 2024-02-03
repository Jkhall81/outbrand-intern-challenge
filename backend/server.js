const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../frontend/outbrand-e10a3-firebase-adminsdk-5tdmz-bcf2b08ce0.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://outbrand-e10a3-default-rtdb.firebaseio.com",
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Define your API routes here

// User Registration
app.post("/api/user/register", (req, res) => {
  // email, fullName, password
  const data = req.body;
  const usersRef = admin.database().ref("users");
  const userData = {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
  };

  // pushing the data so i don't overwrite existing data
  const newUsersRef = usersRef.push();
  newUsersRef
    .set(userData)
    .then(() => {
      console.log("Data saved successfully");
      res
        .status(200)
        .json({ message: "User registered successfully", userData });
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error registering user", error });
    });
});

// User Login
app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  res.json({ message: "User logged in successfully", user: { email } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
