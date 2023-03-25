const scraper = require("./scraper");
const fs = require("fs");
const scraperController_MangaDetail = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let manga = await scraper.scraper_MangaDetail(browser, url);
    return manga;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

// const scraperController_MangaGetAllChapterFromManga = async (
//   browserInstance
// ) => {
//   let mangasData = JSON.parse(fs.readFileSync("mangas.json"));
//   try {
//     let browser = await browserInstance;
//     console.log('aaa')
//     /// Chạy hết toàn bộ 51 genre
//     for (let i = 24; i < 25; i++) {
//       let { genre, mangas } = mangasData[i];
//       let arrManga = [];
//       //// chạy hết toàn bộ manga có trong genre
//       for (let j = 0; j < mangas.length; j++) {
//         //// trả về một cái detail của manga bao gồm mô tả và tất cả tập truyện của manga đó
//         let { name, updateTime, image, info, detail, chapters } =
//           await scraper.scraper_MangaDetail(browser, mangas[j]);
//         let chapterOfmanga = [];
//         //// Chỉnh sửa phần mảng các tập truyện của manga
//         for (let k = 0; k < chapters.length; k++) {
//           let { chapter, href, timeUpdate, view } = chapters[k];
//           let imgs = await scraperController_MangaChapter(browser, href);
//           chapters[k] = {
//             chapter: chapter,
//             imgs: imgs,
//             timeUpdate: timeUpdate,
//             view: view,
//           };
//         }
//         //// tập manga hoàn chỉnh
//         let manga = {
//           name: name,
//           updateTime: updateTime,
//           image: image,
//           info: info,
//           detail: detail,
//           chapters: chapters,
//         };
//         arrManga.push(manga);
//       }
//       //// Sau khi cào xong genre thì lưu vào file json
//       //// Lấy dữ liệu trong file json ra
//       let data =
//         fs.readFileSync("allchapter.json").byteLength === 0
//           ? []
//           : JSON.parse(fs.readFileSync("allchapter.json"));

//       //// push cái list manga mới đào về đc vô
//       data.push({
//         genre: genre,
//         mangas: arrManga,
//       });
//       //// ghi vô file lại
//       fs.writeFileSync("allchapter.json", JSON.stringify(data), (err) => {
//         if (err) console.log("Đào data thất bại " + genre);
//         else console.log("Đào data thành công " + genre);
//       });
//     }
//   } catch (error) {
//     console.log("loi o scapercontroller " + error);
//   }
// };

const scraperController_MangaChapter = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let manga = await scraper.scraper_Chapter(browser, url);
    return manga;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_MangaGenres = async (browserInstance) => {
  let url = `https://www.nettruyenvt.com/`;
  try {
    let browser = await browserInstance;
    let genres = await scraper.scraper_MangaGenre(browser, url);
    return genres;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_TopManga = async (browserInstance) => {
  let url = `https://www.nettruyenvt.com/`;
  try {
    let browser = await browserInstance;
    let mangas = await scraper.scraper_TopManga(browser, url);
    return mangas;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_MangaNewUpdate = async (browserInstance) => {
  let url = `https://www.nettruyenvt.com/`;
  try {
    let browser = await browserInstance;
    let mangas = await scraper.scraper_NewUpdateManga(browser, url);
    return mangas;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_MangaNumberPages = async (browserInstance) => {
  let url = `https://www.nettruyenvt.com/`;
  try {
    let browser = await browserInstance;
    let count = await scraper.scraper_MangaNumberPages(browser, url);
    return count;
  } catch (error) {
    console.log("loi o scapercontroller " + url + " " + error);
  }
};

const scraperController_FindManga = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let data = await scraper.scraper_FindManga(browser, url);
    return data;
  } catch (error) {
    console.log("loi o scapercontroller " + url + " " + error);
  }
};

const scraperController_HotManga = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let data = await scraper.scraper_HotManga(browser, url);
    return data;
  } catch (error) {
    console.log("loi o scapercontroller " + url + " " + error);
  }
};

const scraperController_HomeManga = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let data = await scraper.scraper_HomeManga(browser, url);
    return data;
  } catch (error) {
    console.log("loi o scapercontroller " + url + " " + error);
  }
};

// const scapercontroller_MangaInPage = async (
//   browserInstance,
//   url,
//   set,
//   duplicate
// ) => {
//   try {
//     let duplicate_ = duplicate;
//     let browser = await browserInstance;
//     let { data, duplicateCount } = await scraper.scraper_MangaInPage(
//       browser,
//       url,
//       set,
//       duplicate
//     );

//     duplicate_ += duplicateCount;
//     return {
//       data: data,
//       duplicateCount: duplicate_,
//     };
//   } catch (error) {
//     console.log("loi o scapercontroller " + url + " " + error);
//   }
// };

// const scapercontroller_MangaFromGenre = async (
//   browserInstance,
//   url,
//   genre,
//   set
// ) => {
//   try {
//     let browser = await browserInstance;
//     let count = await scraperController_MangaNumberPages(browser, url);
//     let result = [];
//     let duplicate = 0;
//     for (let i = 1; i <= count; i++) {
//       let url_ = `${url}?page=${i}`;
//       let { data, duplicateCount } = await scapercontroller_MangaInPage(
//         browser,
//         url_,
//         set,
//         0
//       );
//       duplicate += duplicateCount;
//       result = result.concat(data);
//     }

//     console.log("\n>>>>>>> Cào được " + result.length + " tập truyện <<<<<<<");
//     console.log(">>>>>>> lặp hết " + duplicate + " tập truyện <<<<<<<\n");

//     return {
//       genre: genre,
//       mangas: result,
//       chapterCount: result.length,
//       chapterDuplicate: duplicate,
//     };
//   } catch (error) {
//     console.log("loi o scapercontroller " + url + " " + error);
//   }
// };

// const scapercontroller_MangaGetAllMangaFromGenres = async (
//   browserInstance,
//   url
// ) => {
//   try {
//     const set = new Set();

//     let browser = await browserInstance;

//     let genres = await scraperController_MangaGenres(browser, url);
//     let chapterCount = 0;
//     let chapterDuplicate = 0;
//     for (let i = 0; i < genres.length; i++) {
//       let { genre, href } = genres[i];
//       console.log("\nscraper genre " + genre + "\n");

//       let arr =
//         fs.readFileSync("mangas.json").byteLength === 0
//           ? []
//           : JSON.parse(fs.readFileSync("mangas.json"));

//       let item = await scapercontroller_MangaFromGenre(
//         browser,
//         href,
//         genre,
//         set
//       );

//       chapterCount += item.chapterCount;

//       chapterDuplicate += item.chapterDuplicate;

//       arr.push({ genre: item.genre, mangas: item.mangas });

//       fs.writeFileSync("mangas.json", JSON.stringify(arr), (err) => {
//         if (err) console.log("Đào data thất bại " + genre);
//         else console.log("Đào data thành công " + genre);
//       });
//     }

//     await browser.close();
//     return {
//       chapters: `Đào được tổng cộng ${chapterCount} đầu truyện `,
//       duplicates: `Lặp tổng cộng ${duplicate} đầu truyện `,
//     };
//   } catch (error) {
//     console.log("loi o scapercontroller " + url + " " + error);
//   }
// };

module.exports = {
  scraperController_MangaDetail,
  scraperController_MangaChapter,
  scraperController_MangaGenres,
  scraperController_TopManga,
  scraperController_MangaNewUpdate,
  scraperController_MangaNumberPages,
  scraperController_FindManga,
  scraperController_HotManga,
  scraperController_HomeManga,
  // scapercontroller_MangaInPage,
  // scapercontroller_MangaFromGenre,
  // scapercontroller_MangaGetAllMangaFromGenres,
  // scraperController_MangaGetAllChapterFromManga,
};
