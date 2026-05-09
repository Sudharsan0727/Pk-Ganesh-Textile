import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convertToWebp() {
  console.log('Starting WebP conversion...');
  if (!fs.existsSync(assetsDir)) {
    console.error(`Assets directory not found: ${assetsDir}`);
    return;
  }

  const files = getAllFiles(assetsDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png'];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const outputFilePath = file.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
      
      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(outputFilePath);
        
        console.log(`Converted: ${path.basename(file)} -> ${path.basename(outputFilePath)}`);
        
        // Remove the original file
        fs.unlinkSync(file);
        console.log(`Deleted original: ${path.basename(file)}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log('Conversion complete!');
}

convertToWebp();
