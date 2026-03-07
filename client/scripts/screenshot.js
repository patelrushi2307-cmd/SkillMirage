import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'public/images');

// Ensure directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log('Starting Puppeteer...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  
  // Set fake local storage to bypass auth if needed in typical apps
  // But wait, our app uses a `ProtectedRoute` component linking to `useAuth()`.
  // The simplest way to capture the dashboard without modifying App.tsx 
  // is to inject the required auth state or temporarily modify the route in code.
  
  // Actually, we can just navigate to the dashboard, and if it redirects,
  // we first modify App.tsx temporarily, take screenshots, and restore.

  console.log('Navigating to dashboard...');
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle0' });

  console.log('Taking screenshot of Layer 1 Dashboard...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'dashboard-main.png') });

  // Click Reskilling Tab
  console.log('Switching to Reskilling View...');
  const tabs = await page.$$('button[role="tab"]');
  if (tabs.length > 1) {
    await tabs[1].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'dashboard-reskilling.png') });
  }

  // Click Job Market
  console.log('Switching to Job Market View...');
  if (tabs.length > 2) {
    await tabs[2].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'dashboard-market.png') });
  }

  await browser.close();
  console.log('Screenshots saved to public/images/');
}

capture().catch(console.error);
