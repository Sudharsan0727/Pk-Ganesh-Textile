const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importDatabase() {
  const backupFile = process.argv[2];
  
  if (!backupFile) {
    console.error('❌ Please specify the backup file: node import-db.js <filename>');
    process.exit(1);
  }

  console.log(`🚀 Starting Database Import from: ${backupFile}...`);
  
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '..', backupFile), 'utf8');
    const categories = JSON.parse(rawData);

    console.log('🧹 Clearing existing data for a clean import...');
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    let totalProducts = 0;

    for (const cat of categories) {
      const newCategory = await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          image: cat.image
        }
      });

      if (cat.products && cat.products.length > 0) {
        for (const prod of cat.products) {
          await prisma.product.create({
            data: {
              name: prod.name,
              brand: prod.brand,
              price: prod.price,
              description: prod.description,
              image: prod.image,
              subCategory: prod.subCategory,
              categoryId: newCategory.id
            }
          });
          totalProducts++;
        }
      }
    }

    console.log('✅ Import Successful!');
    console.log(`Restored Categories: ${categories.length}`);
    console.log(`Restored Products: ${totalProducts}`);

  } catch (error) {
    console.error('❌ Import Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importDatabase();
