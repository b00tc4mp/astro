import 'dotenv/config.js';
import mongoose from 'mongoose';

export default async function mongoConnect() {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("DB connected");
   } catch (error) {
      console.log("Error connection Mongo Atlas", error);
   };
};
