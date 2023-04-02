import { ReactNode, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet, Route, redirect } from "react-router-dom";

export default function PrivateRoutes() {
  const { getAccessToken } = useContext(AuthContext);
  return (
    getAccessToken() ? <Outlet /> : <Navigate to="/login" />
  );
}
