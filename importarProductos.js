import mongoose from "mongoose";
import fs from "fs";
import Product from "./models/product.model.js";

const MONGO_URL = "mongodb://localhost:27017/codergames_entrega";

const importarProductos = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a MongoDB");

    const data = await fs.promises.readFile('./data/products.json', 'utf-8');
    const productos = JSON.parse(data);

    
    await Product.deleteMany();


    await Product.insertMany(productos);

    console.log("Productos importados correctamente");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error al importar productos:", error);
  }
};

importarProductos();
