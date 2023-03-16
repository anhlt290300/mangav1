const scraper = require("./scraper");
const fs = require("fs");
const scraperController = async (browserInstance) => {
  let url = "https://www.nettruyenup.com/";
  const indexs = [1, 4, 7, 8];
  try {
    let browser = await browserInstance;
    let categories = await scraper.scraperCategory(browser, url);

    let selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );

    //console.log(selectedCategories[0]);
    await scraper.scraper(browser, selectedCategories[0].link);
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController2 = async (browserInstance) => {
  let url =
    "https://www.nettruyenvt.com/truyen-tranh/anh-hung-onepunch/chap-228/966409";
  try {
    let browser = await browserInstance;
    let comic = await scraper.scraper_Chapter(browser, url);
    // fs.writeFile('img.json',JSON.stringify(comic),(error)=>{
    //   if(error) console.log('them data k thanh cong')
    //   else console.log('them data thanh cong')
    // })
    return comic;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_MangaDetail = async (browserInstance) => {
  let url = "https://www.nettruyenvt.com/truyen-tranh/anh-hung-onepunch-43890";
  try {
    let browser = await browserInstance;
    let manga = await scraper.scraper_MangaDetail(browser, url);
    // fs.writeFile('img.json',JSON.stringify(comic),(error)=>{
    //   if(error) console.log('them data k thanh cong')
    //   else console.log('them data thanh cong')
    // })
    return manga;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

module.exports = {
  scraperController,
  scraperController2,
  scraperController_MangaDetail,
};
