const fs = require('fs');

const html = fs.readFileSync('./public/glade.html', 'utf8');

// Extract CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1] : '';
fs.mkdirSync('./src/components/glade', { recursive: true });
fs.writeFileSync('./src/components/glade/GladeDashboard.css', css);

// Extract HTML body
let bodyMatch = html.match(/<div class="nm-dash-wrapper" id="dashWrapper">([\s\S]*?)<\/script>/);
let body = bodyMatch ? `<div className="nm-dash-wrapper" id="dashWrapper">${bodyMatch[1]}` : '';

// Convert HTML to JSX
body = body.replace(/class=/g, 'className=');
body = body.replace(/onclick="([^"]*)"/g, (match, p1) => {
    return `onClick={() => { /* ${p1} */ }}`;
});
body = body.replace(/onchange="([^"]*)"/g, (match, p1) => {
    return `onChange={() => { /* ${p1} */ }}`;
});
body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = {};
    p1.split(';').forEach(rule => {
        if (!rule.trim()) return;
        const [key, value] = rule.split(':');
        if (key && value) {
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[camelKey] = value.trim();
        }
    });
    return `style={${JSON.stringify(styleObj)}}`;
});
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
body = body.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
body = body.replace(/<img([^>]*[^\/])>/g, '<img$1 />');

const component = `
import React, { useState, useEffect } from 'react';
import './GladeDashboard.css';

export default function GladeDashboard() {
    const [activeTab, setActiveTab] = useState('cms');
    const [sidebarActive, setSidebarActive] = useState(false);
    const [notifActive, setNotifActive] = useState(false);

    const switchTab = (tab: string) => {
        setActiveTab(tab);
        setSidebarActive(false);
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const toggleNotifications = (e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifActive(!notifActive);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (notifActive && !target.closest('.nm-notification-popover') && !target.closest('.nm-notif-wrap')) {
                setNotifActive(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [notifActive]);

    return (
        <>
            ${body}
        </>
    );
}
`;

fs.writeFileSync('./src/components/glade/GladeDashboard.tsx', component);
console.log('Done');
