require('dotenv').config()
const { MongoClient } = require("mongodb");
const cors=require('cors');
const express = require('express')
require('dotenv').config()
// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}));
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const database = client.db("zetabyte");
const collection = database.collection("quiz");
async function run() {
  try {
    
    // Get the database and collection on which to run the operation

    // Execute query
    const cursor = collection.find();
    const documents=[];
    // Print the document returned by findOne()
    for await (const doc of cursor) {
      console.log(doc);
      documents.push(doc);
    }
    return documents;
  } finally {
    //await client.close();
  }
}
app.get('/getDocuments', async (req, res) => {
  try {
    const documents = await run();
    res.json(documents); // Return documents as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({"err":"Internal Server Error"});
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`API server listening at port `,process.env.PORT);
});
// routes
