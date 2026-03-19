const fs = require('fs');
const path = require('path');

function scaleFontSizes(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scaleFontSizes(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      content = content.replace(/font-size:\s*(\d+)px/g, (match, p1) => {
        const size = parseInt(p1, 10);
        // Scale down by ~15% and round
        let newSize = Math.round(size * 0.85);
        // Don't go below 10px
        if (newSize < 10) newSize = Math.max(10, size - 1);
        changed = true;
        return `font-size: ${newSize}px`;
      });
      
      // Also handle clamp(min, val, max) for font-size
      content = content.replace(/font-size:\s*clamp\((\d+)px,\s*([^,]+),\s*(\d+)px\)/g, (match, p1, p2, p3) => {
        const min = Math.round(parseInt(p1, 10) * 0.85);
        const max = Math.round(parseInt(p3, 10) * 0.85);
        changed = true;
        return `font-size: clamp(${min}px, ${p2}, ${max}px)`;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

scaleFontSizes(path.join(__dirname, 'src'));
