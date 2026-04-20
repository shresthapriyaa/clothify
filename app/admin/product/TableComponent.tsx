

// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { EditProduct } from "./EditProduct"
// import { DeleteProduct } from "./DeleteProduct"
// import { IProduct } from "./types/types"

// interface ITableProps {
//   products: IProduct[]
//   categories: { id: string; name: string }[]
//   handleUpdateLocalState: (product: IProduct, type: string) => void
// }

// export function TableProducts({ products, categories, handleUpdateLocalState }: ITableProps) {
//   return (
//     <div className=" bg-white text-black w-full  overflow-x-auto  rounded-2xl">
//       <div className="border border-black/20 rounded-lg overflow-auto border-b-4 border-t-4">
//         <Table>
//           <TableHeader>
//             <TableRow className="hover:bg-transparent border-b-2 border-black/10">
//               <TableHead className="w-[100px]font-semibold text- text-left px-4 py-3">ID</TableHead>
//               <TableHead className="text-black px-4 py-3 font-semibold text-left">NAME</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">PRICE</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">CATEGORY</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">SIZES</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">COLORS</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">BEST</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">POPULAR</TableHead>
//               <TableHead className="text-black px-4 py-3 text-left font-semibold">SALE</TableHead>
//               <TableHead className="px-4 py-3 text-right font-semibold text-black">ACTIONS</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products?.map((product) => (
//               <TableRow key={product.id} className="border-b border-black/20 hover:bg-black/10">
//                 <TableCell className="px-4 py-3">{product.id}</TableCell>
//                 <TableCell className="px-4 py-3">{product.name}</TableCell>
//                 <TableCell className="px-4 py-3">${product.price}</TableCell>
//                 <TableCell className="px-4 py-3">{product.category.name}</TableCell>
//                 <TableCell className="px-4 py-3">{product.sizes.join(", ") || "-"}</TableCell>
//                 <TableCell className="px-4 py-3">{product.colors.join(", ") || "-"}</TableCell>
//                 <TableCell className="px-4 py-3">{product.isBest ? "Yes" : "No"}</TableCell>
//                 <TableCell className="px-4 py-3">{product.isPopular ? "Yes" : "No"}</TableCell>
//                 <TableCell className="px-4 py-3">{product.isSale ? "Yes" : "No"}</TableCell>
//                 <TableCell className="px-4 py-3">
//                   <div className="flex gap-2 justify-end ">
//                     <EditProduct 
//                       product={product} 
//                       categories={categories} 
//                       handleUpdateLocalState={handleUpdateLocalState} 
//                     />
//                     <DeleteProduct 
//                       productId={product.id} 
//                       handleUpdateLocalState={handleUpdateLocalState} 
//                     />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }







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
    <div className="bg-white text-black w-full rounded-2xl">
      <div className="border border-black/20 rounded-lg border-b-4 border-t-4 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2 border-black/10">
              <TableHead className="w-[100px] font-semibold text-black text-left px-4 py-3 whitespace-nowrap">ID</TableHead>
              <TableHead className="text-black px-4 py-3 font-semibold text-left whitespace-nowrap">NAME</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">PRICE</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">CATEGORY</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">SIZES</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">COLORS</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">BEST</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">POPULAR</TableHead>
              <TableHead className="text-black px-4 py-3 text-left font-semibold whitespace-nowrap">SALE</TableHead>
              <TableHead className="px-4 py-3 text-right font-semibold text-black whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="border-b border-black/20 hover:bg-black/10">
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.id.slice(0, 8)}...</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.name}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">${product.price}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.category.name}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.sizes.join(", ") || "-"}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.colors.join(", ") || "-"}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.isBest ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.isPopular ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">{product.isSale ? "Yes" : "No"}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2 justify-end">
                    <EditProduct 
                      product={product} 
                      categories={categories} 
                      handleUpdateLocalState={handleUpdateLocalState} 
                    />
                    <DeleteProduct 
                      productId={product.id}
                      productImage={product.image}
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