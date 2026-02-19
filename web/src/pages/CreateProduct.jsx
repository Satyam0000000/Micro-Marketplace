import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

//react form to take product details
const CreateProduct = () => {
  const navigate = useNavigate()
  const { user, createProduct } = useAuth() //getting user present and creating product by AuthContext

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await createProduct({
        title,
        price,
        description,
        image,
      })

      navigate("/") 
    } catch (error) {
      alert(error.response?.data?.message || "Error creating product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Create Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Image URL</Label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                
              />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateProduct