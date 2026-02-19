import { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"

//all the interaction to backend for Product CRUD done from here

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

 
  const fetchMyProducts = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/products/my")
      setProducts(data)
    } catch (error) {
      console.error("Fetch products failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async (searchTerm = search, pageNumber = page) => {
    try {
      setLoading(true)
      const { data } = await api.get(
        `/products?search=${searchTerm}&page=${pageNumber}`
      )
      setProducts(data.products)
      setPage(data.page)
      setPages(data.pages)
    } catch (error) {
      console.error("Fetch products failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchProducts = (value) => {
    setSearch(value)
    fetchProducts(value, 1)
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }
 
  const updateProduct = async (id, updatedData) => {
    try {
      const { data } = await api.put(`/products/${id}`, updatedData)
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      )
      return data
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  const addFavorite = async (id) => {
    try {
      await api.post(`/users/favorites/${id}`)
      await fetchFavorites()
    } catch (error) {
      console.error("Add favorite failed:", error)
      throw error
    }
  }

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/users/favorites/${id}`)
      await fetchFavorites()
    } catch (error) {
      console.error("Remove favorite failed:", error)
      throw error
    }
  }

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get("/users/favorites")
      setFavorites(data)
    } catch (error) {
      console.error("Fetch favorites failed:", error)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const isFavorite = (productId) => {
    return favorites.some(
      (fav) => fav._id === productId || fav.toString() === productId
    )
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        favorites,
        loading,
        fetchMyProducts,
        deleteProduct,
        updateProduct,
        addFavorite,
        removeFavorite,
        fetchFavorites,
        search,
        page,
        pages,
        fetchProducts,
        searchProducts,
        setPage,
        isFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}