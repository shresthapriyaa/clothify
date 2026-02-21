
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
      <div className=" bg-white text-black min-w-full rounded-2xl overflow-x-auto">
        <div className="border border-black/10 rounded-lg overflow-autoborder-b-4 border-t-4">
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100] font-semibold text-black  text-left px-4 py2 border-b-2">ID</TableHead>
                    <TableHead className="text-black  px-4 py2 font-semibold  border-b-2">NAME</TableHead>
                    <TableHead className="text-black px-4 py-2 text-left font-semibold border-b-2">EMAIL</TableHead>
                
                    <TableHead className="text-black px-4 py-2 text-left font-semibold border-b-2">ISVERIFIED</TableHead>
                    <TableHead className="text-black px-4 py-2 text-left font-semibold border-b-2">ROLE</TableHead>
                    <TableHead className="text-black px-4 py-2 text-left font-semibold border-b-2">PASSWORD</TableHead>
                    <TableHead className=" px-4 py-2 text-right font-semibold text-black border-b-2">ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium px-4 py-2 border-b-2">{user.id}</TableCell>
                        <TableCell className="font-medium px-4 py-2 border-b-2">{user.name}</TableCell>
                        <TableCell className="px-4 py-2 border-b-2">{user.email}</TableCell>
                         {/* <TableCell className="px-4 py-2 border-b-2">{user.age || "-"}</TableCell> */}
                         <TableCell className="px-4 py-2 border-b-2">{user.isVerified === false ? "false" : "true"}</TableCell>
                        <TableCell className="px-4 py- border-b-2" >{user.role}</TableCell>
                       
                        <TableCell  className="px-4 py-2 border-b-2">{user.password ? "******" : "-"}</TableCell>
                        


                        
                        <TableCell className="text-right px-4 py-2 border-b-2">
                            <div className="flex justify-end w-full gap-2 border-b-2">
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



 



