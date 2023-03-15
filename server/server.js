import axios from "axios";
import puppeteer from "puppeteer";

const Scraper = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nettruyenvt.com/truyen-tranh/pha-vo-ke-hoach-cua-tra-nam-toi-ve-ben-dai-boss/chap-0/961248');
    

  } catch (error) {
    console.log(error);
  }
};


Scraper().then(imgs => console.log(imgs))