const handleDrinksMenu = require("./handlers/Drinks");
const express = require("express");
const server = express();
server.use(express.json());

const cors = require("cors");
server.use(cors());

require("dotenv").config();
const PORT = process.env.PORT;

//localhost:3008/
http: server.get("/", (req, res) => res.send("Hello World!"));

// http://localhost:3008/drinksMenu?a=Non_Alcoholic
server.get("/drinksMenu", handleDrinksMenu);

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// mongodb server
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://Abdalrhman:FvFxZGTABcce8tKQ@cluster0-shard-00-00.vl5kc.mongodb.net:27017,cluster0-shard-00-01.vl5kc.mongodb.net:27017,cluster0-shard-00-02.vl5kc.mongodb.net:27017/cocktails?ssl=true&replicaSet=atlas-nz8xav-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const cocktailsSchema = new mongoose.Schema({
  drink: String,
  img: String,
});

const Cocktails = mongoose.model("favorites", cocktailsSchema);

// http://localhost:3008/addToDrinksMenu
server.post("/addToDrinksMenu", handleAddToFavorite);

function handleAddToFavorite(req, res) {
  const { drink, img } = req.body;
  const newDrink = new Cocktails({
    drink: drink,
    img: img,
  });
  newDrink.save();
}

// http://localhost:3008/getFromDrinksMenu
server.get("/getFromDrinksMenu", handleGetFromFavorite);

function handleGetFromFavorite(req, res) {
  Cocktails.find({}, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
}

// http://localhost:3008/deleteFromDrinksMenu/:id
server.delete("/deleteFromDrinksMenu/:id", handleDeleteFromFavorite);

function handleDeleteFromFavorite(req, res) {
  const { id } = req.params;
  Cocktails.findOneAndDelete({ _id: id }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      Cocktails.find({}, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          res.send(data);
        }
      });
    }
  });
}
