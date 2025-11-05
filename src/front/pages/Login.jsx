import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../api";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const result = await login(email, password);

        if (result.token) {
            localStorage.setItem("token", result.token);
            alert("Login exitoso!");
            navigate("/private")
        } else {
            alert(result.msg);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="border border-danger rounded p-5 bg-white shadow" style={{ minWidth: "380px" }}>
                <h1 className="text-center mb-4">Iniciar Sesión</h1>

                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // <-- CAPTURANDO EL DATO
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // <-- CAPTURANDO EL DATO
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-danger w-100 mt-3" onClick={handleLogin}>
                        Iniciar sesión
                    </button>

                    <p className="mt-3 mb-0">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/" className="text-danger fw-bold text-decoration-none">
                            ¡Regístrate!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
