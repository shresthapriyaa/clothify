
"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"
import { Plus, Trash2 } from "lucide-react"
import { IUser, IProduct, IOrder } from "./types/types"

interface IAddOrderProps {
    users: IUser[]
    products: IProduct[]
    handleUpdateLocalState: (order: IOrder, type: string) => void
}

export function AddOrder({ users, products, handleUpdateLocalState }: IAddOrderProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState("")
    const [items, setItems] = useState([
        { productId: "", quantity: 1, size: "", color: "" }
    ])

    const addItem = () => {
        setItems([...items, { productId: "", quantity: 1, size: "", color: "" }])
    }

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index))
        }
    }

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }
        setItems(newItems)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validation
        if (!userId) {
            toast.error("Please select a user")
            return
        }

        for (let i = 0; i < items.length; i++) {
            if (!items[i].productId) {
                toast.error(`Please select a product for item ${i + 1}`)
                return
            }
            if (!items[i].size) {
                toast.error(`Please enter size for item ${i + 1}`)
                return
            }
            if (!items[i].color) {
                toast.error(`Please enter color for item ${i + 1}`)
                return
            }
        }

        setLoading(true)
        try {
            const total = items.reduce((acc, item) => {
                const product = products.find(p => p.id === item.productId)
                return acc + (product ? product.price * item.quantity : 0)
            }, 0)

            const payload = { userId, items, total }
            console.log("Submitting order:", payload)

            const response = await axios.post("/api/orders", payload)
            if (response.status === 201 || response.status === 200) {
                toast.success("Order added successfully!")
                handleUpdateLocalState(response.data.data, "add")
                
                // Reset form
                setUserId("")
                setItems([{ productId: "", quantity: 1, size: "", color: "" }])
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Error adding order")
            console.error("Error creating order:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    className="bg-black text-white hover:bg-amber-100 border-b-4 border-t-4"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Order
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Order</DialogTitle>
                </DialogHeader>

                {users.length === 0 && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        ⚠️ No users found. Please add users first.
                    </div>
                )}
                {products.length === 0 && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        ⚠️ No products found. Please add products first.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-2">User *</label>
                        <Select value={userId} onValueChange={setUserId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.length === 0 ? (
                                    <div className="p-2 text-sm text-gray-500">No users available</div>
                                ) : (
                                    users.map(u => (
                                        <SelectItem key={u.id} value={u.id}>
                                            {u.id || u.username || u.email}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Order Items</h3>
                        {items.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Item {index + 1}</span>
                                    {items.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeItem(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Product *</label>
                                    <Select 
                                        value={item.productId} 
                                        onValueChange={(val) => updateItem(index, "productId", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.length === 0 ? (
                                                <div className="p-2 text-sm text-gray-500">No products available</div>
                                            ) : (
                                                products.map(p => (
                                                    <SelectItem key={p.id} value={p.id}>
                                                        {p.name} - ${p.price}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Quantity *</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Size *</label>
                                    <Input
                                        placeholder="e.g. M, L, XL"
                                        value={item.size}
                                        onChange={(e) => updateItem(index, "size", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Color *</label>
                                    <Input
                                        placeholder="e.g. Red, Blue"
                                        value={item.color}
                                        onChange={(e) => updateItem(index, "color", e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={addItem}
                        className="w-full"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Item
                    </Button>

                    <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-amber-100 border-b-4 border-t-4"
                        disabled={loading || users.length === 0 || products.length === 0}
                    >
                        {loading ? "Adding Order..." : "Add Order"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
