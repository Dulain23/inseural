import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { setAlert } from "../redux/alertSlice";
import { logoutSuccess } from "../redux/userSlice";

//Auth Middleware to check if users are authenticated
export default function AuthRoute() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRoles = async () => {
            console.log(user)
            // No user in Storage, stop API call
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                // Validate Access Token and Get User Role API
                const res = await fetch('/api/auth/' + user._id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if(data.success){
                    setUserType(data.roleDetails.name);
                } else {
                    // Display Authorization Errors
                    dispatch(setAlert({
                        status: true,
                        success: data.success,
                        message: data.message,
                    }));
                    // Clear invalid user details in storage
                    dispatch(logoutSuccess());
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUserRoles();
    }, [user]);

    if(loading) return <Loading style={'h-7 w-7 text-indigo-600 absolute inset-0 m-auto'}/>
    if (user) {
        if (userType === 'STUDENT') return <Navigate to="/student/home" />
    }
    return <Outlet />
}
