import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import AdminMain from '../AdminMain/adminmain'
import { deleteUser } from '../../Service/api';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#F7A200'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


function AllUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const classes = useStyles();

    useEffect(() => {
        const token = localStorage.getItem("Admintoken");
		if (!token) {
		   navigate("/adminlogin8714");
        }else{
            navigate("/usersList");
        }
        getUserData();
    }, []);

    const getUserData = async () => {
        const result = await axios.get("http://localhost:8080/api/fetchuserdata");
        console.log("Fetching User Data.........");
        console.log("Done");
        setUsers(result.data.resp);
    };
    const deleteUserData =(async(id) => 
    {   
        if (window.confirm("Are you sure ?")) {
        console.log(id);
        await deleteUser(id);
        getUserData();
        console.log("User Data Deleted From Database");
        }
    })
    return (
        <div>
        <AdminMain />
        <div class="flex items-center justify-center mr-2">
            <div class="flex border-2 rounded">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                class="px-4 py-2 w-80"
                placeholder="Search..."
              />
              <Link to={`/name/${search.length == 0 ? "nofilter" : search}`}>
                <a style={{textDecoration:"none"}} ><Button color="secondary" variant="contained" >Search</Button> </a>
              </Link>
            </div>
          </div>       

        <Table className={classes.table} >
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>No:</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow className={classes.row} key={user.id}>
                        <TableCell>{++index}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>

                        
                        <TableCell>
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edituser/${user._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={()=>{deleteUserData(user._id)}} >Delete</Button> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
</div>

        
     )
    }

    
export default AllUsers;