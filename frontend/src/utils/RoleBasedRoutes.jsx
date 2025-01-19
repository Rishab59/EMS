import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";


const RoleBasedRoutes = ({ children, requiredRole }) => { // Check if user has access to a particular component
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!requiredRole.includes(user.role)) {
        <Navigate to = "/unauthorized" />
    }
    

    return (user ? children : <Navigate to = "/login" />);
};


export default RoleBasedRoutes;
