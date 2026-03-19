import fs from 'fs';

const extractCSS = (htmlFile: string, cssFile: string) => {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  if (match && match[1]) {
    fs.writeFileSync(cssFile, match[1].trim());
    console.log(`Extracted CSS to ${cssFile}`);
  } else {
    console.log(`No CSS found in ${htmlFile}`);
  }
};

fs.mkdirSync('src/styles', { recursive: true });
extractCSS('public/dashboard.html', 'src/styles/dashboard.css');
extractCSS('public/profile.html', 'src/styles/profile.css');
