// src/pages/Home.jsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useProduct } from "../context/ProductContext"

const Home = () => {
  const { products, loading, fetchProducts, searchProducts, fetchFavorites } = useProduct()
  const [input, setInput] = useState("")

  //on relaod fetch all the products
  useEffect(() => {
    fetchProducts()
    fetchFavorites()
  }, [])

  return (
    <div>
      <div className="flex gap-4 mb-6 items-center">
        <div className="relative w-full">
          <Input
            placeholder="Search products"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pr-10"
          />

          {input && (
            <button
              type="button"
              onClick={() => {
                setInput("")
                searchProducts("")
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              ✕ 
            </button>
          )}
        </div>

        <Button onClick={() => searchProducts(input)}>
          Search
        </Button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home