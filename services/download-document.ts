import chromium from '@sparticuz/chromium';
import fs from 'fs';
import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';

export const dynamic = 'force-dynamic';

async function getBrowser() {
  if (process.env.VERCEL_ENV === 'production') {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function downloadDocument(url: string, downloadPath: string): Promise<string> {
  try {
    const browser = await getBrowser();
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });

    const page = await browser.newPage();

    const client = await page.createCDPSession();
    
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath,
    });

    await page.goto(url, { waitUntil: 'networkidle2' });

    const downloadButtonSelector = '#proxyActionBar_x__cmdEnd';
    await page.waitForSelector(downloadButtonSelector);
    await page.click(downloadButtonSelector);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const files = fs.readdirSync(downloadPath);
    const downloadedFile = files.find((file) => file.endsWith('.pdf'));

    await browser.close();

    if (!downloadedFile) {
      throw new Error('No file downloaded');
    }

    // const filePath = path.join(downloadPath, downloadedFile);
    // return filePath;
    return downloadedFile;
  } catch (error) {
    console.log('error: ', error);
    
    throw error;
  }
}
