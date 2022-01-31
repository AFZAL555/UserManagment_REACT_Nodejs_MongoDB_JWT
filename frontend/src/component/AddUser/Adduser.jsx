import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import AdminMain from '../AdminMain/adminmain'

const Adduser = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("Admintoken");
		if (!token) {
		   navigate("/adminlogin8714");
        }else{

            navigate("/addUser");
        }
	  }, []);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/AdminAddusers";
			const { data: res } = await axios.post(url, data);
			navigate("/adminhome");
			console.log(res.message);
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				
				setError(error.response.data.message);
				console.log(error.message);
			}
		}
	};
	return (

		<div>
			<AdminMain />
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Add New User</h1>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Enter User Details</h1>
						{error && <div className={styles.error_msg}>{error}</div>}
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
							autocomplete="off"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
							autocomplete="off"
						/>
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
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
		</div>
	);
};

export default Adduser;

