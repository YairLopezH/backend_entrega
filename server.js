import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { handlebarsHelpers } from "./helpers/handlebars.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine({
  helpers: handlebarsHelpers,
  defaultLayout: "main",
  layoutsDir: "./views/layouts"
}));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const MONGO_URL = "mongodb://localhost:27017/codergames_entrega";

mongoose.connect(MONGO_URL)
.then(() => {
  console.log("Conectado a MongoDB");

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Error conectando a MongoDB:", error);
});
