import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Wait for Firebase to restore the session before deciding to redirect.
    if (loading) return null;

    if (!currentUser) {
        return <Navigate to="/lms/login" replace />;
    }

    return children;
}
