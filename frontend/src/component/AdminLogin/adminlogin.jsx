import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'



const AdminLogin = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    
	useEffect(() => {
		const token = localStorage.getItem("Admintoken");
		if (!token) {
		   navigate("/adminlogin8714");
        }else{

            navigate("/adminhome");
        }
	  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/adminauth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("Admintoken", res.data);
            navigate("/adminhome");
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
                        <h1>Login</h1>
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
                            Login
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Welcome</h1>
                    <h2 style={{color:"yellow",fontSize:'30px'}}>Admin</h2>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;