"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePresenceStore } from "../stores/presence-store";

export default function Presence() {
  const {activeSection, setActiveSection} = usePresenceStore()
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

  const ACTIVE_STYLE = "text-black! border-black!";

  return (
    <div className="flex flex-col h-full gap-5">
      <h2 className="font-semibold text-3xl">Présence</h2>
      <div className="h-full overflow-y-auto flex flex-col border rounded-md border-gray-100">
        <div className="*:hover:cursor-pointer w-full flex *:w-full *:p-5 *:border-b-2 *:border-transparent font-semibold text-gray-400">
          <button 
          onClick={() => {
            (activeSection !== "faire") && setActiveSection("faire")
          }}
          className={`${activeSection === "faire" && ACTIVE_STYLE}`}>
            Faire la présence
          </button>
          <button
           onClick={() => {
            (activeSection !== "voir") && setActiveSection("voir")
          }}
          className={`${activeSection === "voir" && ACTIVE_STYLE}`}
          >
            Voir les présents
          </button>
        </div>
      </div>
    </div>
  );
}
