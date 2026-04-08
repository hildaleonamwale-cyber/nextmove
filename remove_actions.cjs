const fs = require('fs');

let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

// Regex to match the we-card-actions div and its contents
const regex = /\s*<div className="we-card-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid #F3F4F6', paddingTop: '15px' }}>\s*<button className="we-action-btn" style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', color: '#4B5563', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0\.2s' }} onClick={\(e\) => { e\.stopPropagation\(\); window\.location\.href = 'mailto:agent@example\.com'; }} onMouseOver={\(e\) => e\.currentTarget\.style\.background = '#F9FAFB'} onMouseOut={\(e\) => e\.currentTarget\.style\.background = '#fff'}><i className="fa-regular fa-envelope"><\/i> Email<\/button>\s*<button className="we-action-btn" style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', color: '#4B5563', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0\.2s' }} onClick={\(e\) => { e\.stopPropagation\(\); window\.location\.href = 'tel:\+1234567890'; }} onMouseOver={\(e\) => e\.currentTarget\.style\.background = '#F9FAFB'} onMouseOut={\(e\) => e\.currentTarget\.style\.background = '#fff'}><i className="fa-solid fa-phone"><\/i> Phone<\/button>\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync('src/components/LandingPage.tsx', content);
console.log("Done");
