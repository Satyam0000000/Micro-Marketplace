import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">

        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Micro-Marketplace
        </h1>

        <div className="flex gap-4">

          {user && (
            <Button onClick={() => navigate("/create")}>
              Add Product
              </Button>
          )}

          {user ? (
            <Button
              variant="destructive"
              onClick={() => {
                logout()
                navigate("/login")
              }}
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar