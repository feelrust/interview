import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can login");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }
  return (
    <div>
      <form
        className="flex flex-col w-64 h-screen gap-3 justify-center items-center mx-auto"
        onSubmit={registerUser}
      >
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Aleready a Member?{" "}
          <Link to={"/login"} className={"underline text-black"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
