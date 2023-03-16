const startBrowser = require("./browser");

const {
  scraperController2,
  scraperController_MangaDetail,
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

// const browser = startBrowser();
// (async()=>{
//     await scraperController.scraperController2(browser)
// })()

app.get("/", async (req, res) => {
  res.status(200).json("hello");
});

app.get("/getManga", async (req, res) => {
  const browser = startBrowser();
  const data = await scraperController_MangaDetail(browser);

  res.status(200).json(data);
});

app.get("/get", async (req, res) => {
  const browser = startBrowser();
  const data = await scraperController2(browser);

  res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("server listen at http://localhost:4000");
});
