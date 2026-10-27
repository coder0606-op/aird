import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function syncUserAssets() {
  const srcDir = 'C:\\Users\\hario\\.gemini\\antigravity-ide\\brain\\61da740a-4119-4c70-961d-334eabc3a9cd\\.user_uploaded';
  const cardsDestDir = path.resolve(__dirname, 'public/assets/cards');
  const assetsDestDir = path.resolve(__dirname, 'public/assets');

  if (!fs.existsSync(cardsDestDir)) {
    fs.mkdirSync(cardsDestDir, { recursive: true });
  }

  const copyList = [
    { src: 'media_1793031003774.jpg', dest: path.join(cardsDestDir, 'card1.jpg') },
    { src: 'media_1793031003774.jpg', dest: path.join(cardsDestDir, 'card1.png') },
    { src: 'media_1793031031805.jpg', dest: path.join(cardsDestDir, 'card2.jpg') },
    { src: 'media_1793031031829.jpg', dest: path.join(cardsDestDir, 'card3.jpg') },
    { src: 'media_1793031031890.jpg', dest: path.join(cardsDestDir, 'card4.jpg') },
    { src: 'media_1793031031906.jpg', dest: path.join(cardsDestDir, 'card5.jpg') },
    { src: 'media_1793032073093.jpg', dest: path.join(cardsDestDir, 'card6.jpg') },
    { src: 'media_1793032073093.jpg', dest: path.join(cardsDestDir, 'card6.png') },
    { src: 'media_1793030483455.jpg', dest: path.join(assetsDestDir, 'air-dream-logo.jpg') },
    { src: 'media_1793030483455.jpg', dest: path.join(assetsDestDir, 'air-dream-badge.jpg') }
  ];

  copyList.forEach(({ src, dest }) => {
    const fullSrc = path.join(srcDir, src);
    try {
      if (fs.existsSync(fullSrc)) {
        fs.copyFileSync(fullSrc, dest);
        console.log(`[Vite Assets] Synced ${src} -> ${path.basename(dest)}`);
      }
    } catch (e) {
      console.warn(`[Vite Assets] Notice: Could not sync ${src}:`, e.message);
    }
  });
}

// Sync on configuration evaluation
try {
  syncUserAssets();
} catch (e) {
  // Ignore if path not found
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sync-user-assets-plugin',
      buildStart() {
        syncUserAssets();
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
