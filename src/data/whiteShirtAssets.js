const whiteShirtImages = import.meta.glob('../assets/White Shirts/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

export const whiteShirtAssets = Object.values(whiteShirtImages);
