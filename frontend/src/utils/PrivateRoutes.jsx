import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";


const PrivateRoutes = ({ children }) => { // Check if user is logged in
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    

    return (user ? children : <Navigate to = "/login" />);
};


export default PrivateRoutes;
