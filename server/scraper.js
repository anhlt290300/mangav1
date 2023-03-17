const convert_param = require("./parse/parse_name");

const scraper_Chapter = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      console.log(">> da mo tab ...");
      await newPage.goto(url);
      console.log(">> da truy cap vao trang " + url);
      await newPage.waitForSelector(".reading-detail.box_doc");
      console.log(">> da load xong trang truyen...");

      const scraperData = {};

      const detail = await newPage.$$eval(".reading > .container", (els) => {
        detail = els[0]?.querySelector(".top");

        const page = "https://www.nettruyenvt.com";

        const name_manga = {
          name_detail: detail.querySelector("h1 a").innerText,
          href: detail.querySelector("h1 a").href.replace(page, ""),
        };

        const chapter = detail.querySelector("h1 span").innerText;

        const update_time = detail.querySelector("i")?.innerText;

        return {
          name: name_manga,
          chapter: chapter,
          update_time: update_time,
        };
      });

      const pages = await newPage.$$eval(
        ".reading-detail.box_doc > .page-chapter",
        (els) => {
          pages = els.slice(1, els.length - 2).map((el) => {
            const img = el.querySelector("img");
            return {
              img: img.src,
            };
          });
          return pages;
        }
      );

      scraperData.pages = pages;
      scraperData.detail = detail
      await browser.close();
      console.log(">> trinh duyet da dong ");
      res(scraperData);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_MangaDetail = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let Page = await browser.newPage();
      console.log(">> da mo tab ...");
      await Page.goto(url);
      console.log(">> da truy cap vao trang " + url);
      await Page.waitForSelector("#ctl00_divCenter");
      console.log(">> da load xong trang truyen...");

      const scraperData = {};

      const manga_Name = await Page.$eval(
        "#ctl00_divCenter > article#item-detail > h1",
        (el) => el.innerText
      );

      const mange_UpdateTime = await Page.$eval(
        "#ctl00_divCenter > article#item-detail > time",
        (el) => el.innerText
      );

      const manga_Image = await Page.$eval(
        "#ctl00_divCenter > article#item-detail > .detail-info > .row > .col-xs-4.col-image > img",
        (el) => el.src
      );

      let manga_Info = await Page.$eval(
        ".detail-info > .row > .col-xs-8.col-info",
        (el) => {
          const status = el.querySelector(
            "ul.list-info li.status.row p.col-xs-8"
          ).innerText;

          const view = el
            .querySelectorAll("ul.list-info li.row")[3]
            .querySelector("p.col-xs-8").innerText;

          return {
            status: status,
            view: view,
          };
        }
      );

      let authors = await Page.$$eval(
        ".detail-info > .row > .col-xs-8.col-info > ul.list-info > li.author.row > p.col-xs-8 > a",
        (els) => {
          authors = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            const href = el.href.replace(page, "");

            return {
              author: el.innerText,
              href: href,
            };
          });
          return authors;
        }
      );

      let genres = await Page.$$eval(
        ".detail-info > .row > .col-xs-8.col-info > ul.list-info > li.kind.row > p.col-xs-8 > a",
        (els) => {
          genres = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            const href = el.href.replace(page, "");
            return {
              genre: el.innerText,
              href: href,
            };
          });
          return genres;
        }
      );

      manga_Info.authors = authors;
      manga_Info.genres = genres;

      const manga_Detail = await Page.$eval(
        ".detail-content > p",
        (el) => el.innerText
      );

      let manga_ChapterDetail = await Page.$$eval(
        ".list-chapter > nav > ul > li",
        (els) => {
          manga_ChapterDetail = els.map((el) => {
            const time_update = el.querySelector(
              ".col-xs-4.text-center.no-wrap.small"
            ).innerText;

            const view = el.querySelector(
              ".col-xs-3.text-center.small"
            ).innerText;

            return {
              timeUpdate: time_update,
              view: view,
            };
          });

          return manga_ChapterDetail;
        }
      );

      let manga_Chapters = await Page.$$eval(
        ".list-chapter > nav > ul > li > .col-xs-5.chapter > a",
        (els) => {
          manga_Chapters = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            const href = el.href.replace(page, "");
            return {
              chapter: el.innerText,
              href: href,
            };
          });
          return manga_Chapters;
        }
      );

      scraperData.name = manga_Name;
      scraperData.updateTime = mange_UpdateTime;
      scraperData.image = manga_Image;
      scraperData.info = manga_Info;
      scraperData.detail = manga_Detail;
      scraperData.chaptersDetail = manga_ChapterDetail;
      scraperData.chapters = manga_Chapters;

      await browser.close();
      console.log(">> trinh duyet da dong ");
      res(scraperData);
    } catch (error) {
      console.log("loi o scraper_MangaDetail " + error);
    }
  });

module.exports = {
  scraper_Chapter,
  scraper_MangaDetail,
};
