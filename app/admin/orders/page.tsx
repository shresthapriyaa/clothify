'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { IUser, IProduct, IOrder } from "./types/types"
import { AddOrder } from "./AddOrder"
import { TableOrders } from "./TableOrders"

function OrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)

    const handleFetchData = async () => {
        try {
            const [ordersRes, usersRes, productsRes] = await Promise.all([
                axios.get("/api/orders"),
                axios.get("/api/users"),
                axios.get("/api/products")
            ])

            console.log("Orders response:", ordersRes.data)
            console.log("Users response:", usersRes.data)
            console.log("Products response:", productsRes.data)

            setOrders(ordersRes.data.data || ordersRes.data || [])
            
            // Normalize users data
            const rawUsers = usersRes.data.data || usersRes.data || []
            const normalizedUsers = rawUsers.map((u: any) => ({
                ...u,
                name: u.name ?? u.username ?? "",
                username: u.username ?? u.name ?? "",
            }))
            setUsers(normalizedUsers)
            
            setProducts(productsRes.data.data || productsRes.data || [])
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    const handleUpdateLocalState = (order: IOrder, type: string) => {
        if (type === "add") {
            console.log("New Order:", order)
            setOrders([order, ...orders])
        }
        if (type === "edit") {
            setOrders(orders.map(o => o.id === order.id ? order : o))
        }
        if (type === "delete") {
            setOrders(orders.filter((o) => o.id !== order.id))
        }
    }

    return (
        <div className="flex flex-col m-20">
            <div className="flex justify-between mb-6">
                <div className="text-xl font-semibold">All Orders</div>
                <AddOrder 
                    users={users} 
                    products={products} 
                    handleUpdateLocalState={handleUpdateLocalState} 
                />
            </div>
            <div className="w-full">
                {loading ? (
                    <div className="text-center p-8">Loading...</div>
                ) : (
                    <TableOrders 
                        orders={orders}
                        users={users}
                        products={products}
                        handleUpdateLocalState={handleUpdateLocalState}
                    />
                )}
            </div>
        </div>
    )
}

export default OrdersPage