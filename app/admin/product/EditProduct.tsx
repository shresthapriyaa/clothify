
"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import axios from "axios"
import { Edit } from "lucide-react"
import { IProduct } from "./types/types"

// Zod  form
const ProductSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    price: z.number().min(0, { message: "Price must be a positive number." }),
    image: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
    categoryName: z.string().min(1, { message: "Please select a category" }),
    sizes: z.string(),
    colors: z.string(),
    isBest: z.boolean(),
    isPopular: z.boolean(),
    isSale: z.boolean()
})

interface IEditProductProps {
    product: IProduct
    categories: { id: string; name: string }[]
    handleUpdateLocalState: (product: IProduct, type: string) => void
}

export function EditProduct({ product, categories, handleUpdateLocalState }: IEditProductProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: product.name,
            price: product.price,
            image: product.image || "",
            categoryName: product.category.name,
            sizes: product.sizes.join(", "),
            colors: product.colors.join(", "),
            isBest: product.isBest,
            isPopular: product.isPopular,
            isSale: product.isSale
        },
    })

    
    
    useEffect(() => {
        if (open) {
            form.reset({
                name: product.name,
                price: product.price,
                image: product.image || "",
                categoryName: product.category.name,
                sizes: product.sizes.join(", "),
                colors: product.colors.join(", "),
                isBest: product.isBest,
                isPopular: product.isPopular,
                isSale: product.isSale
            })
        }
    }, [open, product, form])

    const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
        try {
            const payload = {
                name: data.name,
                price: data.price,
                image: data.image || "",
                categoryName: data.categoryName,
                sizes: data.sizes.split(",").map(s => s.trim()).filter(Boolean),
                colors: data.colors.split(",").map(c => c.trim()).filter(Boolean),
                isBest: data.isBest,
                isPopular: data.isPopular,
                isSale: data.isSale
            }

            const response = await axios.put(`/api/products/${product.id}`, payload)
            if (response.status === 200) {
                toast.success("Product updated successfully")
                
                const updatedProduct: IProduct = {
                    ...product,
                    ...response.data.data,
                    category: { name: data.categoryName }
                }
                
                handleUpdateLocalState(updatedProduct, "edit")
                setOpen(false)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Error updating product")
            } else {
                toast.error("Error updating product")
            }
        }
    }

    const onSubmitByPatch = async (data: z.infer<typeof ProductSchema>) => {
        const changedFields: any = {}

        if (data.name !== product.name) changedFields.name = data.name
        if (data.price !== product.price) changedFields.price = data.price
        if (data.image !== product.image) changedFields.image = data.image
        if (data.categoryName !== product.category.name) changedFields.categoryName = data.categoryName
        
        const newSizes = data.sizes.split(",").map(s => s.trim()).filter(Boolean)
        const newColors = data.colors.split(",").map(c => c.trim()).filter(Boolean)
        
        if (JSON.stringify(newSizes) !== JSON.stringify(product.sizes)) changedFields.sizes = newSizes
        if (JSON.stringify(newColors) !== JSON.stringify(product.colors)) changedFields.colors = newColors
        if (data.isBest !== product.isBest) changedFields.isBest = data.isBest
        if (data.isPopular !== product.isPopular) changedFields.isPopular = data.isPopular
        if (data.isSale !== product.isSale) changedFields.isSale = data.isSale

        if (Object.keys(changedFields).length === 0) {
            toast.info("No changes detected")
            return
        }

        try {
            const response = await axios.patch(`/api/products/${product.id}`, changedFields)
            if (response.status === 200) {
                toast.success(`Product updated (PATCH) - ${Object.keys(changedFields).length} field(s) changed`)
                
                const updatedProduct: IProduct = {
                    ...product,
                    ...response.data.data,
                    category: { name: changedFields.categoryName || product.category.name }
                }
                
                handleUpdateLocalState(updatedProduct, "edit")
                setOpen(false)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Error updating product")
            } else {
                toast.error("Error updating product")
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Modify product details here. Click save when done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <div className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Product name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            {...field} 
                                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                            placeholder="Price" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="https://example.com/image.jpg" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.name}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes (comma-separated)</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="S, M, L, XL" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors (comma-separated)</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Red, Blue, Green" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isBest"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                                    <FormLabel>Best Seller</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPopular"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                                    <FormLabel>Popular</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isSale"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                                    <FormLabel>On Sale</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-3">
                            <Button type="button" onClick={form.handleSubmit(onSubmit)} variant="default">
                                Save All (PUT)
                            </Button>
                            <Button type="button" onClick={form.handleSubmit(onSubmitByPatch)} variant="secondary">
                                Save Changes Only (PATCH)
                            </Button>
                        </div>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    )
}








