
"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { EditUser } from "./EditUser"
import { DeleteUser } from "./DeleteUser"
import { IUser } from "@/app/admin/types/types";

interface ITableProps {
    users: IUser[];
    handleUpdateLocalState: (user: IUser, type: string) => void
}

export function TableDemo({ users, handleUpdateLocalState }: ITableProps) {
    return (
        <div className="bg-white text-black w-full rounded-2xl">
            <div className="border border-black/20 rounded-lg border-b-4 border-t-4 overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b-2 border-black/10">
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">ID</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">NAME</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">EMAIL</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">VERIFIED</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">ROLE</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">PASSWORD</TableHead>
                            <TableHead className="text-black px-4 py-3 font-semibold text-right whitespace-nowrap">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id} className="border-b border-black/20 hover:bg-black/10">
                                <TableCell className="px-4 py-3 font-mono text-sm whitespace-nowrap">
                                    {user.id.slice(0, 8)}...
                                </TableCell>
                                <TableCell className="px-4 py-3 font-medium whitespace-nowrap">{user.name}</TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">{user.email}</TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.isVerified 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.isVerified ? "Verified" : "Unverified"}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.role === 'ADMIN' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                    {user.password ? "••••••••" : "-"}
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex justify-end gap-2">
                                        <EditUser user={user} handleUpdateLocalState={handleUpdateLocalState} />
                                        <DeleteUser userId={user.id} handleUpdateLocalState={handleUpdateLocalState} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}



 



