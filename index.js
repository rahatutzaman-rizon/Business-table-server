const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://rizon:9sIzBz6uh5bY2sBx@ac-pobbpqj-shard-00-00.w583tzt.mongodb.net:27017,ac-pobbpqj-shard-00-01.w583tzt.mongodb.net:27017,ac-pobbpqj-shard-00-02.w583tzt.mongodb.net:27017/?ssl=true&replicaSet=atlas-tj08ys-shard-0&authSource=admin&retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskCollection = client.db("jobTask").collection("table");

    app.post("/table", async (req, res) => {
      const taskData = req?.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    })

    app.get("/table", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    })

    
    

  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("data table ")
})

app.listen(port, () => {
  console.log(`Port number ${port}`);
})