const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportDatabase() {
  console.log('🚀 Starting Database Export...');
  
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `db_backup_${timestamp}.json`;
    const filepath = path.join(__dirname, '..', filename);

    fs.writeFileSync(filepath, JSON.stringify(categories, null, 2));

    console.log('✅ Export Successful!');
    console.log(`Saved to: ${filename}`);
    console.log(`Total Categories: ${categories.length}`);
    console.log(`Total Products: ${categories.reduce((acc, cat) => acc + cat.products.length, 0)}`);

  } catch (error) {
    console.error('❌ Export Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportDatabase();
