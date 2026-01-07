const { chromium } = require('playwright');
const express = require('express');

const screenshot = async (url) => {
    const browser = await chromium.launch({ args: ['--single-process'] });
    const page = await browser.newPage();
    await page.goto(url);
    const img = await page.screenshot();
    await browser.close();

    return img;
};

const app = express();

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (url) {
        const img = await screenshot(url);
        res.set('Content-Type', 'image/png');
        res.send(img);
    } else {
        res.send('Please provide a ?url=https://example.com/ parameter');
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});