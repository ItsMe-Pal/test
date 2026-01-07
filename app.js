const { chromium } = require('playwright');
const express = require('express');

const app = express();

/**
 * بياخد Screenshot لموقع (Headless)
 */
async function screenshot(url) {
    const browser = await chromium.launch({
        headless: true   // 👈 المتصفح يشتغل من غير ما يفتح شاشة
    });

    const page = await browser.newPage();   // صفحة جديدة
    await page.goto(url);                   // نروح للرابط
    const image = await page.screenshot();  // نلقط الصورة
    await browser.close();                  // نقفل المتصفح

    return image;
}

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.send('اكتب ?url=https://example.com');
    }

    const image = await screenshot(url);

    res.set('Content-Type', 'image/png');
    res.send(image);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
