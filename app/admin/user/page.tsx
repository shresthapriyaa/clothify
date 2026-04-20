

'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { Users, Plus } from "lucide-react"

import { IUser } from "@/app/admin/types/types"
import { AddUser } from "./AddUser"
import { TableDemo } from "./TableComponent"

export default function Adminpage() {
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)

    const handleFetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");
            console.log("/api/users response:", response.data);

            const raw = response.data.data || [];
            const normalized = raw.map((u: any) => ({
                ...u,
                name: u.name ?? u.username ?? "",
            }));

            setUsers(normalized);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">Loading users...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                                <p className="text-gray-600">Manage all registered users</p>
                            </div>
                        </div>
                        <AddUser handleUpdateLocalState={handleUpdateLocalState} />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Users ({users.length})</h2>
                    </div>
                    <TableDemo handleUpdateLocalState={handleUpdateLocalState} users={users} />
                </div>
            </div>
        </div>
    )
}