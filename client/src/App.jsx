import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Builder from "./pages/Builder";
import Assessments from "./pages/Assessments";
import LaunchPad from "./pages/LaunchPad";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/builder" element={<Builder />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/launch-pad" element={<LaunchPad />} />
            <Route path="/launch-pad/:id" element={<LaunchPad />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Navigate to="/builder" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
