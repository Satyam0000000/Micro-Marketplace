import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

//simple login
const Login = () => {
  const navigate = useNavigate()
  //using Authcontext to save token in localstorage
  const { login } = useAuth() 

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      alert("Invalid credentials",console.log(error))
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full">Login</Button>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login