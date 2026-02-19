import { createContext, useState, useContext } from "react"
import api from "../utils/api"

//all the interaction to backend for auth done from here

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user")
  return storedUser ? JSON.parse(storedUser) : null
})

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    })

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data))

    setUser(data)
  }

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    })

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data))

    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData)
  return data
}

  return (
    <AuthContext.Provider value={{ user, login, register, logout,createProduct }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}