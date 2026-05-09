const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Define categories (based on products.js)
  const categoriesData = [
    { name: "White Shirt", slug: "white-shirts" },
    { name: "Saree", slug: "sarees" },
    { name: "Chuditha", slug: "chudithas" },
    { name: "Night Suit", slug: "night-suits" },
    { name: "Baby Gift Items", slug: "baby-gift-items" },
    { name: "Dhothi", slug: "dhothis" },
    { name: "Lungi Collections", slug: "lungi-collections" },
    { name: "Innerwear", slug: "innerwear" },
    { name: "Floor Mats", slug: "floor-mats" },
    { name: "Towels", slug: "towels" },
    { name: "Katchi Maflers", slug: "katchi-maflers" }
  ];

  console.log('Seeding categories...');
  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
