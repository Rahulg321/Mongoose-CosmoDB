// getting-started.js
import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

main().catch((err) =>
  console.error("Could not connect to mongoose", err, err.message)
);

async function main() {
  await mongoose.connect(
    "mongodb://" +
      process.env.COSMOSDB_HOST +
      ":" +
      process.env.COSMOSDB_PORT +
      "/" +
      process.env.COSMOSDB_DBNAME +
      "?ssl=true&",
    {
      auth: {
        username: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD,
      },
      retryWrites: false,
    }
  );

  console.log("connection to cosmo db successful");

  const kittySchema = new mongoose.Schema({
    name: String,
  });
  const Kitten = mongoose.model("Kitten", kittySchema);
  const silence = new Kitten({ name: "Silence" });
  console.log(silence.name); // 'Silence'
  await silence.save();
}
