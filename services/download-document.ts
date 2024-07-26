import { convertToPDF } from '@/utils/convert-to-pdf';
import chromium from '@sparticuz/chromium';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import { v4 as uuidv4 } from 'uuid';

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

    await new Promise((resolve) => setTimeout(resolve, 4500));

    const files = fs.readdirSync(downloadPath);
    const downloadedFile = files.find(
      (file) => file.endsWith('.pdf') || file.endsWith('.docx') || file.endsWith('.xlsx'),
    );

    await browser.close();

    if (!downloadedFile) {
      throw new Error('No file downloaded');
    }

    const filePath = path.join(downloadPath, downloadedFile);

    if (downloadedFile.endsWith('.pdf')) {
      return filePath;
    }
console.log('downloadedFile: ', downloadedFile);

    const outputFilePath = path.join(downloadPath, `${uuidv4()}.pdf`);
    await convertToPDF(filePath, outputFilePath);

    // Clean up the original file
    fs.unlinkSync(filePath);

    return outputFilePath;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
}
