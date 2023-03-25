import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/user-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", { email, password });
      setUser(data);
      alert("login sucessful");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form
        className="flex flex-col w-64 h-screen gap-3 justify-center items-center mx-auto"
        onSubmit={handleLoginSubmit}
      >
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{" "}
          <Link to={"/register"} className={"underline text-black"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}
