import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { reloadSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        await loginApi(email, password);
        await reloadSession();

        // without cookie
        // const res = await loginApi(email, password);
        // localStorage.setItem("token", res.data.data.token);
        // await reloadSession();

        navigate("/");   
    } catch (err) {
        setError("Invalid credentials");
    }
    };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
