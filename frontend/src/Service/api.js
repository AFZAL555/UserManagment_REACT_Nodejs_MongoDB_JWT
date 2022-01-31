import axios from 'axios';
const usersUrl = 'http://localhost:8080/api/delete';

export const deleteUser = async (id) => {
    console.log("vannu");
    return await axios.delete(`${usersUrl}/${id}`);
}
