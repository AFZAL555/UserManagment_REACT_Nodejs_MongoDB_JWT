import axios from 'axios';
import AdminMain from '../AdminMain/adminmain';
import React,{useState,useEffect} from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import styles from "./styles.module.css";

function Edit() {
  const [firstName,setfirstName] =useState('')
  const [lastName,setlastName] =useState('')
  const [email,setEmail] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const {id}=useParams();
  console.log(id +"==> this is id.");

  useEffect(() => {
    const token = localStorage.getItem("Admintoken");
    if (!token) {
      navigate("/adminlogin8714");
      return false;
    }
    getDataById();
    
  }, [])
 

 async function getDataById(){
    const user= await axios.get('http://localhost:8080/api/getuser/'+id)
    setfirstName(user.data.resp.firstName);
    setlastName(user.data.resp.lastName);
    setEmail(user.data.resp.email);

  }
 
  async function updateuser(e){
     e.preventDefault();
    try {
     const newData={firstName,lastName,email,id};
     await  axios.post('http://localhost:8080/api/update',newData).then(()=>{
        setfirstName('');
        setlastName('');
        setEmail('');
        navigate('/usersList');
    })
    
        
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) 
        {
            setError(error.response.data.message);
        }
    }
    }
    return (
        <div>
            <AdminMain />
           <div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome</h1>
					<h4 style={{color:"white"}}> You can update here!</h4>
				</div>
				<div className={styles.right}>
						<h1>Update User Details</h1>
						{error && <div className={styles.error_msg}>{error}</div>}
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							value={firstName} onChange={(e)=>setfirstName(e.target.value)}
                            id="firstName"
							required
							className={styles.input}
							autocomplete="off"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							value={lastName} onChange={(e)=>setlastName(e.target.value)}
                            id="lastName"
							required
							className={styles.input}
							autocomplete="off"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
                            id="email"
							value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
							required
							className={styles.input}
							autocomplete="off"
						/>
						<button onClick={updateuser} type="submit"  value="Update" className={styles.green_btn}>
							Update
						</button>
				
				</div>
			</div>
		</div>

        </div>
    )
}

export default Edit