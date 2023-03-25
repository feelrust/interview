import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./context/user-context";
import ProtectedRoute from "./ProtectedRoute";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
