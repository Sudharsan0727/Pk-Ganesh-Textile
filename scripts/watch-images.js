import chokidar from 'chokidar';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../src/assets');

console.log(`Watching for new images in: ${assetsDir}`);

const watcher = chokidar.watch(assetsDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

const imageExtensions = ['.jpg', '.jpeg', '.png'];

watcher.on('add', async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  
  if (imageExtensions.includes(ext)) {
    const outputFilePath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
    
    // Check if webp already exists to avoid infinite loops if the extension logic was different
    if (fs.existsSync(outputFilePath)) return;

    console.log(`New image detected: ${path.basename(filePath)}`);
    
    try {
      // Wait a bit to ensure the file is fully written
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputFilePath);
      
      console.log(`Successfully converted to WebP: ${path.basename(outputFilePath)}`);
      
      // Remove original
      fs.unlinkSync(filePath);
      console.log(`Removed original: ${path.basename(filePath)}`);
    } catch (err) {
      console.error(`Error converting ${filePath}:`, err);
    }
  }
});
