import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {useEffect} from 'react'

const AdminMain = () => {
	const handleLogout = () => {
		localStorage.removeItem("Admintoken");
		window.location.reload();
	};
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("Admintoken");
		if (!token) {
		   navigate("/adminlogin8714");
        return false;
        }
	  }, []);
   
	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 >Bro-Cart</h1>
                <Link to="/usersList"><button className={styles.white_btn} type="button" >All Users</button></Link>
                <Link to="/addUser"><button className={styles.white_btn} type="button" >Add User</button></Link>
				<button className={styles.white_btn1} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default AdminMain;