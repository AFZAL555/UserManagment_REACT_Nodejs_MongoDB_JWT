import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import {useEffect} from 'react'
import {useNavigate } from "react-router-dom";



const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
		   navigate("/login");
        }else{

            navigate("/");
        }
	  }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                {error && <div className={styles.error_msg}>{error}</div>}
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                            autocomplete="off"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                            autocomplete="off"
                        />
                        
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;