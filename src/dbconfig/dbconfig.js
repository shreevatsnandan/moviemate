import mongoose from "mongoose";

const connectionDatabase = async () =>{
  try 
  {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    console.log("connected")

  }
  catch(err)
  {
    console.log(err)
  }
}

export default connectionDatabase;