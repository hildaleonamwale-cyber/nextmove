import fs from 'fs';
import path from 'path';

const oldUrl = 'https://fv5-4.files.fm/thumb_show.php?i=7gmpgc85u8&view&v=1&PHPSESSID=31740d77ad522d95171ececc490ea9401621205d';
const logoUrl = 'https://image2url.com/r2/default/images/1775520731590-8a90e10a-4fd0-496d-96c7-6198caa6955e.png';
const menuUrl = 'https://image2url.com/r2/default/images/1775520819070-397d094c-92e4-4f64-af30-e2881143cc7e.png';

function replaceInFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    if (content.includes(oldUrl)) {
        // First, replace the menu ones specifically
        const menuSearch = `<img src="${oldUrl}" alt="Menu" />`;
        if (content.includes(menuSearch)) {
            content = content.split(menuSearch).join(`<img src="${menuUrl}" alt="Menu" />`);
            modified = true;
        }
        
        // Then replace all remaining instances with the logo URL
        if (content.includes(oldUrl)) {
            content = content.split(oldUrl).join(logoUrl);
            modified = true;
        }
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
