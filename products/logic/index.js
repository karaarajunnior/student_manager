import express from "express";
import products from "../products/data.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.port || 3000;

const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
	const newproduct = products.map((product) => {
		const { price, name, type } = product;
		return { price, name, type };
	});
	res.json(newproduct);
});

app.get("/products/:id", (req, res) => {
	const ID = req.params.id;
	const single_product = products.find((product) => product.id === Number(ID));
	res.json(single_product);
});

app.get("/product/query", (req, res) => {
	const { search, limit } = req.query;
	let sortedproducts = [...products];
	if (search) {
		sortedroducts = sortedproducts.filter((product) => {
			return product.name.startsWith(search);
		});

		// res.send(sortedproducts);
	}
	if (limit) {
		sortedproducts = sortedproducts.slice(0, Number(limit));
	}
	if (sortedproducts.length < 1) {
		return res.json({ success: true, data: [] });
	}
	res.send(sortedproducts);
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
