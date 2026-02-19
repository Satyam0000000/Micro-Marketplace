import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import React from "react"
import { useAuth } from "../context/AuthContext"
import { useProduct } from "../context/ProductContext"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { deleteProduct, updateProduct, addFavorite, removeFavorite, favorites } = useProduct()
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: product.title,
    description: product.description,
    price: product.price,
  })

  const isFavorited = favorites.some(
    (fav) => fav._id === product._id
  )

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id)
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        await removeFavorite(product._id)
      } else {
        await addFavorite(product._id)
      }
    } catch (error) {
      console.error("Favorite failed:", error)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateProduct(product._id, formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  const handleCardClick = () => {
    navigate(`/product/${product._id}`)
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    handleDelete()
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    handleFavorite()
  }

  const handleSaveClick = (e) => {
    e.stopPropagation()
    handleUpdate()
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />

        {isEditing ? (
          <div className="mt-3 flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              onClick={(e) => e.stopPropagation()}
            />
            <input
              className="border p-2 rounded"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              onClick={(e) => e.stopPropagation()}
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mt-3">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500">
              {product.description}
            </p>
            <p className="text-muted-foreground">
              ₹ {product.price}
            </p>
          </>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {user && (
          <>
            <div className="flex gap-2 w-full">
              {product.user === user._id && (
                <>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                className={`flex-1 ${isFavorited ? "bg-pink-500 text-white hover:bg-pink-600 border-pink-500" : ""}`}
                onClick={handleFavoriteClick}
              >
                {isFavorited ? "💖" : "🤍"}
              </Button>
            </div>

            {isEditing && product.user === user._id && (
              <Button
                className="w-full mt-2"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard