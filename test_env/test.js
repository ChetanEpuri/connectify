const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
  
  await browser.close();
  process.exit(0);
});
