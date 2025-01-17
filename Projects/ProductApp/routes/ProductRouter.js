import express from "express";
import {
  addProduct,
  softDeleteProduct,
  deleteProduct,
  searchByName,
  getProductById,
  getNonDeletedProducts,
  getProductsWithUsers,
  getMaxPrice,
  getTopExpensiveProducts,
} from "../controller/ProductController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.patch("/soft-delete/:id", softDeleteProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/searchByName", searchByName);
router.get("/getById/:id", getProductById);
router.get("/nonDeletedProducts", getNonDeletedProducts);
router.get("/products-with-users", getProductsWithUsers);
router.get("/max-price", getMaxPrice);
router.get("/top-expensive", getTopExpensiveProducts);

export default router;
