import mongoose from "mongoose";
import songSchema from "@/schemas/Song";
import toast from "react-hot-toast";

// Ensure MongoDB URI is defined
const mongoURI = "mongodb://localhost:27017/Spotify";

const connectToDatabase = async () => {
  if (!mongoose.connection.readyState) {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Error connecting to database");
    }
  }
};

const getSongs = async () => {
  let documents = [];
  try {
    await connectToDatabase();

    // Use mongoose.models.Song instead of mongoose.model.Song
    const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
    documents = await Song.find({}).lean();
  } catch (error) {
    console.error("Retrieval error occurred:", error);
    toast.error("Retrieval error occurred");
  }
  return documents;
};

export default getSongs;
