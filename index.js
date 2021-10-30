
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.m7hfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
	try {
		await client.connect();
		const database = client.db('travels');
		const productCollection = database.collection('products');
		console.log('database connected successfully');

		// get products api 
		app.get('/products', async (req, res) => {
			const cursor = productCollection.find({});
			const products = await cursor.toArray();
			res.send(products);
		})

	}
	finally {
		// await client.close();
	}
}
run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('Meta Travels Server Is Running')
})

app.listen(port, () => {
	console.log('running sever on port', port);
})

