const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

require("dotenv").config();
const PORT = process.env.PORT;

server.get("/", (req, res) => res.send("Hello World!"));

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
