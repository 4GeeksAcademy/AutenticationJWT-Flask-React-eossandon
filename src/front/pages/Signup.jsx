import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const result = await register(email, password);
        if (result.error) {
            alert(result.error);
        } else {
            alert(result.msg);
            navigate("/login")
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                onSubmit={(e) => { e.preventDefault(); handleSignup(); }}
                className="border border-danger rounded p-5 bg-white shadow"
                style={{ minWidth: "380px" }}
            >
                <h1 className="text-center mb-4">Registrarse</h1>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button className="btn btn-danger w-100 mt-3" type="submit">
                    Registrarse
                </button>

                <p className="mt-3 mb-0 text-center">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-danger fw-bold text-decoration-none">
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </div>
    );
};
