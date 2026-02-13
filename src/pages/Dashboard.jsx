import {useEffect, useState} from "react";

function Dashboard(){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [selectedfile, setSelectedfile] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/users");
            const data = await res.json();
            if (res.ok) {
                setUsers(data);
            } else {
                setError(data.message || "Failed to fetch users");
            }
        } catch (err) {
            setError("An error occurred while fetching users / server might be down");
        }
    }
    //Update user function
    useEffect(() => {
        fetchUsers();
    }, []);

     const updateUser = async () => {
        await fetch("http://localhost:5000/api/auth/users/:id", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ editUser }),
            },
        });
        setEditUser(null);
        fetchUsers();
    };

     const uploadProfileImage = async (id) => {
        const file=selectedfile;
        const formData = new FormData();
        formData.append("Image", file);
        await fetch(`http://localhost:5000/api/auth/users/${id}/profile-image`, {
            method: "POST",
            body: formData,
        });

        fetchUsers();
    };

    // Delete user function
    const deleteUser = async (id) => {
        await fetch(`http://localhost:5000/api/auth/users/${id}`, {
            method: "DELETE",
        });
        fetchUsers();
    };


    return (
        <div style={{ padding: "20px" }}>
            <h2>User Dashboard</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>  
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Upload Image</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}> 
                            <td>
                                {user.profileImage ? (
                                    <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt="Profile" width="50" height="50" />
                                ) : (
                                    "No Image"
                                )}


                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>       
                            <td>{user.gender}</td>
                            <td>{user.age}</td>
                            <td>{user.address}</td> 
                            <td>
                                <input
                                    type="file"
                                    onChange={(e) => setSelectedfile(e.target.files[0])}
                                />
                                <button onClick={() => uploadProfileImage(user._id)}>Upload Image</button>
                            </td>
                            <td>
                                <button onClick={() => updateUser(user._id)}>Edit</button>
                                <button onClick={() => deleteUser(user._id)} style={{ marginLeft: "10px" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
        
export default Dashboard;




            



















{/*function Dashboard({onLogout}) {
    return(
        <div style={{padding:"20px"}}>
        <h1>Welcome User!!</h1>
        <p>You are Logged in.</p>
        <button onClick={onLogout}style={{marginTop:"20px", }}>Logout</button> 
        </div>
    );
}   
export default Dashboard;
*/}