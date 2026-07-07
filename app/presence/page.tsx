"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Presence() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        console.log('Fetched users:', response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-3xl">Présence</h2>
      <div>
        {users.map((user: any) => (
          <div key={user.id}>
            <p>{user.firstName} {user.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
