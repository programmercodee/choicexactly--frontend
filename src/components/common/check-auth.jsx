import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Define routes
  const publicRoutes = ["/shop/home", "/products", "/product", "/auth/login", "/auth/register"];
  const isPublic = publicRoutes.some(route => path === route || path.startsWith(`${route}/`));

  const isAdminRoute = path.startsWith("/admin");
  const isUserRoute = path.startsWith("/shop");

  // Redirect root route
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} />;
  }

  // Not authenticated trying to access a protected route
  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/auth/login" />;
  }

  // Authenticated user trying to access login/register
  if (
    isAuthenticated &&
    (path.startsWith("/auth/login") || path.startsWith("/auth/register"))
  ) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} />;
  }

  // Normal user trying to access admin routes
  if (isAuthenticated && user?.role !== "admin" && isAdminRoute) {
    return <Navigate to="/unauth-page" />;
  }

  // Admin trying to access user routes
  if (isAuthenticated && user?.role === "admin" && isUserRoute) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
