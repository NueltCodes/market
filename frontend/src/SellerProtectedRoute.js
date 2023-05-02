import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isAuthenticatedSeller, seller, children }) => {
  if (!isAuthenticatedSeller) {
    return <Navigate to={`/`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;
