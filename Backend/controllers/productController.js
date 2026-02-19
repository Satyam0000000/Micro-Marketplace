import Product from "../models/Product.js";


//all the function of Product managed here

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProduct = async (req,res) => {
    try {
        const search = req.query.search || ""
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const keyword = {
            title:{$regex: search, $options:"i"}
        }
        const count = await Product.countDocuments(keyword)
        const products = await Product.find(keyword)
        .limit(limit)
        .skip(limit * (page - 1))

        res.json({
            products,
            page,
            pages:Math.ceil(count/limit),
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message:"Product Not Found"})
        }
        res.json(product)
    } catch (error) {
        res.satus(500).json({message:error.message})
    }
}

export const createProduct = async (req,res) => {
    try {
        const {title, price, description, image} = req.body
        const product = await Product.create({ 
            user: req.user._id,
            title,price, description, image})
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }
        const {title, price, description, image} = req.body
        product.title = title || product.title
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(401).json({message:"Product not found"})
        }
        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }
        await product.deleteOne()
        res.json({message:"Product deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}