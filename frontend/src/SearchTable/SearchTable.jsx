import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams, Link, useNavigate } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import AdminMain from '../component/AdminMain/adminmain'
import { deleteUser } from '../Service/api';


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


function SearchTable() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const classes = useStyles();
    const { search } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("Admintoken");
		if (!token) {
		   navigate("/adminlogin8714");
            return false}
        axios.get("http://localhost:8080/api/search/"+search).then((resp) => {
        setUsers(resp.data.users);
    });
  }, [search]);

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
        const p = await deleteUser(id);
        console.log("User Data Deleted From Database");
        getUserData();

        }


    });






    return (
<div>
<AdminMain />

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
                        <TableCell>{++index}</TableCell> 
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

    
export default SearchTable;