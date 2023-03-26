const startBrowser = require("./browser");
const fs = require("fs");

const {
  scraperController_MangaDetail,
  scraperController_MangaChapter,
  scraperController_MangaGenres,
  scraperController_FindManga,
  scraperController_HotManga,
  scraperController_HomeManga,
  scraperController_BoyManga,
  scraperController_GirlManga,
  scraperController_AdventedSearch,
} = require("./scraperController");

const express = require("express");

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  credentails: true,
  optionSuccessStatus: 200,
  port: 3000,
};

app.use(cors(corsOptions));
app.use(express.json());

// app.get("/truyentranh", async (req, res) => {
//   try {
//     const browser = startBrowser();
//     const data = await scraperController_MangaGetAllChapterFromManga(browser);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       error: "Internal Error",
//       message: err,
//     });
//   }
// });

// app.get("/getall", async (req, res) => {
//   const browser = startBrowser();

//   const { chapters, duplicates } =
//     await scapercontroller_MangaGetAllMangaFromGenres(
//       browser,
//       "https://www.nettruyenvt.com/"
//     );
//   let result = chapters + "\n" + duplicates;
//   res.status(200).json(result);
// });
app.get("/", async (req, res) => {
  let { page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/?page=${page}`
    : `https://www.nettruyenvt.com/`;
  const data = await scraperController_HomeManga(browser, url);
  res.status(200).json(data);
});

app.get("/truyen-tranh/:id_manga/:id_chapter/:num", async (req, res) => {
  const browser = startBrowser();
  const { id_manga, id_chapter, num } = req.params;
  const url = `https://www.nettruyenvt.com/truyen-tranh/${id_manga}/${id_chapter}/${num}`;
  const data = await scraperController_MangaChapter(browser, url);
  res.status(200).json(data);
});

app.get("/truyen-tranh/:id_manga", async (req, res) => {
  const browser = startBrowser();
  const { id_manga } = req.params;
  const url = `https://www.nettruyenvt.com/truyen-tranh/${id_manga}`;
  const data = await scraperController_MangaDetail(browser, url);
  res.status(200).json(data);
});

app.get("/genres", async (req, res) => {
  const browser = startBrowser();
  const data = await scraperController_MangaGenres(browser);

  res.status(200).json(data);
});

app.get("/tim-truyen", async (req, res) => {
  let { page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/tim-truyen?page=${page}`
    : `https://www.nettruyenvt.com/tim-truyen`;
  const data = await scraperController_FindManga(browser, url);
  res.status(200).json(data);
});

app.get("/tim-truyen/:genre", async (req, res) => {
  let { page } = req.query;

  let { genre } = req.params;
  console.log(req.query);
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/tim-truyen/${genre}?page=${page}`
    : `https://www.nettruyenvt.com/tim-truyen/${genre}`;
  const data = await scraperController_FindManga(browser, url);
  res.status(200).json(data);
});

app.get("/hot", async (req, res) => {
  let { page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/hot?page=${page}`
    : `https://www.nettruyenvt.com/hot`;
  const data = await scraperController_HotManga(browser, url);
  res.status(200).json(data);
});

app.get("/truyen-con-gai", async (req, res) => {
  let { page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/truyen-con-gai?page=${page}`
    : `https://www.nettruyenvt.com/truyen-con-gai`;
  const data = await scraperController_GirlManga(browser, url);
  res.status(200).json(data);
});

app.get("/truyen-con-trai", async (req, res) => {
  let { page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/truyen-con-trai?page=${page}`
    : `https://www.nettruyenvt.com/truyen-con-trai`;
  const data = await scraperController_BoyManga(browser, url);
  res.status(200).json(data);
});

app.get("/tim-truyen-nang-cao", async (req, res) => {
  let { genres, gender, status, minchapter, sort, page } = req.query;
  const browser = startBrowser();
  const url = page
    ? `https://www.nettruyenvt.com/tim-truyen-nang-cao?genres=${genres}&notgenres=&gender=${gender}&status=${status}&minchapter=${minchapter}&sort=${sort}&page=${page}`
    : `https://www.nettruyenvt.com/tim-truyen-nang-cao?genres=${genres}&notgenres=&gender=${gender}&status=${status}&minchapter=${minchapter}&sort=${sort}`;
  const data = await scraperController_AdventedSearch(browser, url);
  res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("server listen at http://localhost:4000");
});
