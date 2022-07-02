//loading environment variables into process.env
require("dotenv").config();
const cors = require('cors')

//requiring
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const routes = require("./routes/posts");

//express app
const app = express();

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req,res,next)=>{
//   console.log(req.method);
//   next();
// })


const port = process.env.PORT || 3000
//connect to database
mongoose
  .connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    //listen for requests only after we have connected to database
    app.listen(port, () => {
      // console.log("Connected to db & Running on PORT " + port);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
  
//routes
app.get('/',(req,res)=>{
  res.json({message:"Routes starts at /api/posts/"});
})
app.use("/api/posts", routes);

app.get('*',(req,res)=>{
  res.json({message:"No such route exist!"});
})

