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

import { EditOrder } from "./EditOrder"
import { DeleteOrder } from "./DeleteOrder"
import { IOrder, IProduct, IUser } from "./types/types"

interface ITableOrdersProps {
    orders: IOrder[]
    users: IUser[]
    products: IProduct[]
    handleUpdateLocalState: (order: IOrder, type: string) => void
}

export function TableOrders({ orders, users, products, handleUpdateLocalState }: ITableOrdersProps) {
    return (
        <div className="p-8 min-h-screen bg-black text-white min-w-full rounded-2xl border-b-4 border-t-4">
            <div className="border border-gray-700 rounded-lg border-b-4 border-t-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100] font-semibold text-white text-left px-4 py-2 border-b-2">ID</TableHead>
                            <TableHead className="text-white px-4 py-2 font-semibold border-b-2">USER</TableHead>
                            <TableHead className="text-white px-4 py-2 font-semibold border-b-2">TOTAL</TableHead>
                            <TableHead className="text-white px-4 py-2 font-semibold border-b-2">PRODUCTS</TableHead>
                            <TableHead className="text-white px-4 py-2 font-semibold border-b-2">CREATED AT</TableHead>
                            <TableHead className="px-4 py-2 text-right font-semibold text-white border-b-2">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium px-4 py-2 border-b-2">{order.id}</TableCell>
                                <TableCell className="px-4 py-2 border-b-2">
                                    {users.find(u => u.id === order.userId)?.username || "Unknown"}
                                </TableCell>
                                <TableCell className="px-4 py-2 border-b-2">${order.total.toFixed(2)}</TableCell>
                                <TableCell className="px-4 py-2 border-b-2">
                                    {order.items?.map(item => {
                                        const product = products.find(p => p.id === item.productId)
                                        return (
                                            <div key={item.id}>
                                                {product?.name} x {item.quantity} ({item.size}, {item.color})
                                            </div>
                                        )
                                    }) || 'No items'}
                                </TableCell>
                                <TableCell className="px-4 py-2 border-b-2">
                                    {new Date(order.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right px-4 py-2 border-b-2">
                                    <div className="flex justify-end w-full gap-2 border-b-2">
                                        <EditOrder order={order} users={users} products={products} handleUpdateLocalState={handleUpdateLocalState} />
                                        <DeleteOrder orderId={order.id} handleUpdateLocalState={handleUpdateLocalState} />
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
