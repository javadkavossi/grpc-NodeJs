const { default: mongoose } = require("mongoose");

module.exports = mongoose
  .connect("mongodb://localhost:27017/grpc-nodejs")
  .then(() => {
    console.log("Connect To DB ");
  })
  .catch((err) => console.log(err.message));
