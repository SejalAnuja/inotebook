// 'mongodb+srv://anujasejal:<db_password>@cluster0.xqaqpk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// '2Rzo69JN2Gz8cSmF'

const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;