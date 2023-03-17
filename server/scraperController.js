const scraper = require("./scraper");

const scraperController_MangaDetail = async (browserInstance, id_manga) => {
  let url = `https://www.nettruyenvt.com/truyen-tranh/${id_manga}`;
  try {
    let browser = await browserInstance;
    let manga = await scraper.scraper_MangaDetail(browser, url);
    return manga;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_MangaChapter = async (
  browserInstance,
  id_manga,
  chapter,
  key
) => {
  let url = `https://www.nettruyenvt.com/truyen-tranh/${id_manga}/${chapter}/${key}`;
  try {
    let browser = await browserInstance;
    let manga = await scraper.scraper_Chapter(browser, url);
    return manga;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

module.exports = {
  scraperController_MangaDetail,
  scraperController_MangaChapter
};
