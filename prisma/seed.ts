import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create initial categories
  const menCategory = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: {
      name: 'MEN',
      slug: 'men',
    },
  })

  const womenCategory = await prisma.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: {
      name: 'WOMEN',
      slug: 'women',
    },
  })

  const bagCategory = await prisma.category.upsert({
    where: { slug: 'bag' },
    update: {},
    create: {
      name: 'BAG',
      slug: 'bag',
    },
  })

  console.log('✅ Categories created:', {
    men: menCategory.id,
    women: womenCategory.id,
    bag: bagCategory.id
  })
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })







// // // // // // import { PrismaClient } from '@prisma/client'

// // // // // // const prisma = new PrismaClient()

// // // // // // async function main() {
// // // // // //   console.log('🌱 Starting seed...')

// // // // // //   // Create initial categories
// // // // // //   const menCategory = await prisma.category.upsert({
// // // // // //     where: { slug: 'men' },
// // // // // //     update: {},
// // // // // //     create: {
// // // // // //       name: 'MEN',
// // // // // //       slug: 'men',
// // // // // //     },
// // // // // //   })

// // // // // //   const womenCategory = await prisma.category.upsert({
// // // // // //     where: { slug: 'women' },
// // // // // //     update: {},
// // // // // //     create: {
// // // // // //       name: 'WOMEN',
// // // // // //       slug: 'women',
// // // // // //     },
// // // // // //   })

// // // // // //   const bagCategory = await prisma.category.upsert({
// // // // // //     where: { slug: 'bag' },
// // // // // //     update: {},
// // // // // //     create: {
// // // // // //       name: 'BAG',
// // // // // //       slug: 'bag',
// // // // // //     },
// // // // // //   })

// // // // // //   console.log('✅ Categories created:', {
// // // // // //     men: menCategory.id,
// // // // // //     women: womenCategory.id,
// // // // // //     bag: bagCategory.id
// // // // // //   })

// // // // // //   // Create sample products
// // // // // //   const products = [
// // // // // //     {
// // // // // //       id: 'cmjh7pard0003iqgzbppl4z9h',
// // // // // //       name: 'Classic White T-Shirt',
// // // // // //       description: 'Comfortable cotton t-shirt',
// // // // // //       price: 500,
// // // // // //       imageUrl: '/images/white-tshirt.jpg',
// // // // // //       categoryId: menCategory.id,
// // // // // //       stock: 100,
// // // // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // // // //       colors: ['White', 'Black'],
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'cmjh84j190006iqgzwnr3p8x9',
// // // // // //       name: 'Gray Hoodie',
// // // // // //       description: 'Warm and cozy hoodie',
// // // // // //       price: 1200,
// // // // // //       imageUrl: '/images/gray-hoodie.jpg',
// // // // // //       categoryId: menCategory.id,
// // // // // //       stock: 50,
// // // // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // // // //       colors: ['Gray', 'Black', 'Navy'],
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'cmjh8gzpf0008iqgzr0fjucf5',
// // // // // //       name: 'Leather Bag',
// // // // // //       description: 'Premium leather crossbody bag',
// // // // // //       price: 2500,
// // // // // //       imageUrl: '/images/brown-bag.jpg',
// // // // // //       categoryId: bagCategory.id,
// // // // // //       stock: 30,
// // // // // //       sizes: [],
// // // // // //       colors: ['Brown', 'Black', 'Tan'],
// // // // // //     },
// // // // // //     {
// // // // // //       name: 'Summer Dress',
// // // // // //       description: 'Light and breezy summer dress',
// // // // // //       price: 1500,
// // // // // //       imageUrl: '/images/summer-dress.jpg',
// // // // // //       categoryId: womenCategory.id,
// // // // // //       stock: 40,
// // // // // //       sizes: ['XS', 'S', 'M', 'L'],
// // // // // //       colors: ['Floral', 'Blue', 'White'],
// // // // // //     },
// // // // // //     {
// // // // // //       name: 'Denim Jeans',
// // // // // //       description: 'Classic fit denim jeans',
// // // // // //       price: 1800,
// // // // // //       imageUrl: '/images/denim-jeans.jpg',
// // // // // //       categoryId: menCategory.id,
// // // // // //       stock: 60,
// // // // // //       sizes: ['28', '30', '32', '34', '36'],
// // // // // //       colors: ['Blue', 'Black'],
// // // // // //     },
// // // // // //     {
// // // // // //       name: 'Canvas Tote Bag',
// // // // // //       description: 'Eco-friendly canvas tote',
// // // // // //       price: 800,
// // // // // //       imageUrl: '/images/canvas-tote.jpg',
// // // // // //       categoryId: bagCategory.id,
// // // // // //       stock: 80,
// // // // // //       sizes: [],
// // // // // //       colors: ['Natural', 'Black', 'Navy'],
// // // // // //     },
// // // // // //   ]

// // // // // //   for (const product of products) {
// // // // // //     await prisma.product.upsert({
// // // // // //       where: { id: product.id || 'temp-id-' + product.name },
// // // // // //       update: {},
// // // // // //       create: product,
// // // // // //     })
// // // // // //   }

// // // // // //   console.log(`✅ Created ${products.length} products`)

// // // // // //   // Get all products to display
// // // // // //   const allProducts = await prisma.product.findMany({
// // // // // //     include: {
// // // // // //       category: true,
// // // // // //     },
// // // // // //   })

// // // // // //   console.log('📦 Products in database:')
// // // // // //   allProducts.forEach(product => {
// // // // // //     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
// // // // // //   })

// // // // // //   console.log('\n🎉 Seed completed successfully!')
// // // // // // }

// // // // // // main()
// // // // // //   .catch((e) => {
// // // // // //     console.error('❌ Seed failed:', e)
// // // // // //     process.exit(1)
// // // // // //   })
// // // // // //   .finally(async () => {
// // // // // //     await prisma.$disconnect()
// // // // // //   })






// // // // // import { PrismaClient } from '@prisma/client'

// // // // // const prisma = new PrismaClient()

// // // // // async function main() {
// // // // //   console.log('🌱 Starting seed...')

// // // // //   // Create initial categories
// // // // //   const menCategory = await prisma.category.upsert({
// // // // //     where: { slug: 'men' },
// // // // //     update: {},
// // // // //     create: {
// // // // //       name: 'MEN',
// // // // //       slug: 'men',
// // // // //     },
// // // // //   })

// // // // //   const womenCategory = await prisma.category.upsert({
// // // // //     where: { slug: 'women' },
// // // // //     update: {},
// // // // //     create: {
// // // // //       name: 'WOMEN',
// // // // //       slug: 'women',
// // // // //     },
// // // // //   })

// // // // //   const bagCategory = await prisma.category.upsert({
// // // // //     where: { slug: 'bag' },
// // // // //     update: {},
// // // // //     create: {
// // // // //       name: 'BAG',
// // // // //       slug: 'bag',
// // // // //     },
// // // // //   })

// // // // //   console.log('✅ Categories created:', {
// // // // //     men: menCategory.id,
// // // // //     women: womenCategory.id,
// // // // //     bag: bagCategory.id
// // // // //   })

// // // // //   // Create sample products
// // // // //   const products = [
// // // // //     {
// // // // //       id: 'cmjh7pard0003iqgzbppl4z9h',
// // // // //       name: 'Classic White T-Shirt',
// // // // //       description: 'Comfortable cotton t-shirt',
// // // // //       price: 500,
// // // // //       image: '/images/white-tshirt.jpg',
// // // // //       imageUrl: '/images/white-tshirt.jpg',
// // // // //       categoryId: menCategory.id,
// // // // //       stock: 100,
// // // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // // //       colors: ['White', 'Black'],
// // // // //     },
// // // // //     {
// // // // //       id: 'cmjh84j190006iqgzwnr3p8x9',
// // // // //       name: 'Gray Hoodie',
// // // // //       description: 'Warm and cozy hoodie',
// // // // //       price: 1200,
// // // // //       image: '/images/gray-hoodie.jpg',
// // // // //       imageUrl: '/images/gray-hoodie.jpg',
// // // // //       categoryId: menCategory.id,
// // // // //       stock: 50,
// // // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // // //       colors: ['Gray', 'Black', 'Navy'],
// // // // //     },
// // // // //     {
// // // // //       id: 'cmjh8gzpf0008iqgzr0fjucf5',
// // // // //       name: 'Leather Bag',
// // // // //       description: 'Premium leather crossbody bag',
// // // // //       price: 2500,
// // // // //       image: '/images/brown-bag.jpg',
// // // // //       imageUrl: '/images/brown-bag.jpg',
// // // // //       categoryId: bagCategory.id,
// // // // //       stock: 30,
// // // // //       sizes: [],
// // // // //       colors: ['Brown', 'Black', 'Tan'],
// // // // //     },
// // // // //     {
// // // // //       name: 'Summer Dress',
// // // // //       description: 'Light and breezy summer dress',
// // // // //       price: 1500,
// // // // //       image: '/images/summer-dress.jpg',
// // // // //       imageUrl: '/images/summer-dress.jpg',
// // // // //       categoryId: womenCategory.id,
// // // // //       stock: 40,
// // // // //       sizes: ['XS', 'S', 'M', 'L'],
// // // // //       colors: ['Floral', 'Blue', 'White'],
// // // // //     },
// // // // //     {
// // // // //       name: 'Denim Jeans',
// // // // //       description: 'Classic fit denim jeans',
// // // // //       price: 1800,
// // // // //       image: '/images/denim-jeans.jpg',
// // // // //       imageUrl: '/images/denim-jeans.jpg',
// // // // //       categoryId: menCategory.id,
// // // // //       stock: 60,
// // // // //       sizes: ['28', '30', '32', '34', '36'],
// // // // //       colors: ['Blue', 'Black'],
// // // // //     },
// // // // //     {
// // // // //       name: 'Canvas Tote Bag',
// // // // //       description: 'Eco-friendly canvas tote',
// // // // //       price: 800,
// // // // //       image: '/images/canvas-tote.jpg',
// // // // //       imageUrl: '/images/canvas-tote.jpg',
// // // // //       categoryId: bagCategory.id,
// // // // //       stock: 80,
// // // // //       sizes: [],
// // // // //       colors: ['Natural', 'Black', 'Navy'],
// // // // //     },
// // // // //   ]

// // // // //   for (const product of products) {
// // // // //     const productId = product.id || `temp-${product.name.toLowerCase().replace(/\s+/g, '-')}`
    
// // // // //     await prisma.product.upsert({
// // // // //       where: { id: productId },
// // // // //       update: {},
// // // // //       create: product,
// // // // //     })
// // // // //   }

// // // // //   console.log(`✅ Created ${products.length} products`)

// // // // //   // Get all products to display
// // // // //   const allProducts = await prisma.product.findMany({
// // // // //     include: {
// // // // //       category: true,
// // // // //     },
// // // // //   })

// // // // //   console.log('📦 Products in database:')
// // // // //   allProducts.forEach(product => {
// // // // //     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
// // // // //   })

// // // // //   console.log('\n🎉 Seed completed successfully!')
// // // // // }

// // // // // main()
// // // // //   .catch((e) => {
// // // // //     console.error('❌ Seed failed:', e)
// // // // //     process.exit(1)
// // // // //   })
// // // // //   .finally(async () => {
// // // // //     await prisma.$disconnect()
// // // // //   })





// // // // import { PrismaClient } from '@prisma/client'

// // // // const prisma = new PrismaClient()

// // // // async function main() {
// // // //   console.log('🌱 Starting seed...')

// // // //   // Create initial categories
// // // //   const menCategory = await prisma.category.upsert({
// // // //     where: { slug: 'men' },
// // // //     update: {},
// // // //     create: {
// // // //       name: 'MEN',
// // // //       slug: 'men',
// // // //     },
// // // //   })

// // // //   const womenCategory = await prisma.category.upsert({
// // // //     where: { slug: 'women' },
// // // //     update: {},
// // // //     create: {
// // // //       name: 'WOMEN',
// // // //       slug: 'women',
// // // //     },
// // // //   })

// // // //   const bagCategory = await prisma.category.upsert({
// // // //     where: { slug: 'bag' },
// // // //     update: {},
// // // //     create: {
// // // //       name: 'BAG',
// // // //       slug: 'bag',
// // // //     },
// // // //   })

// // // //   console.log('✅ Categories created:', {
// // // //     men: menCategory.id,
// // // //     women: womenCategory.id,
// // // //     bag: bagCategory.id
// // // //   })

// // // //   // Create sample products
// // // //   const products = [
// // // //     {
// // // //       id: 'cmjh7pard0003iqgzbppl4z9h',
// // // //       name: 'Classic White T-Shirt',
// // // //       price: 500,
// // // //       image: '/images/white-tshirt.jpg',
// // // //       imageUrl: '/images/white-tshirt.jpg',
// // // //       categoryId: menCategory.id,
// // // //       stock: 100,
// // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // //       colors: ['White', 'Black'],
// // // //       isBest: true,
// // // //       isPopular: true,
// // // //       isSale: false,
// // // //     },
// // // //     {
// // // //       id: 'cmjh84j190006iqgzwnr3p8x9',
// // // //       name: 'Gray Hoodie',
// // // //       price: 1200,
// // // //       image: '/images/gray-hoodie.jpg',
// // // //       imageUrl: '/images/gray-hoodie.jpg',
// // // //       categoryId: menCategory.id,
// // // //       stock: 50,
// // // //       sizes: ['S', 'M', 'L', 'XL'],
// // // //       colors: ['Gray', 'Black', 'Navy'],
// // // //       isBest: false,
// // // //       isPopular: true,
// // // //       isSale: false,
// // // //     },
// // // //     {
// // // //       id: 'cmjh8gzpf0008iqgzr0fjucf5',
// // // //       name: 'Leather Bag',
// // // //       price: 2500,
// // // //       image: '/images/brown-bag.jpg',
// // // //       imageUrl: '/images/brown-bag.jpg',
// // // //       categoryId: bagCategory.id,
// // // //       stock: 30,
// // // //       sizes: [],
// // // //       colors: ['Brown', 'Black', 'Tan'],
// // // //       isBest: true,
// // // //       isPopular: false,
// // // //       isSale: false,
// // // //     },
// // // //     {
// // // //       name: 'Summer Dress',
// // // //       price: 1500,
// // // //       image: '/images/summer-dress.jpg',
// // // //       imageUrl: '/images/summer-dress.jpg',
// // // //       categoryId: womenCategory.id,
// // // //       stock: 40,
// // // //       sizes: ['XS', 'S', 'M', 'L'],
// // // //       colors: ['Floral', 'Blue', 'White'],
// // // //       isBest: false,
// // // //       isPopular: true,
// // // //       isSale: true,
// // // //     },
// // // //     {
// // // //       name: 'Denim Jeans',
// // // //       price: 1800,
// // // //       image: '/images/denim-jeans.jpg',
// // // //       imageUrl: '/images/denim-jeans.jpg',
// // // //       categoryId: menCategory.id,
// // // //       stock: 60,
// // // //       sizes: ['28', '30', '32', '34', '36'],
// // // //       colors: ['Blue', 'Black'],
// // // //       isBest: false,
// // // //       isPopular: false,
// // // //       isSale: false,
// // // //     },
// // // //     {
// // // //       name: 'Canvas Tote Bag',
// // // //       price: 800,
// // // //       image: '/images/canvas-tote.jpg',
// // // //       imageUrl: '/images/canvas-tote.jpg',
// // // //       categoryId: bagCategory.id,
// // // //       stock: 80,
// // // //       sizes: [],
// // // //       colors: ['Natural', 'Black', 'Navy'],
// // // //       isBest: false,
// // // //       isPopular: true,
// // // //       isSale: true,
// // // //     },
// // // //   ]

// // // //   for (const product of products) {
// // // //     const productId = product.id || `temp-${product.name.toLowerCase().replace(/\s+/g, '-')}`
    
// // // //     await prisma.product.upsert({
// // // //       where: { id: productId },
// // // //       update: {},
// // // //       create: product,
// // // //     })
// // // //   }

// // // //   console.log(`✅ Created ${products.length} products`)

// // // //   // Get all products to display
// // // //   const allProducts = await prisma.product.findMany({
// // // //     include: {
// // // //       category: true,
// // // //     },
// // // //   })

// // // //   console.log('📦 Products in database:')
// // // //   allProducts.forEach(product => {
// // // //     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
// // // //   })

// // // //   console.log('\n🎉 Seed completed successfully!')
// // // // }

// // // // main()
// // // //   .catch((e) => {
// // // //     console.error('❌ Seed failed:', e)
// // // //     process.exit(1)
// // // //   })
// // // //   .finally(async () => {
// // // //     await prisma.$disconnect()
// // // //   })








// // // import { PrismaClient } from '@prisma/client'

// // // const prisma = new PrismaClient()

// // // async function main() {
// // //   console.log('🌱 Starting seed...')

// // //   // Create initial categories
// // //   const menCategory = await prisma.category.upsert({
// // //     where: { slug: 'men' },
// // //     update: {},
// // //     create: {
// // //       name: 'MEN',
// // //       slug: 'men',
// // //     },
// // //   })

// // //   const womenCategory = await prisma.category.upsert({
// // //     where: { slug: 'women' },
// // //     update: {},
// // //     create: {
// // //       name: 'WOMEN',
// // //       slug: 'women',
// // //     },
// // //   })

// // //   const bagCategory = await prisma.category.upsert({
// // //     where: { slug: 'bag' },
// // //     update: {},
// // //     create: {
// // //       name: 'BAG',
// // //       slug: 'bag',
// // //     },
// // //   })

// // //   console.log('✅ Categories created:', {
// // //     men: menCategory.id,
// // //     women: womenCategory.id,
// // //     bag: bagCategory.id
// // //   })

// // //   // Create sample products with the exact fields from your schema
// // //   const products = [
// // //     {
// // //       id: 'cmjh7pard0003iqgzbppl4z9h',
// // //       name: 'Classic White T-Shirt',
// // //       price: 500,
// // //       image: '/images/white-tshirt.jpg',
// // //       categoryId: menCategory.id,
// // //       sizes: ['S', 'M', 'L', 'XL'],
// // //       colors: ['White', 'Black'],
// // //       isBest: true,
// // //       isPopular: true,
// // //       isSale: false,
// // //     },
// // //     {
// // //       id: 'cmjh84j190006iqgzwnr3p8x9',
// // //       name: 'Gray Hoodie',
// // //       price: 1200,
// // //       image: '/images/gray-hoodie.jpg',
// // //       categoryId: menCategory.id,
// // //       sizes: ['S', 'M', 'L', 'XL'],
// // //       colors: ['Gray', 'Black', 'Navy'],
// // //       isBest: false,
// // //       isPopular: true,
// // //       isSale: false,
// // //     },
// // //     {
// // //       id: 'cmjh8gzpf0008iqgzr0fjucf5',
// // //       name: 'Leather Bag',
// // //       price: 2500,
// // //       image: '/images/brown-bag.jpg',
// // //       categoryId: bagCategory.id,
// // //       sizes: [],
// // //       colors: ['Brown', 'Black', 'Tan'],
// // //       isBest: true,
// // //       isPopular: false,
// // //       isSale: false,
// // //     },
// // //     {
// // //       name: 'Summer Dress',
// // //       price: 1500,
// // //       image: '/images/summer-dress.jpg',
// // //       categoryId: womenCategory.id,
// // //       sizes: ['XS', 'S', 'M', 'L'],
// // //       colors: ['Floral', 'Blue', 'White'],
// // //       isBest: false,
// // //       isPopular: true,
// // //       isSale: true,
// // //     },
// // //     {
// // //       name: 'Denim Jeans',
// // //       price: 1800,
// // //       image: '/images/denim-jeans.jpg',
// // //       categoryId: menCategory.id,
// // //       sizes: ['28', '30', '32', '34', '36'],
// // //       colors: ['Blue', 'Black'],
// // //       isBest: false,
// // //       isPopular: false,
// // //       isSale: false,
// // //     },
// // //     {
// // //       name: 'Canvas Tote Bag',
// // //       price: 800,
// // //       image: '/images/canvas-tote.jpg',
// // //       categoryId: bagCategory.id,
// // //       sizes: [],
// // //       colors: ['Natural', 'Black', 'Navy'],
// // //       isBest: false,
// // //       isPopular: true,
// // //       isSale: true,
// // //     },
// // //   ]

// // //   for (const product of products) {
// // //     const productId = product.id || `temp-${product.name.toLowerCase().replace(/\s+/g, '-')}`
    
// // //     await prisma.product.upsert({
// // //       where: { id: productId },
// // //       update: {},
// // //       create: product,
// // //     })
// // //   }

// // //   console.log(`✅ Created ${products.length} products`)

// // //   // Get all products to display
// // //   const allProducts = await prisma.product.findMany({
// // //     include: {
// // //       category: true,
// // //     },
// // //   })

// // //   console.log('📦 Products in database:')
// // //   allProducts.forEach(product => {
// // //     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
// // //   })

// // //   console.log('\n🎉 Seed completed successfully!')
// // // }

// // // main()
// // //   .catch((e) => {
// // //     console.error('❌ Seed failed:', e)
// // //     process.exit(1)
// // //   })
// // //   .finally(async () => {
// // //     await prisma.$disconnect()
// // //   })







// // import { PrismaClient } from '@prisma/client'

// // const prisma = new PrismaClient()

// // async function main() {
// //   console.log('🌱 Starting seed...')

// //   // Create initial categories
// //   const menCategory = await prisma.category.upsert({
// //     where: { slug: 'men' },
// //     update: {},
// //     create: {
// //       name: 'MEN',
// //       slug: 'men',
// //     },
// //   })

// //   const womenCategory = await prisma.category.upsert({
// //     where: { slug: 'women' },
// //     update: {},
// //     create: {
// //       name: 'WOMEN',
// //       slug: 'women',
// //     },
// //   })

// //   const bagCategory = await prisma.category.upsert({
// //     where: { slug: 'bag' },
// //     update: {},
// //     create: {
// //       name: 'BAG',
// //       slug: 'bag',
// //     },
// //   })

// //   console.log('✅ Categories created:', {
// //     men: menCategory.id,
// //     women: womenCategory.id,
// //     bag: bagCategory.id
// //   })

// //   // Create sample products with Unsplash images
// //   const products = [
// //     {
// //       id: 'cmjh7pard0003iqgzbppl4z9h',
// //       name: 'Classic White T-Shirt',
// //       price: 500,
// //       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
// //       categoryId: menCategory.id,
// //       sizes: ['S', 'M', 'L', 'XL'],
// //       colors: ['White', 'Black'],
// //       isBest: true,
// //       isPopular: true,
// //       isSale: false,
// //     },
// //     {
// //       id: 'cmjh84j190006iqgzwnr3p8x9',
// //       name: 'Gray Hoodie',
// //       price: 1200,
// //       image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
// //       categoryId: menCategory.id,
// //       sizes: ['S', 'M', 'L', 'XL'],
// //       colors: ['Gray', 'Black', 'Navy'],
// //       isBest: false,
// //       isPopular: true,
// //       isSale: false,
// //     },
// //     {
// //       id: 'cmjh8gzpf0008iqgzr0fjucf5',
// //       name: 'Leather Bag',
// //       price: 2500,
// //       image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
// //       categoryId: bagCategory.id,
// //       sizes: [],
// //       colors: ['Brown', 'Black', 'Tan'],
// //       isBest: true,
// //       isPopular: false,
// //       isSale: false,
// //     },
// //     {
// //       name: 'Summer Dress',
// //       price: 1500,
// //       image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
// //       categoryId: womenCategory.id,
// //       sizes: ['XS', 'S', 'M', 'L'],
// //       colors: ['Floral', 'Blue', 'White'],
// //       isBest: false,
// //       isPopular: true,
// //       isSale: true,
// //     },
// //     {
// //       name: 'Denim Jeans',
// //       price: 1800,
// //       image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
// //       categoryId: menCategory.id,
// //       sizes: ['28', '30', '32', '34', '36'],
// //       colors: ['Blue', 'Black'],
// //       isBest: false,
// //       isPopular: false,
// //       isSale: false,
// //     },
// //     {
// //       name: 'Canvas Tote Bag',
// //       price: 800,
// //       image: 'https://images.unsplash.com/photo-1590393190980-195d40b310f5?w=500&q=80',
// //       categoryId: bagCategory.id,
// //       sizes: [],
// //       colors: ['Natural', 'Black', 'Navy'],
// //       isBest: false,
// //       isPopular: true,
// //       isSale: true,
// //     },
// //   ]

// //   for (const product of products) {
// //     const productId = product.id || `temp-${product.name.toLowerCase().replace(/\s+/g, '-')}`
    
// //     await prisma.product.upsert({
// //       where: { id: productId },
// //       update: {
// //         name: product.name,
// //         price: product.price,
// //         image: product.image,
// //         categoryId: product.categoryId,
// //         sizes: product.sizes,
// //         colors: product.colors,
// //         isBest: product.isBest,
// //         isPopular: product.isPopular,
// //         isSale: product.isSale,
// //       },
// //       create: product,
// //     })
// //   }

// //   console.log(`✅ Created ${products.length} products`)

// //   // Get all products to display
// //   const allProducts = await prisma.product.findMany({
// //     include: {
// //       category: true,
// //     },
// //   })

// //   console.log('📦 Products in database:')
// //   allProducts.forEach(product => {
// //     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
// //   })

// //   console.log('\n🎉 Seed completed successfully!')
// // }

// // main()
// //   .catch((e) => {
// //     console.error('❌ Seed failed:', e)
// //     process.exit(1)
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect()
// //   })








// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   console.log('🌱 Starting seed...')

//   // Create initial categories
//   const menCategory = await prisma.category.upsert({
//     where: { slug: 'men' },
//     update: {},
//     create: {
//       name: 'MEN',
//       slug: 'men',
//     },
//   })

//   const womenCategory = await prisma.category.upsert({
//     where: { slug: 'women' },
//     update: {},
//     create: {
//       name: 'WOMEN',
//       slug: 'women',
//     },
//   })

//   const bagCategory = await prisma.category.upsert({
//     where: { slug: 'bag' },
//     update: {},
//     create: {
//       name: 'BAG',
//       slug: 'bag',
//     },
//   })

//   console.log('✅ Categories created:', {
//     men: menCategory.id,
//     women: womenCategory.id,
//     bag: bagCategory.id
//   })

//   // Create sample products with placeholder images
//   // These will be replaced when you upload real images through admin
//   const products = [
//     {
//       id: 'cmjh7pard0003iqgzbppl4z9h',
//       name: 'Classic White T-Shirt',
//       price: 500,
//       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
//       categoryId: menCategory.id,
//       sizes: ['S', 'M', 'L', 'XL'],
//       colors: ['White', 'Black'],
//       isBest: true,
//       isPopular: true,
//       isSale: false,
//     },
//     {
//       id: 'cmjh84j190006iqgzwnr3p8x9',
//       name: 'Gray Hoodie',
//       price: 1200,
//       image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
//       categoryId: menCategory.id,
//       sizes: ['S', 'M', 'L', 'XL'],
//       colors: ['Gray', 'Black', 'Navy'],
//       isBest: false,
//       isPopular: true,
//       isSale: false,
//     },
//     {
//       id: 'cmjh8gzpf0008iqgzr0fjucf5',
//       name: 'Leather Bag',
//       price: 2500,
//       image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
//       categoryId: bagCategory.id,
//       sizes: [],
//       colors: ['Brown', 'Black', 'Tan'],
//       isBest: true,
//       isPopular: false,
//       isSale: false,
//     },
//     {
//       name: 'Summer Dress',
//       price: 1500,
//       image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
//       categoryId: womenCategory.id,
//       sizes: ['XS', 'S', 'M', 'L'],
//       colors: ['Floral', 'Blue', 'White'],
//       isBest: false,
//       isPopular: true,
//       isSale: true,
//     },
//     {
//       name: 'Denim Jeans',
//       price: 1800,
//       image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
//       categoryId: menCategory.id,
//       sizes: ['28', '30', '32', '34', '36'],
//       colors: ['Blue', 'Black'],
//       isBest: false,
//       isPopular: false,
//       isSale: false,
//     },
//     {
//       name: 'Canvas Tote Bag',
//       price: 800,
//       image: 'https://images.unsplash.com/photo-1590393190980-195d40b310f5?w=500&q=80',
//       categoryId: bagCategory.id,
//       sizes: [],
//       colors: ['Natural', 'Black', 'Navy'],
//       isBest: false,
//       isPopular: true,
//       isSale: true,
//     },
//   ]

//   for (const product of products) {
//     const productId = product.id || `temp-${product.name.toLowerCase().replace(/\s+/g, '-')}`
    
//     await prisma.product.upsert({
//       where: { id: productId },
//       update: {
//         image: product.image, // Update image URL
//       },
//       create: product,
//     })
//   }

//   console.log(`✅ Created ${products.length} products`)
//   console.log('📝 Note: These products have placeholder images from Unsplash.')
//   console.log('   Upload real images through your admin panel to replace them.')

//   // Get all products to display
//   const allProducts = await prisma.product.findMany({
//     include: {
//       category: true,
//     },
//   })

//   console.log('\n📦 Products in database:')
//   allProducts.forEach(product => {
//     console.log(`  - ${product.name} (${product.id}) - $${product.price} - ${product.category.name}`)
//   })

//   console.log('\n🎉 Seed completed successfully!')
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seed failed:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })