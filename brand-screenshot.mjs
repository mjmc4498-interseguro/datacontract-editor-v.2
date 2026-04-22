import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();
page.on('console', m => { if (m.type() === 'error') console.error('[page err]', m.text()); });
await page.goto('http://127.0.0.1:9090/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/brand-screenshots/home.png', fullPage: false });

// Sample computed brand colors from live DOM
const probe = await page.evaluate(() => {
  const c = getComputedStyle(document.documentElement);
  return {
    indigo500:  c.getPropertyValue('--color-indigo-500').trim(),
    indigo600:  c.getPropertyValue('--color-indigo-600').trim(),
    indigo700:  c.getPropertyValue('--color-indigo-700').trim(),
    isblue600:  c.getPropertyValue('--color-isblue-600').trim(),
    brandPrim:  c.getPropertyValue('--color-brand-primary').trim(),
  };
});
console.log('Computed tokens:', JSON.stringify(probe, null, 2));

// Also capture a primary button if it exists
try {
  const btn = await page.$('.btn--primary, button[class*="bg-indigo-600"]');
  if (btn) {
    const box = await btn.boundingBox();
    if (box) {
      await page.screenshot({
        path: '/tmp/brand-screenshots/primary-button.png',
        clip: { x: Math.max(0, box.x-8), y: Math.max(0, box.y-8), width: box.width+16, height: box.height+16 },
      });
      const bg = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
      console.log('Primary button backgroundColor:', bg);
    }
  } else {
    console.log('No .btn--primary found on home page');
  }
} catch (e) { console.log('probe err', e.message); }

await browser.close();
