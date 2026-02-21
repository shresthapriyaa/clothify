

'use client'
import axios from "axios"
import { useEffect, useState } from "react"


import { IUser } from "@/app/admin/types/types"
import { AddUser } from "./AddUser"
import { TableDemo } from "./TableComponent"

export default function Adminpage() {
    const [users, setUsers] = useState<IUser[]>([])
    const handleFetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");
            // log raw response for debugging
            console.log("/api/users response:", response.data);

            // normalize: ensure `name` exists (map from `username` if backend returned it)
            const raw = response.data.data || [];
            const normalized = raw.map((u: any) => ({
                ...u,
                name: u.name ?? u.username ?? "",
            }));

            setUsers(normalized);
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        handleFetchUsers()
    }, [])
    const handleUpdateLocalState = (user: IUser, type: string) => {
        if (type === "add") {
            console.log("new User:", user)
            setUsers([...users, user])
        }
        if (type === "edit") {
            setUsers(users.map(u => u.id === user.id ? user : u))
        }
        if (type === "delete") {
            setUsers(users.filter((e) => e.id !== user.id))
        }
    }



    return <div className="flex flex-col  m-3  ">
        <div className="flex justify-between">
            <div className="text-xl font-semibold">All Users</div>
            <AddUser  handleUpdateLocalState={handleUpdateLocalState} />
        </div>
        <div className=" w-full ">
            <TableDemo handleUpdateLocalState={handleUpdateLocalState} users={users} />
        </div>
    </div>
}