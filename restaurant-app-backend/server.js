import express from "express";
import mongoose from "mongoose";
import Messages from "./dbModels/dbFoodItems.js";
import cors from "cors";

// instance of express app
const app = express();
let port = process.env.PORT || 9000;

// middle ware
app.use(express.json());
app.use(cors());

// db user password:- Fiq6vV0LGQTrSCBv
// db config
const connection_url =
  "mongodb+srv://admin:Fiq6vV0LGQTrSCBv@cluster0.ozkgp.mongodb.net/restaurantdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/hello", (req, res) => {
  res.status(200).send("hello from the server this is home page");
});
app.get("/foodItems/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/foodItems/new", (req, res) => {
  const dbFoodItem = req.body;

  Messages.create(dbFoodItem, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log("Listening at localhost:", port);
});
