

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

import { EditProduct } from "./EditProduct"
import { DeleteProduct } from "./DeleteProduct"
import { IProduct } from "./types/types"

interface ITableProps {
  products: IProduct[]
  categories: { id: string; name: string }[]
  handleUpdateLocalState: (product: IProduct, type: string) => void
}

export function TableProducts({ products, categories, handleUpdateLocalState }: ITableProps) {
  return (
    <div className="p-8 min-h-screen bg-black text-white w-full border-b-4 border-t-4  rounded-2xl">
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2 border-gray-700">
              <TableHead className="w-[100px] font-semibold text-white text-left px-4 py-3">ID</TableHead>
              <TableHead className="text-white px-4 py-3 font-semibold text-left">NAME</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">PRICE</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">CATEGORY</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">SIZES</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">COLORS</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">BEST</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">POPULAR</TableHead>
              <TableHead className="text-white px-4 py-3 text-left font-semibold">SALE</TableHead>
              <TableHead className="px-4 py-3 text-right font-semibold text-white">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="border-b border-gray-800 hover:bg-gray-900">
                <TableCell className="px-4 py-3">{product.id}</TableCell>
                <TableCell className="px-4 py-3">{product.name}</TableCell>
                <TableCell className="px-4 py-3">${product.price}</TableCell>
                <TableCell className="px-4 py-3">{product.category.name}</TableCell>
                <TableCell className="px-4 py-3">{product.sizes.join(", ") || "-"}</TableCell>
                <TableCell className="px-4 py-3">{product.colors.join(", ") || "-"}</TableCell>
                <TableCell className="px-4 py-3">{product.isBest ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3">{product.isPopular ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3">{product.isSale ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <EditProduct 
                      product={product} 
                      categories={categories} 
                      handleUpdateLocalState={handleUpdateLocalState} 
                    />
                    <DeleteProduct 
                      productId={product.id} 
                      handleUpdateLocalState={handleUpdateLocalState} 
                    />
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