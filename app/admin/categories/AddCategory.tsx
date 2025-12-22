
"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import { Plus } from "lucide-react"
import { ICategory } from "./types/types"

interface IAddCategoryProps {
  handleUpdateLocalState: (category: ICategory, type: string) => void
}

export function AddCategory({ handleUpdateLocalState }: IAddCategoryProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter category name")
      return
    }

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters")
      return
    }

    setLoading(true)
    try {
      const payload = { name: name.trim() }
      console.log("Submitting category:", payload)

      const response = await axios.post("/api/categories", payload)
      if (response.status === 201 || response.status === 200) {
        toast.success("Category added successfully!")
        handleUpdateLocalState(response.data.data, "add")

        setName("")
        setOpen(false)
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error || "Error adding category"
      toast.error(errorMsg)
      console.error("Error creating category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-b-4 border-t-4 bg-black text-white hover:bg-amber-100">
          <Plus className="h-4 w-4" />
          Add New Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="category-name" className="text-sm font-medium mb-2">
              Category Name *
            </label>
            <Input
              id="category-name"
              placeholder="e.g., Men, Women, Accessories"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding Category..." : "Add Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
