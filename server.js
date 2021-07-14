const handleDrinksMenu = require("./handlers/Drinks")
const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

require("dotenv").config();
const PORT = process.env.PORT;

http://localhost:3007/
server.get("/", (req, res) => res.send("Hello World!"));

// http://localhost:3007/drinksMenu?a=Non_Alcoholic
server.get("/drinksMenu",handleDrinksMenu)

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
