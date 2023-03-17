const startBrowser = require("./browser");

const {
  scraperController_MangaDetail,
  scraperController_MangaChapter,
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

app.get("/", async (req, res) => {
  res.status(200).json("hello");
});

app.get("/truyentranh/", async (req, res) => {
  const { id_manga } = req.query;
  if (!id_manga)
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: err,
    });
  else {
    try {
      const browser = startBrowser();
      const data = await scraperController_MangaDetail(browser, id_manga);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: "Internal Error",
        message: err,
      });
    }
  }
});

app.get("/chapter/", async (req, res) => {
  const { id_manga, chapter, key } = req.query;

  if (id_manga && chapter && key) {
    try {
      const browser = startBrowser();
      const data = await scraperController_MangaChapter(
        browser,
        id_manga,
        chapter,
        key
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: "Internal Error",
        message: err,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: err,
    });
  }
});

app.listen(4000, () => {
  console.log("server listen at http://localhost:4000");
});
