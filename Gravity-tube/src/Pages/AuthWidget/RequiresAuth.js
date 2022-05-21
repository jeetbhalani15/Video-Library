import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/Auth-context';

const RequiresAuth = ({children}) => {
    const { authState } = useAuth();
    const location = useLocation();

    return authState.token ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequiresAuth