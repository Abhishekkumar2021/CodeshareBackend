//loading environment variables into process.env
require("dotenv").config();
const cors = require('cors')

//requiring
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const privateRoutes = require("./routes/private");
const errorHandler = require("./middlewares/error")

//express app
const app = express();

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/posts", postRoutes);
app.use("/api/user", authRoutes);
app.use("/api/private",privateRoutes);

app.use(errorHandler)


const port = process.env.PORT || 3001
//connect to database
mongoose
  .connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    //listen for requests only after we have connected to database
    app.listen(port, () => {
      console.log("Connected to db & Running on PORT " + port);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
  
//routes
app.get('/',(req,res)=>{
  res.json({message:"Routes starts at /api/posts/"});
})


