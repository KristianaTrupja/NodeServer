
const express = require("express");

const bodyParser = require("body-parser");
const routesHandler = require("./routes/handler");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routesHandler);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

  //Usage in production

  // if(process.env.NODE_ENV === 'production'){
  //   //serve any static files
  //   app.use(express.static(path.join(__dirname,'client/build')));
  //   //handle react routing return all requests to React app
  //   app.get('*',function(req,res){
  //     res.sendFile(path.join(__dirname,'client/build',routesHandler))
  //   })

  // }
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
