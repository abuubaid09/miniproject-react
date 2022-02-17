import express from "express";

import { 
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";

const product = express.Router();

product.get('/products', getAllProducts);
product.get('/products/:id', getProductById);
product.post('/products', createProduct);
product.put('/products/:id', updateProduct);
product.delete('/products/:id', deleteProduct);

export default product;