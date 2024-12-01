import React, { useState, useEffect } from "react";
import userImage from "./assets/UserPhoto.jpg";
import Logo from "./assets/IMG_2014.jpeg";

const DashBoard = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://student-app-backend-nine.vercel.app/api/v1/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data || []); // Update state with fetched users
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Function to delete a user
  const deleteUser = async (email) => {
    try {
      const response = await fetch(`https://student-app-backend-nine.vercel.app/api/v1/users/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Remove the deleted user from the state
        setUsers(users.filter(user => user.email !== email));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("An error occurred while deleting user.");
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-start mb-6">
        <img src={Logo} alt="User" className="w-[170px] h-15 rounded-full object-cover" />
      </div>
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-4">User Management</h1>

      {/* Loading or Error Message */}
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? 
       (  <p className="text-red-500 text-2xl ml-4">No Users found!</p> ) : (
        
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="w-full border-collapse bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-600 font-medium">Image</th>
                <th className="p-4 text-left text-gray-600 font-medium">Name</th>
                <th className="p-4 text-left text-gray-600 font-medium">Email</th>
                <th className="p-4 text-left text-gray-600 font-medium">Phone</th>
                <th className="p-4 text-left text-gray-600 font-medium">Gender</th>
                <th className="p-4 text-left text-gray-600 font-medium">Age</th>
                <th className="p-4 text-left text-gray-600 font-medium">Country</th>
                <th className="p-4 text-left text-gray-600 font-medium">Date/Time</th>
                <th className="p-4 text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="p-4">
                    <img
                      src={userImage}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 text-gray-700">{user.name}</td>
                  <td className="p-4 text-gray-700">{user.email}</td>
                  <td className="p-4 text-gray-700">{user.phone}</td>
                  <td className="p-4 text-gray-700">{user.gender || "N/A"}</td>
                  <td className="p-4 text-gray-700">{user.age !== null ? user.age : "N/A"}</td>
                  <td className="p-4 text-gray-700">{user.country}</td>
                  <td className="p-4 text-gray-700">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="p-4 text-gray-700">
                    <button
                      onClick={() => deleteUser(user.email)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashBoard;