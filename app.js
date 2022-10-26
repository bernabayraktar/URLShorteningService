const express = require("express");
const connectDb = require("./db");
require("dotenv/config");
 
const app = express();
 
// connect to database
connectDb();
 
app.use(express.json({ extended: false }));
 
// define routes
app.use("/", require("./routesUrl"));
 
// driver code
const port = 5000;
app.listen(port, () => {
  console.log(`Service endpoint http://localhost:5000`);
});