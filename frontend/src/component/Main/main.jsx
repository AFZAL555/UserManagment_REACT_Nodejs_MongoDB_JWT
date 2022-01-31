import styles from "./styles.module.css";
import {useEffect} from 'react'
import {useNavigate } from "react-router-dom";

const Main = () => {

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
		   navigate("/login");
        }else{

            navigate("/");
        }
	  }, []);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 >Bro-Cart</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>





		</div>
	);
};

export default Main;