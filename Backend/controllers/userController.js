import User from "../models/User.js"
import Product from "../models/Product.js"

//all the function of user-> fav managed here

export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const product = await Product.findById(req.params.productId)

    if(!product){
      return res.status(404).json({ message: "Product not found" })
    }
    // console.log("req.user:", req.user)
    // console.log("productId:", req.params.productId)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }
    if(!user.favorites){
      user.favorites = []
    }
    const alreadyFav = user.favorites.some(
      (id) => id.toString() === req.params.productId
    )

    if(alreadyFav){
      return res.status(400).json({ message: "Already in favorites" })
    }

    user.favorites.push(req.params.productId)
    await user.save()

    res.json({ message: "Added to favorites" })
  } catch (error) {
    console.error("Add favorite error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const product = await Product.findById(req.params.productId)

    if(!product){
      return res.status(404).json({ message: "Product not found" })
    }

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    const isFav = user.favorites.some(
      (id) => id.toString() === req.params.productId
    )

    if(!isFav){
      return res.status(400).json({ message: "Product not in favorites" })
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.productId
    )

    await user.save()

    res.json({ message: "Removed from favorites" })
  } catch (error) {
    console.error("Remove favorite error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites")
    res.json(user.favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}