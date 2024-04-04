import mongoose from "mongoose";

const connectMongo = async () => {
  // mongoose.connect(process.env.MONGO_URI);
  // console.log("Connected to mongoDB.");
  try {
    //console.log('process.env.NEXT_PUBLIC_MONGO_URI -->',process.env.NEXT_PUBLIC_MONGO_URI);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

export default connectMongo;
