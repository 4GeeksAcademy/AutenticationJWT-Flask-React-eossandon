// src/pages/Private.jsx
import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            const data = await getProfile(token);

            if (!data) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            setProfile(data);
        };

        fetchProfile();
    }, [navigate]);


    return (
        <div className="container mt-5 d-flex justify-content-center align-content-center">
            <h1>Bienvenid@ a Zona Privada</h1>
        </div>
    );
};

export default Private;
