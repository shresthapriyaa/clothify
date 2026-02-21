
// "use client"

// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import React, { useState, useEffect } from "react"
// import { toast } from "sonner"
// import { useForm } from "react-hook-form"
// import z from "zod"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import axios from "axios"
// import { Edit } from "lucide-react"
// import { IProduct } from "./types/types"
// import { ScrollArea } from "@radix-ui/react-scroll-area"

// // Zod  form
// const ProductSchema = z.object({
//     name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//     price: z.number().min(0, { message: "Price must be a positive number." }),
//     image: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
//     categoryName: z.string().min(1, { message: "Please select a category" }),
//     sizes: z.string(),
//     colors: z.string(),
//     isBest: z.boolean(),
//     isPopular: z.boolean(),
//     isSale: z.boolean()
// })

// interface IEditProductProps {
//     product: IProduct
//     categories: { id: string; name: string }[]
//     handleUpdateLocalState: (product: IProduct, type: string) => void
// }

// export function EditProduct({ product, categories, handleUpdateLocalState }: IEditProductProps) {
//     const [open, setOpen] = useState(false)

//     const form = useForm<z.infer<typeof ProductSchema>>({
//         resolver: zodResolver(ProductSchema),
//         defaultValues: {
//             name: product.name,
//             price: product.price,
//             image: product.image || "",
//             categoryName: product.category.name,
//             sizes: product.sizes.join(", "),
//             colors: product.colors.join(", "),
//             isBest: product.isBest,
//             isPopular: product.isPopular,
//             isSale: product.isSale
//         },
//     })

    
    
//     useEffect(() => {
//         if (open) {
//             form.reset({
//                 name: product.name,
//                 price: product.price,
//                 image: product.image || "",
//                 categoryName: product.category.name,
//                 sizes: product.sizes.join(", "),
//                 colors: product.colors.join(", "),
//                 isBest: product.isBest,
//                 isPopular: product.isPopular,
//                 isSale: product.isSale
//             })
//         }
//     }, [open, product, form])

//     const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
//         try {
//             const payload = {
//                 name: data.name,
//                 price: data.price,
//                 image: data.image || "",
//                 categoryName: data.categoryName,
//                 sizes: data.sizes.split(",").map(s => s.trim()).filter(Boolean),
//                 colors: data.colors.split(",").map(c => c.trim()).filter(Boolean),
//                 isBest: data.isBest,
//                 isPopular: data.isPopular,
//                 isSale: data.isSale
//             }

//             const response = await axios.put(`/api/products/${product.id}`, payload)
//             if (response.status === 200) {
//                 toast.success("Product updated successfully")
                
//                 const updatedProduct: IProduct = {
//                     ...product,
//                     ...response.data.data,
//                     category: { name: data.categoryName }
//                 }
                
//                 handleUpdateLocalState(updatedProduct, "edit")
//                 setOpen(false)
//             }
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 toast.error(error.response?.data?.error || "Error updating product")
//             } else {
//                 toast.error("Error updating product")
//             }
//         }
//     }

//     const onSubmitByPatch = async (data: z.infer<typeof ProductSchema>) => {
//         const changedFields: any = {}

//         if (data.name !== product.name) changedFields.name = data.name
//         if (data.price !== product.price) changedFields.price = data.price
//         if (data.image !== product.image) changedFields.image = data.image
//         if (data.categoryName !== product.category.name) changedFields.categoryName = data.categoryName
        
//         const newSizes = data.sizes.split(",").map(s => s.trim()).filter(Boolean)
//         const newColors = data.colors.split(",").map(c => c.trim()).filter(Boolean)
        
//         if (JSON.stringify(newSizes) !== JSON.stringify(product.sizes)) changedFields.sizes = newSizes
//         if (JSON.stringify(newColors) !== JSON.stringify(product.colors)) changedFields.colors = newColors
//         if (data.isBest !== product.isBest) changedFields.isBest = data.isBest
//         if (data.isPopular !== product.isPopular) changedFields.isPopular = data.isPopular
//         if (data.isSale !== product.isSale) changedFields.isSale = data.isSale

//         if (Object.keys(changedFields).length === 0) {
//             toast.info("No changes detected")
//             return
//         }

//         try {
//             const response = await axios.patch(`/api/products/${product.id}`, changedFields)
//             if (response.status === 200) {
//                 toast.success(`Product updated (PATCH) - ${Object.keys(changedFields).length} field(s) changed`)
                
//                 const updatedProduct: IProduct = {
//                     ...product,
//                     ...response.data.data,
//                     category: { name: changedFields.categoryName || product.category.name }
//                 }
                
//                 handleUpdateLocalState(updatedProduct, "edit")
//                 setOpen(false)
//             }
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 toast.error(error.response?.data?.error || "Error updating product")
//             } else {
//                 toast.error("Error updating product")
//             }
//         }
//     }

//     return (

        
//             <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <Button size="icon" variant="outline" className="bg-white hover:bg-black/15">
//                     <Edit className="h-4 w-4" />
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-2xl max-h-10/12 overflow-auto ">
//                 <DialogHeader>
//                     <DialogTitle>Edit Product</DialogTitle>
//                     <DialogDescription>Modify product details here. Click save when done.</DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                     <div className="w-full space-y-6">
//                         <FormField
//                             control={form.control}
//                             name="name"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Name</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} placeholder="Product name" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="price"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Price</FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             type="number" 
//                                             {...field} 
//                                             onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
//                                             placeholder="Price" 
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="image"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Image URL</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} placeholder="https://example.com/image.jpg" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="categoryName"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Category</FormLabel>
//                                     <Select onValueChange={field.onChange} value={field.value}>
//                                         <FormControl>
//                                             <SelectTrigger className="w-full">
//                                                 <SelectValue placeholder="Select category" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {categories.map(cat => (
//                                                 <SelectItem key={cat.id} value={cat.name}>
//                                                     {cat.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="sizes"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Sizes (comma-separated)</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} placeholder="S, M, L, XL" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="colors"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Colors (comma-separated)</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} placeholder="Red, Blue, Green" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="isBest"
//                             render={({ field }) => (
//                                 <FormItem className="flex items-center justify-between p-3 border rounded-lg">
//                                     <FormLabel>Best Seller</FormLabel>
//                                     <FormControl>
//                                         <Switch checked={field.value} onCheckedChange={field.onChange} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="isPopular"
//                             render={({ field }) => (
//                                 <FormItem className="flex items-center justify-between p-3 border rounded-lg">
//                                     <FormLabel>Popular</FormLabel>
//                                     <FormControl>
//                                         <Switch checked={field.value} onCheckedChange={field.onChange} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="isSale"
//                             render={({ field }) => (
//                                 <FormItem className="flex items-center justify-between p-3 border rounded-lg">
//                                     <FormLabel>On Sale</FormLabel>
//                                     <FormControl>
//                                         <Switch checked={field.value} onCheckedChange={field.onChange} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <div className="flex gap-3">
//                             <Button type="button" onClick={form.handleSubmit(onSubmit)} variant="default">
//                                 Save All (PUT)
//                             </Button>
//                             <Button type="button" onClick={form.handleSubmit(onSubmitByPatch)} variant="secondary">
//                                 Save Changes Only (PATCH)
//                             </Button>
//                         </div>
//                     </div>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }

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
import { Edit, Upload, X } from "lucide-react"
import { IProduct } from "./types/types"

const ProductSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    price: z.number().min(0, { message: "Price must be a positive number." }),
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
    const [imagePreview, setImagePreview] = useState<string>(product.image || "")
    const [imageUrl, setImageUrl] = useState<string>(product.image || "")
    const [uploading, setUploading] = useState(false)

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: product.name,
            price: product.price,
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
                categoryName: product.category.name,
                sizes: product.sizes.join(", "),
                colors: product.colors.join(", "),
                isBest: product.isBest,
                isPopular: product.isPopular,
                isSale: product.isSale
            })
            setImagePreview(product.image || "")
            setImageUrl(product.image || "")
        }
    }, [open, product, form])

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file")
            return
        }
        
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB")
            return
        }

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)

        // Upload to server
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const uploadResponse = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (uploadResponse.data.success) {
                setImageUrl(uploadResponse.data.imageUrl)
                toast.success("New image uploaded")
            } else {
                throw new Error(uploadResponse.data.message || "Upload failed")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to upload image")
            setImagePreview(product.image || "")
            setImageUrl(product.image || "")
        } finally {
            setUploading(false)
        }
    }

    const removeImage = () => {
        setImagePreview(product.image || "")
        setImageUrl(product.image || "")
    }

    const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
        try {
            const payload = {
                name: data.name,
                price: data.price,
                image: imageUrl,
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
        if (imageUrl !== product.image) changedFields.image = imageUrl
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
                <Button size="icon" variant="outline" className="bg-white hover:bg-black/15">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                        
                        {/* Image Upload Section */}
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <div className="relative">
                                {imagePreview ? (
                                    <>
                                        <img 
                                            src={imagePreview} 
                                            alt="Product" 
                                            className="w-full h-48 object-cover rounded-lg border" 
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <label htmlFor="edit-img" className="cursor-pointer">
                                                <div className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-lg">
                                                    <Upload className="h-4 w-4" />
                                                </div>
                                                <input 
                                                    id="edit-img" 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*" 
                                                    onChange={handleImageChange}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            {imageUrl !== product.image && (
                                                <Button 
                                                    type="button" 
                                                    variant="destructive" 
                                                    size="icon"
                                                    onClick={removeImage}
                                                    disabled={uploading}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <label htmlFor="edit-img" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-400">Upload image (MAX 5MB)</p>
                                        <input 
                                            id="edit-img" 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleImageChange}
                                            disabled={uploading}
                                        />
                                    </label>
                                )}
                                {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
                                {imageUrl !== product.image && !uploading && (
                                    <p className="text-sm text-green-600 mt-2">✓ New image uploaded</p>
                                )}
                            </div>
                        </FormItem>

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
                            <Button 
                                type="button" 
                                onClick={form.handleSubmit(onSubmit)} 
                                variant="default"
                                disabled={uploading}
                            >
                                Save All (PUT)
                            </Button>
                            <Button 
                                type="button" 
                                onClick={form.handleSubmit(onSubmitByPatch)} 
                                variant="secondary"
                                disabled={uploading}
                            >
                                Save Changes Only (PATCH)
                            </Button>
                        </div>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


