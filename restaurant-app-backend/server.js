import express from "express";
import mongoose from "mongoose";
import foodItems from "./dbModels/dbFoodItems.js";
import cors from "cors";
import Users from "./dbModels/dbUsers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth as verify } from "./verifyToken.js";
import Pusher from "pusher";
import dotenv from "dotenv";
import Orders from './dbModels/Orders.js'
dotenv.config();

const pusher = new Pusher({
  appId: "1087617",
  key: "8d011ba7c4c398cfc83f",
  secret: "2bf7a6a2d6001ee30612",
  cluster: "eu",
  usetls: true,
});

// instance of express app
const app = express();
let port = process.env.PORT || 9000;

// middle wares
app.use(express.json());
app.use(cors());

// db user password:- Fiq6vV0LGQTrSCBv
// db config
const connection_url =
  "mongodb+srv://admin:Fiq6vV0LGQTrSCBv@cluster0.ozkgp.mongodb.net/restaurantdb?retryWrites=true&w=majority";

// connecting the db
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("db connected");

  const changeStream = mongoose.connection.collection("fooditems").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const itemDetails = change.fullDocument;
      pusher.trigger("fooditems", "insert", {
        name: itemDetails.name,
        imageUrl: itemDetails.imageUrl,
        price: itemDetails.price,
        isVeg: itemDetails.isVeg,
      });
    } else {
      console.log("unknow trigger man 😡😡😡 what the hell you are doing.....");
    }
  });
});

// routes
app.get("/", (req, res) => {
  res.status(200).send("hello from the server this is home page");
});
app.get("/foodItems/sync", (req, res) => {
  foodItems.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/foodItems/new", (req, res) => {
  const dbFoodItem = req.body;

  foodItems.create(dbFoodItem, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/users/new", async (req, res) => {
  const dbUser = req.body;

  // check if email is already assined with another user
  const EmailExists = await Users.findOne({ email: req.body.email });

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  if (EmailExists) return res.status(401).json({"message": "Email Already Exists"});

  // create a new user
  Users.create(dbUser, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/login", async (req, res) => {
  // check if the user exists using the email
  const user = await Users.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  // check if password is correct
  const ValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!ValidPass)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  // create a json web token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ message: token });
});

// getting the users list
app.get("/users/sync", (req, res) => {
  Users.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// getting users orders 
app.get("/user/orders/sync", verify, async (req, res) => {
  let decoded_data = jwt.decode(req.header("auth-token"));
  const theUserOrders = await Orders.find({user_id: decoded_data._id})
  res.status(202).json(theUserOrders)
});

app.post('/user/orders/new',verify, async(req, res) => {
  const dbOrder = req.body
  let decoded_data = await jwt.decode(req.header("auth-token"));
  dbOrder["user_id"]= decoded_data._id
  // placing a new order 
  Orders.create(dbOrder, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})



// route for verify user
app.get("/user/verify", verify, async (req, res) => {
  let decoded_data = jwt.decode(req.header("auth-token"));
  const theUser = await Users.findById(decoded_data._id);
  res.status(200).json({
    verified: true,
    user: { name: theUser.name, _id: theUser._id },
  });
});

// listen
app.listen(port, () => {
  console.log("Listening at localhost:", port);
});
