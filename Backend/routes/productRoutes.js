import express from "express"
import {getProduct,getProductById, createProduct, updateProduct, deleteProduct,getMyProducts} from "../controllers/productController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
.get(getProduct)
.post(protect, createProduct)

router.get("/my", protect, getMyProducts)

router.route("/:id")
.get(getProductById)
.put(protect,updateProduct)
.delete(protect,deleteProduct)

export default router