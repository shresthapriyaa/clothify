'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { ShoppingCart, Plus } from "lucide-react"
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">Loading orders...</div>
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
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <ShoppingCart className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                                <p className="text-gray-600">Track and manage customer orders</p>
                            </div>
                        </div>
                        <AddOrder 
                            users={users} 
                            products={products} 
                            handleUpdateLocalState={handleUpdateLocalState} 
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Orders ({orders.length})</h2>
                    </div>
                    <TableOrders 
                        orders={orders}
                        users={users}
                        products={products}
                        handleUpdateLocalState={handleUpdateLocalState}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrdersPage