import fs from 'fs';
import path from 'path';

const oldUrl1 = 'https://willowandelm.co.zw/wp-content/uploads/2026/03/nextmove.-5.png.png';
const oldUrl2 = 'https://willowandelm.co.zw/wp-content/uploads/2026/01/nextmove.zip-17.png';
const newUrl = 'https://fv5-4.files.fm/thumb_show.php?i=7gmpgc85u8&view&v=1&PHPSESSID=31740d77ad522d95171ececc490ea9401621205d';

function replaceInFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    if (content.includes(oldUrl1)) {
        content = content.split(oldUrl1).join(newUrl);
        modified = true;
    }
    if (content.includes(oldUrl2)) {
        content = content.split(oldUrl2).join(newUrl);
        modified = true;
    }
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir('./src');
