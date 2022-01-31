import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./component/Main/main";
import Signup from "./component/Signup/Signup";
import Login from "./component/Login/login";
import AdminLogin from './component/AdminLogin/adminlogin'
import AdminMain from './component/AdminMain/adminmain'
import Adduser from './component/AddUser/Adduser'
import AllUsers from './component/UserData/Userdata';
import Edit from './component/Updateuser/Updateuser';
import SearchTable from './SearchTable/SearchTable';
function App() {
	const user = localStorage.getItem("token");
	const token = localStorage.getItem("Admintoken");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />

			<Route path="/adminlogin8714" exact element={<AdminLogin />} />
			<Route path="/adminhome" exact element={<AdminMain />} />
			<Route path="/usersList" exact element={<AllUsers />} />
			<Route path="/addUser" exact element={<Adduser />} />
			<Route path="/edituser/:id" exact element={<Edit/>} />
			<Route path ="/name/:search" exact element={<SearchTable/>} />


		</Routes>
	);
}


export default App;