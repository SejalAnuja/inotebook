// 'mongodb+srv://anujasejal:<db_password>@cluster0.xqaqpk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// '2Rzo69JN2Gz8cSmF'

const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://anujasejal:2Rzo69JN2Gz8cSmF@cluster0.xqaqpk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;