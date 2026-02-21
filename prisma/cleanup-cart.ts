import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up orphaned cart items...')

  // Get all cart items
  const cartItems = await prisma.cartItem.findMany()
  
  let deletedCount = 0
  
  for (const item of cartItems) {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    })
    
    if (!product) {
      console.log(`❌ Deleting orphaned cart item: ${item.id} (product: ${item.productId})`)
      await prisma.cartItem.delete({
        where: { id: item.id }
      })
      deletedCount++
    }
  }
  
  console.log(`✅ Cleaned up ${deletedCount} orphaned cart items`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())