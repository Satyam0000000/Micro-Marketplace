// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import api from "../utils/api"

// fetching product details here 
const ProductDetails = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <p className="text-center">Loading...</p>
  if (!product) return <p className="text-center">Product not found</p>

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-cover rounded-md"
        />

        <h1 className="text-2xl font-bold mt-4">
          {product.title}
        </h1>

        <p className="text-muted-foreground mt-2">
          ₹ {product.price}
        </p>

        <p className="mt-4">
          {product.description}
        </p>

        <p className="text-sm text-muted-foreground mt-4">
          Product ID: {id}
        </p>
      </CardContent>
    </Card>
  )
}

export default ProductDetails