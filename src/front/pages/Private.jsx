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

            if (data.msg === "Token inválido" || data.msg === "Token expirado") {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setProfile(data);
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1>Zona Privada</h1>
            {profile ? (
                <p>Bienvenido: {profile.useremail}</p>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Private;
