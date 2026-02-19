import express from "express"
import { addFavorite, removeFavorite, getFavorites } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/favorites/:productId',protect,addFavorite)

router.delete('/favorites/:productId',protect,removeFavorite)

router.get("/favorites", protect, getFavorites)

export default router
