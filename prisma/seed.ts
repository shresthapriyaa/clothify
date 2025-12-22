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