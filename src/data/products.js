// Dynamic product data generation from assets
const allImages = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });


// Category List with Folder Mapping (Grouped as per user request)
const categoriesRaw = [
  { id: 1, name: "White Shirt", slug: "white-shirts", folders: ["White Shirts"] },
  { id: 2, name: "Saree", slug: "sarees", folders: ["Amber Saree", "Banarasi Sarees", "Linen Sarees", "Pattu Sarees", "cotton sarees", "Sungudi Sarees", "Fancy Type sarees", "Grape Sarees", "Poonam Sarees", "Voil Sarees", "Sarees"] },
  { id: 3, name: "Chuditha", slug: "chudithas", folders: ["Readymade Chudithar"] },
  { id: 4, name: "Night Suit", slug: "night-suits", folders: ["Night Suit"] },
  { id: 5, name: "Baby Gift Items", slug: "baby-gift-items", folders: ["Baby Gift Items"] },
  { id: 6, name: "Dhothi", slug: "dhothis", folders: ["Colour Dhothi", "Iyer Dhothies"] },
  { id: 7, name: "Lungi Collections", slug: "lungi-collections", folders: ["Lungi Collections"] },
  { id: 8, name: "Innerwear", slug: "innerwear", folders: ["Inskirt"] },
  { id: 9, name: "Floor Mats", slug: "floor-mats", folders: ["Floor Mate"] },
  { id: 10, name: "Towels", slug: "towels", folders: ["Sholapur Towel"] },
  { id: 11, name: "Katchi Maflers", slug: "katchi-maflers", folders: ["Katchi Maflers"] }
];

// Helper to filter images by category folders
const getImagesByCategory = (folders) => {
  return Object.keys(allImages)
    .filter(path => folders.some(folder => path.includes(`/assets/${folder}/`)))
    .map(path => allImages[path]);
};

export const categories = categoriesRaw.map(cat => {
  const imgs = getImagesByCategory(cat.folders);
  return {
    ...cat,
    image: imgs.length > 0 ? imgs[0] : "/images/cat_shirts.png"
  };
});

// Generate Products dynamically from all images in the folders
const generatedProducts = [];
let productIdCounter = 1000;

categoriesRaw.forEach(cat => {
  cat.folders.forEach(folder => {
    const folderImages = Object.keys(allImages)
      .filter(path => path.includes(`/assets/${folder}/`))
      .map(path => allImages[path]);

    folderImages.forEach((img, index) => {
      generatedProducts.push({
        id: productIdCounter++,
        name: `${cat.name} Style ${index + 1}`,
        brand: "P.K. Ganesh Tex",
        price: "Request Price on WhatsApp",
        category: cat.name,
        subCategory: folder, // Store the specific folder name
        image: img,
        description: `Premium quality ${cat.name} from P.K. Ganesh Tex. Authentic material and traditional designs sourced directly for wholesale in Madurai.`
      });
    });
  });
});

export const products = generatedProducts;
