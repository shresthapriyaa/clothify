

// "use client"

// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import React, { useState } from "react"
// import { toast } from "sonner"
// import { useForm } from "react-hook-form"
// import z from "zod"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import axios from "axios"
// import { Plus, Upload, X } from "lucide-react"
// import { Switch } from "@/components/ui/switch"
// import { IProduct } from "./types/types"

// const ProductSchema = z.object({
//     name: z.string().min(2),
//     price: z.number().min(0),
//     categoryId: z.string().min(1),
//     sizes: z.string(),
//     colors: z.string(),
//     isBest: z.boolean(),
//     isPopular: z.boolean(),
//     isSale: z.boolean()
// })

// interface IAddProductProps {
//     categories: { id: string; name: string }[]
//     handleUpdateLocalState: (product: IProduct, type: string) => void
// }

// export function AddProduct({ categories, handleUpdateLocalState }: IAddProductProps) {
//     const [open, setOpen] = useState(false)
//     const [imageFile, setImageFile] = useState<File | null>(null)
//     const [imagePreview, setImagePreview] = useState<string>("")
//     const [loading, setLoading] = useState(false)

//     const form = useForm<z.infer<typeof ProductSchema>>({
//         resolver: zodResolver(ProductSchema),
//         defaultValues: {
//             name: "",
//             price: 0,
//             categoryId: "",
//             sizes: "",
//             colors: "",
//             isBest: false,
//             isPopular: false,
//             isSale: false
//         },
//     })

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (!file) return
        
//         if (!file.type.startsWith('image/')) {
//             toast.error("Please select an image file")
//             return
//         }
        
//         if (file.size > 5 * 1024 * 1024) {
//             toast.error("Image must be less than 5MB")
//             return
//         }

//         setImageFile(file)
//         const reader = new FileReader()
//         reader.onloadend = () => setImagePreview(reader.result as string)
//         reader.readAsDataURL(file)
//     }

//     const removeImage = () => {
//         setImageFile(null)
//         setImagePreview("")
//     }

//     const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
//         if (!imageFile) {
//             toast.error("Please select an image")
//             return
//         }

//         setLoading(true)
//         try {
//             const reader = new FileReader()
//             const base64Image = await new Promise<string>((resolve) => {
//                 reader.onloadend = () => resolve(reader.result as string)
//                 reader.readAsDataURL(imageFile)
//             })

//             const response = await axios.post("/api/products", {
//                 name: data.name,
//                 price: data.price,
//                 image: base64Image,
//                 categoryId: data.categoryId,
//                 sizes: data.sizes.split(",").map(s => s.trim()).filter(Boolean),
//                 colors: data.colors.split(",").map(c => c.trim()).filter(Boolean),
//                 isBest: data.isBest,
//                 isPopular: data.isPopular,
//                 isSale: data.isSale
//             })

//             if (response.status === 201 || response.status === 200) {
//                 toast.success("Product Added Successfully")
//                 handleUpdateLocalState(response.data.data, "add")
//                 form.reset()
//                 setOpen(false)
//                 removeImage()
//             }
//         } catch (error: any) {
//             toast.error(error?.response?.data?.error || "Error Adding Product")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <Button variant="outline" className="bg-white text-black hover:bg-amber-100 hover:text-black border-b-4 border-t-4">
//                     <Plus className="mr-2 h-4 w-4" />Add New Product
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold text-black">Add Product</DialogTitle>
//                     <DialogDescription className="text-black">Add a new product to inventory.</DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-2xl space-y-6">
                        
//                         <FormField control={form.control} name="name" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="text-gray-200">Product Name</FormLabel>
//                                 <FormControl><Input {...field} className="text-black bg-white" /></FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="price" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="text-gray-200">Price</FormLabel>
//                                 <FormControl>
//                                     <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} className="text-black bg-white" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />
                        
//                         <FormItem>
//                             <FormLabel className="text-gray-200">Product Image</FormLabel>
//                             {!imagePreview ? (
//                                 <label htmlFor="img" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
//                                     <Upload className="w-8 h-8 mb-2 text-gray-400" />
//                                     <p className="text-sm text-gray-400">Upload image (MAX 5MB)</p>
//                                     <input id="img" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
//                                 </label>
//                             ) : (
//                                 <div className="relative">
//                                     <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
//                                     <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}>
//                                         <X className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             )}
//                         </FormItem>

//                         <FormField control={form.control} name="categoryId" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="text-gray-200">Category</FormLabel>
//                                 <Select onValueChange={field.onChange} value={field.value}>
//                                     <FormControl><SelectTrigger className="text-black bg-white"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
//                                     <SelectContent className="bg-white">
//                                         {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="sizes" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="text-gray-200">Sizes</FormLabel>
//                                 <FormControl><Input {...field} placeholder="S, M, L, XL" className="text-black bg-white" /></FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="colors" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="text-gray-200">Colors</FormLabel>
//                                 <FormControl><Input {...field} placeholder="Red, Blue" className="text-black bg-white" /></FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="isBest" render={({ field }) => (
//                             <FormItem className="flex items-center justify-between border p-3 rounded">
//                                 <FormLabel className="text-gray-200">Best Seller</FormLabel>
//                                 <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="isPopular" render={({ field }) => (
//                             <FormItem className="flex items-center justify-between border p-3 rounded">
//                                 <FormLabel className="text-gray-200">Popular</FormLabel>
//                                 <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
//                             </FormItem>
//                         )} />

//                         <FormField control={form.control} name="isSale" render={({ field }) => (
//                             <FormItem className="flex items-center justify-between border p-3 rounded">
//                                 <FormLabel className="text-gray-200">On Sale</FormLabel>
//                                 <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
//                             </FormItem>
//                         )} />

//                         <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-zinc-400 border-2" disabled={loading}>
//                             {loading ? "Adding..." : "Add Product"}
//                         </Button>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }






"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { Plus, Upload, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { IProduct } from "./types/types"

const ProductSchema = z.object({
    name: z.string().min(2),
    price: z.number().min(0),
    categoryId: z.string().min(1),
    sizes: z.string(),
    colors: z.string(),
    isBest: z.boolean(),
    isPopular: z.boolean(),
    isSale: z.boolean()
})

interface IAddProductProps {
    categories: { id: string; name: string }[]
    handleUpdateLocalState: (product: IProduct, type: string) => void
}

export function AddProduct({ categories, handleUpdateLocalState }: IAddProductProps) {
    const [open, setOpen] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            categoryId: "",
            sizes: "",
            colors: "",
            isBest: false,
            isPopular: false,
            isSale: false
        },
    })

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

        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)

        // Upload image to server
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
                toast.success("Image uploaded successfully")
            } else {
                throw new Error(uploadResponse.data.message || "Upload failed")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to upload image")
            setImageFile(null)
            setImagePreview("")
        } finally {
            setUploading(false)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setImagePreview("")
        setImageUrl("")
    }

    const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
        if (!imageUrl) {
            toast.error("Please upload an image")
            return
        }

        setLoading(true)
        try {
            const response = await axios.post("/api/products", {
                name: data.name,
                price: data.price,
                image: imageUrl,
                categoryId: data.categoryId,
                sizes: data.sizes.split(",").map(s => s.trim()).filter(Boolean),
                colors: data.colors.split(",").map(c => c.trim()).filter(Boolean),
                isBest: data.isBest,
                isPopular: data.isPopular,
                isSale: data.isSale
            })

            if (response.status === 201 || response.status === 200) {
                toast.success("Product Added Successfully")
                handleUpdateLocalState(response.data.data, "add")
                form.reset()
                setOpen(false)
                removeImage()
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Error Adding Product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-white text-black hover:bg-amber-100 hover:text-black border-b-4 border-t-4">
                    <Plus className="mr-2 h-4 w-4" />Add New Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-black">Add Product</DialogTitle>
                    <DialogDescription className="text-black">Add a new product to inventory.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-2xl space-y-6">
                        
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Product Name</FormLabel>
                                <FormControl><Input {...field} className="text-black bg-white" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Price</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} className="text-black bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <FormItem>
                            <FormLabel className="text-gray-200">Product Image</FormLabel>
                            {!imagePreview ? (
                                <label htmlFor="img" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-400">Upload image (MAX 5MB)</p>
                                    <input 
                                        id="img" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageChange}
                                        disabled={uploading}
                                    />
                                </label>
                            ) : (
                                <div className="relative">
                                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                                    <Button 
                                        type="button" 
                                        variant="destructive" 
                                        size="icon" 
                                        className="absolute top-2 right-2" 
                                        onClick={removeImage}
                                        disabled={uploading}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            {uploading && (
                                <p className="text-sm text-blue-400 mt-2">Uploading image...</p>
                            )}
                            {imageUrl && !uploading && (
                                <p className="text-sm text-green-400 mt-2">✓ Image uploaded</p>
                            )}
                        </FormItem>

                        <FormField control={form.control} name="categoryId" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Category</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl><SelectTrigger className="text-black bg-white"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                    <SelectContent className="bg-white">
                                        {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="sizes" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Sizes</FormLabel>
                                <FormControl><Input {...field} placeholder="S, M, L, XL" className="text-black bg-white" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="colors" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Colors</FormLabel>
                                <FormControl><Input {...field} placeholder="Red, Blue" className="text-black bg-white" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="isBest" render={({ field }) => (
                            <FormItem className="flex items-center justify-between border p-3 rounded">
                                <FormLabel className="text-gray-200">Best Seller</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="isPopular" render={({ field }) => (
                            <FormItem className="flex items-center justify-between border p-3 rounded">
                                <FormLabel className="text-gray-200">Popular</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="isSale" render={({ field }) => (
                            <FormItem className="flex items-center justify-between border p-3 rounded">
                                <FormLabel className="text-gray-200">On Sale</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <Button 
                            type="submit" 
                            className="w-full bg-gray-900 text-white hover:bg-zinc-400 border-2" 
                            disabled={loading || uploading || !imageUrl}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}