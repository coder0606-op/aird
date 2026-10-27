const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\hario\\.gemini\\antigravity-ide\\brain\\61da740a-4119-4c70-961d-334eabc3a9cd\\.user_uploaded';
const cardsDestDir = path.join(__dirname, 'client', 'public', 'assets', 'cards');
const assetsDestDir = path.join(__dirname, 'client', 'public', 'assets');

if (!fs.existsSync(cardsDestDir)) {
  fs.mkdirSync(cardsDestDir, { recursive: true });
}

const copyList = [
  { src: 'media_1793031003774.jpg', destDir: cardsDestDir, destName: 'card1.jpg' },
  { src: 'media_1793031003774.jpg', destDir: cardsDestDir, destName: 'card1.png' },
  { src: 'media_1793031031805.jpg', destDir: cardsDestDir, destName: 'card2.jpg' },
  { src: 'media_1793031031829.jpg', destDir: cardsDestDir, destName: 'card3.jpg' },
  { src: 'media_1793031031890.jpg', destDir: cardsDestDir, destName: 'card4.jpg' },
  { src: 'media_1793031031906.jpg', destDir: cardsDestDir, destName: 'card5.jpg' },
  { src: 'media_1793032073093.jpg', destDir: cardsDestDir, destName: 'card6.jpg' },
  { src: 'media_1793032073093.jpg', destDir: cardsDestDir, destName: 'card6.png' },
  { src: 'media_1793030483455.jpg', destDir: assetsDestDir, destName: 'air-dream-logo.jpg' },
  { src: 'media_1793030483455.jpg', destDir: assetsDestDir, destName: 'air-dream-badge.jpg' }
];

copyList.forEach(item => {
  const srcPath = path.join(srcDir, item.src);
  const destPath = path.join(item.destDir, item.destName);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`[Copied] ${item.src} -> ${item.destName}`);
    } else {
      console.warn(`[Warning] Source file not found: ${srcPath}`);
    }
  } catch (err) {
    console.error(`[Error copying ${item.destName}]`, err.message);
  }
});
