const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 2000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzz1qah.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataBase = client.db("TaskMenegment");
        const users = dataBase.collection("users");
        const tasks = dataBase.collection("tasks");

        //add new user
        app.put('/addUser', async (req, res) => {
            try {
                const filter = { email: req.body.email };
                const options = { upsert: true };
                const updateDoc = {
                    $set: req.body
                };
                const result = await users.updateOne(filter, updateDoc, options);
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        })

        //add new task
        app.post('/addTask', async (req, res) => {
            try {
                const result = await tasks.insertOne(req.body)
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        })

        //get my tasks
        app.get('/getTasks/:email', async (req, res) => {
            try {
                const result = await tasks.find({ user: req.params.email }).sort({ priority: 1 }).toArray();
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        })

        //update task
        app.put('/updateTask', async (req, res) => {
            try {
                const query = { _id: new ObjectId(req.body.id) };
                console.log(req.body.id)
                const updateDoc = {
                    $set: req.body
                };
                const result = await tasks.updateOne(query, updateDoc);
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        })

        //delete task
        app.delete('/deleteTasks/:id', async (req, res) => {
            try {
                const result = await tasks.deleteOne({ _id: new ObjectId(req.params.id) });
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send({ success: 'ok' })
})

app.listen(port, () => {
    console.log(`your server : http://localhost:${port}`)
})