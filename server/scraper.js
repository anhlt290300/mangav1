const { Browser } = require("puppeteer");

const scraper_Chapter = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      await newPage.waitForSelector(".reading-detail.box_doc");

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

      const image = await newPage.$$eval("meta", (els) => {
        let item = els[10];

        return item.getAttribute("content");
      });

      scraperData.pages = pages;
      scraperData.detail = detail;
      scraperData.image = image;
      await newPage.close();
      await browser.close();
      res(scraperData);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_MangaDetail = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let Page = await browser.newPage();
      await Page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await Page.goto(url);
      await Page.waitForSelector("main.main");
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
            .querySelectorAll("ul.list-info li.row")
            [
              el.querySelectorAll("ul.list-info li.row").length - 1
            ].querySelector("p.col-xs-8").innerText;

          return {
            status: status,
            view: view,
          };
        }
      );

      let authors = await Page.$$eval(
        ".detail-info > .row > .col-xs-8.col-info > ul.list-info > li.author.row > p.col-xs-8 > a",
        (els) => {
          if (els.length !== 0) {
            authors = els.map((el) => {
              const page = "https://www.nettruyenvt.com";
              const href = el.href.replace(page, "");

              return {
                author: el.innerText,
                href: href,
              };
            });
            return authors;
          } else return "Đang cập nhật";
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
          let result = [];
          for (let i = 0; i < els.length; i++) {
            const page = "https://www.nettruyenvt.com";
            const href = els[i].href.replace(page, "");
            const chapter = els[i].innerText;
            const timeUpdate = manga_ChapterDetail[i].timeUpdate;
            const view = manga_ChapterDetail[i].view;
            result.push({
              chapter: chapter,
              href: href,
              timeUpdate: timeUpdate,
              view: view,
            });
          }
          return result;
        }
      );

      scraperData.name = manga_Name;
      scraperData.updateTime = mange_UpdateTime;
      scraperData.image = manga_Image;
      scraperData.info = manga_Info;
      scraperData.detail = manga_Detail;
      scraperData.chapters = manga_Chapters;
      //scraperData.chapters = manga_Chapters;

      await Page.close();
      await browser.close();
      //console.log(">> trinh duyet da dong ");
      res(scraperData);
    } catch (error) {
      console.log("loi o scraper_MangaDetail " + error);
    }
  });

const scraper_TopManga = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      await newPage.waitForSelector("#ctl00_divAlt1");

      for (let i = 0; i < 9; i++) {
        await newPage.click(
          ".top-comics.Module.Module-183 > .ModuleContent > .items-slide > a.prev",
          { delay: 30 }
        );
      }

      //console.log('abc')
      const mangas = await newPage.$$eval(
        ".top-comics.Module.Module-183 > .ModuleContent > .items-slide >  .owl-carousel.clearfix.owl-theme > .owl-wrapper-outer > .owl-wrapper > .owl-item",
        (els) => {
          mangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector(".item a img").src;
            let href_manga = el.querySelector(".item a").href.replace(page, "");
            let name = el.querySelector(".item div.slide-caption h3").innerText;
            let href_chapter = el
              .querySelectorAll(".item div.slide-caption a")[1]
              .href.replace(page, "");
            let chapter = el.querySelectorAll(".item .slide-caption a")[1]
              .innerText;
            let timeUpdate = el.querySelector(
              ".item .slide-caption span"
            ).innerText;
            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapter: chapter,
              href_chapter: href_chapter,
              timeUpdate: timeUpdate,
            };
          });
          return mangas;
        }
      );

      await newPage.close();
      await browser.close();
      res(mangas);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_HotManga = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);

      for (let i = 0; i < 30; i++) {
        await newPage.click(
          ".Module.Module-210 > .ModuleContent > .items-slide > a.prev",
          { delay: 30 }
        );
      }

      await autoScroll(newPage);

      const result = {};
      //console.log('abc')
      const topmangas = await newPage.$$eval(
        ".Module.Module-210 > .ModuleContent > .items-slide >  .owl-carousel.clearfix.owl-theme > .owl-wrapper-outer > .owl-wrapper > .owl-item",
        (els) => {
          topmangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector(".item a img").src;
            let href_manga = el.querySelector(".item a").href.replace(page, "");
            let name = el.querySelector(".item div.slide-caption h3").innerText;
            let href_chapter = el
              .querySelectorAll(".item div.slide-caption a")[1]
              .href.replace(page, "");
            let chapter = el.querySelectorAll(".item .slide-caption a")[1]
              .innerText;
            let timeUpdate = el.querySelector(
              ".item .slide-caption span"
            ).innerText;
            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapter: chapter,
              href_chapter: href_chapter,
              timeUpdate: timeUpdate,
            };
          });
          return topmangas;
        }
      );

      const hotmangas = await newPage.$$eval(
        ".Module.Module-177 > .ModuleContent > .items > .row > .item",
        (els) => {
          hotmangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector("figure .image a img").src;
            let href_manga = el
              .querySelector("figure figcaption h3 a")
              .href.replace(page, "");
            let name = el.querySelector("figure figcaption h3 a").innerText;
            let chapters = el.querySelectorAll("figure figcaption ul li");
            let arr = [];
            for (let i = 0; i < chapters.length; i++) {
              let chapter = chapters[i].querySelector("a").innerText;
              let href_chapter = chapters[i]
                .querySelector("a")
                .href.replace(page, "");
              let timeUpdate = chapters[i].querySelector("i").innerText;

              arr.push({
                chapter: chapter,
                href_chapter: href_chapter,
                timeUpdate: timeUpdate,
              });
            }

            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapters: arr,
            };
          });
          return hotmangas;
        }
      );

      const lastPage = await newPage.$$eval(
        "#ctl00_mainContent_ctl00_divPager.pagination-outter > ul > li",
        (els) => {
          lastPage = els[els.length - 1]?.querySelector("a").href;
          console.log(lastPage);
          if (lastPage)
            return {
              page: lastPage.slice(lastPage.indexOf("=") + 1),
              href: lastPage.replace("https://www.nettruyenvt.com/", ""),
            };
          else return -1;
        }
      );

      result.topmangas = topmangas;
      result.hotmangas = hotmangas;
      result.pages = lastPage;
      await newPage.close();
      await browser.close();
      res(result);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_HomeManga = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);

      for (let i = 0; i < 30; i++) {
        await newPage.click(
          ".Module.Module-183 > .ModuleContent > .items-slide > a.prev",
          { delay: 30 }
        );
      }

      await autoScroll(newPage);

      const result = {};
      //console.log('abc')
      const topmangas = await newPage.$$eval(
        ".Module.Module-183 > .ModuleContent > .items-slide >  .owl-carousel.clearfix.owl-theme > .owl-wrapper-outer > .owl-wrapper > .owl-item",
        (els) => {
          topmangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector(".item a img").src;
            let href_manga = el.querySelector(".item a").href.replace(page, "");
            let name = el.querySelector(".item div.slide-caption h3").innerText;
            let href_chapter = el
              .querySelectorAll(".item div.slide-caption a")[1]
              .href.replace(page, "");
            let chapter = el.querySelectorAll(".item .slide-caption a")[1]
              .innerText;
            let timeUpdate = el.querySelector(
              ".item .slide-caption span"
            ).innerText;
            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapter: chapter,
              href_chapter: href_chapter,
              timeUpdate: timeUpdate,
            };
          });
          return topmangas;
        }
      );

      const updatemangas = await newPage.$$eval(
        ".Module.Module-163 > .ModuleContent > .items > .row > .item",
        (els) => {
          updatemangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector("figure .image a img").src;
            let href_manga = el
              .querySelector("figure figcaption h3 a")
              .href.replace(page, "");
            let name = el.querySelector("figure figcaption h3 a").innerText;
            let chapters = el.querySelectorAll("figure figcaption ul li");
            let arr = [];
            for (let i = 0; i < chapters.length; i++) {
              let chapter = chapters[i].querySelector("a").innerText;
              let href_chapter = chapters[i]
                .querySelector("a")
                .href.replace(page, "");
              let timeUpdate = chapters[i].querySelector("i").innerText;

              arr.push({
                chapter: chapter,
                href_chapter: href_chapter,
                timeUpdate: timeUpdate,
              });
            }

            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapters: arr,
            };
          });
          return updatemangas;
        }
      );

      const lastPage = await newPage.$$eval(
        "#ctl00_mainContent_ctl00_divPager.pagination-outter > ul > li",
        (els) => {
          lastPage = els[els.length - 1]?.querySelector("a").href;
          console.log(lastPage);
          if (lastPage)
            return {
              page: lastPage.slice(lastPage.indexOf("=") + 1),
              href: lastPage.replace("https://www.nettruyenvt.com/", ""),
            };
          else return -1;
        }
      );

      result.topmangas = topmangas;
      result.updatemangas = updatemangas;
      result.pages = lastPage;
      await newPage.close();
      await browser.close();
      res(result);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 300;
      var timer = setInterval(() => {
        //var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= 2800) {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    });
  });
}

const scraper_NewUpdateManga = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);

      await autoScroll(newPage);

      const mangas = await newPage.$$eval(
        "#ctl00_divCenter > .Module.Module-163 > .ModuleContent > .items > .row > .item",
        (els) => {
          mangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector("figure .image a img").src;
            let href_manga = el
              .querySelector("figure figcaption h3 a")
              .href.replace(page, "");
            let name = el.querySelector("figure figcaption h3 a").innerText;
            let chapters = el.querySelectorAll("figure figcaption ul li");
            let arr = [];
            for (let i = 0; i < chapters.length; i++) {
              let chapter = chapters[i].querySelector("a").innerText;
              let href_chapter = chapters[i]
                .querySelector("a")
                .href.replace(page, "");
              let timeUpdate = chapters[i].querySelector("i").innerText;

              arr.push({
                chapter: chapter,
                href_chapter: href_chapter,
                timeUpdate: timeUpdate,
              });
            }

            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapters: arr,
            };
          });
          return mangas;
        }
      );
      await newPage.close();
      //await browser.close();
      res(mangas);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_FindManga = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);

      await autoScroll(newPage);

      const result = {};

      const info = await newPage.$eval(
        "#ctl00_mainContent_ctl00_divBasicFilter",
        (el) => {
          return {
            title: el.querySelector("h1").innerText,
            description: el.querySelector(
              "#ctl00_mainContent_ctl00_divDescription .info"
            ).innerText,
          };
        }
      );

      const mangas = await newPage.$$eval(
        "#ctl00_divCenter > .Module.Module-170 > .ModuleContent > .items > .row > .item",
        (els) => {
          mangas = els.map((el) => {
            const page = "https://www.nettruyenvt.com";
            let image = el.querySelector("figure .image a img").src;
            let href_manga = el
              .querySelector("figure figcaption h3 a")
              .href.replace(page, "");
            let name = el.querySelector("figure figcaption h3 a").innerText;
            let chapters = el.querySelectorAll("figure figcaption ul li");
            let arr = [];
            for (let i = 0; i < chapters.length; i++) {
              let chapter = chapters[i].querySelector("a").innerText;
              let href_chapter = chapters[i]
                .querySelector("a")
                .href.replace(page, "");
              let timeUpdate = chapters[i].querySelector("i").innerText;

              arr.push({
                chapter: chapter,
                href_chapter: href_chapter,
                timeUpdate: timeUpdate,
              });
            }

            return {
              image: image,
              href_manga: href_manga,
              name: name,
              chapters: arr,
            };
          });
          return mangas;
        }
      );

      await newPage.waitForSelector("#ctl00_mainContent_ctl01_divPager");
      const lastPage = await newPage.$$eval(
        "#ctl00_mainContent_ctl01_divPager > ul > li",
        (els) => {
          lastPage = els[els.length - 1]?.querySelector("a").href;
          if (lastPage)
            return {
              page: lastPage.slice(lastPage.indexOf("=") + 1),
              href: lastPage.replace("https://www.nettruyenvt.com", ""),
            };
          else return -1;
        }
      );
      result.info = info;
      result.mangas = mangas;
      result.pages = lastPage;
      await newPage.close();
      await browser.close();
      res(result);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_MangaGenre = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.goto(url);
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.waitForSelector("nav.main-nav.hidden-xs");
      const genres = await newPage.$$eval(
        "nav.main-nav.hidden-xs > .inner > .container > .Module.Module-144 > .ModuleContent > ul > li.dropdown",
        (els) => {
          genres = els[0]?.querySelectorAll("ul li .clearfix .col-sm-3");

          let data = [];
          for (let i = 0; i < genres.length; i++) {
            let item = genres[i].querySelectorAll("ul li");
            for (let j = 0; j < item.length; j++) {
              data.push({
                genre: item[j].querySelector("a").innerText.replace(/\n/g, ""),
                href: item[j]
                  .querySelector("a")
                  .href.replace("https://www.nettruyenvt.com", ""),
                title: item[j].querySelector("a").getAttribute("data-title"),
              });
            }
          }
          data.shift();
          return data;
        }
      );
      console.log("Cào được " + genres.length + " genre");
      newPage.close();
      browser.close();
      res(genres);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

const scraper_MangaNumberPages = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.goto(url);
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.waitForSelector("#ctl00_divCenter");

      const lastPage = await newPage.$$eval(
        "#ctl00_mainContent_ctl00_divPager.pagination-outter > ul > li",
        (els) => {
          lastPage = els[els.length - 1]?.querySelector("a").href;
          console.log(lastPage);
          if (lastPage)
            return {
              page: lastPage.slice(lastPage.indexOf("=") + 1),
              href: lastPage.replace("https://www.nettruyenvt.com/", ""),
            };
          else return -1;
        }
      );

      await newPage.close();
      await browser.close();
      res(lastPage);
    } catch (error) {
      console.log("loi o scraper_MangaNumberPages " + error);
    }
  });

const scraper_MangaInPage = (browser, url, set, duplicate) =>
  new Promise(async (res, reject) => {
    try {
      let duplicate_ = duplicate;
      let newPage = await browser.newPage();
      //console.log(">> da mo tab ...");
      await newPage.goto(url);
      console.log(">> Cào truyện tại trang " + url);
      await newPage.waitForSelector(".Module.Module-170");
      //console.log(">> da load xong trang truyen...");

      const scraperData = {};
      const data = await newPage.$$eval(
        ".Module.Module-170 > .ModuleContent > .items > .row > .item",
        (els) => {
          data = els.map((el) => {
            return el.querySelector(".clearfix .image a").href;
          });
          let data_ = data;
          return data_;
        }
      );

      let data_ = data;
      for (let i = 0; i < data.length; i++) {
        if (set.has(data[i])) {
          let index = data_.indexOf(data[i]);
          if (index > -1) {
            data_.splice(index, 1);
            ++duplicate_;
          }
        } else {
          set.add(data[i]);
        }
      }

      await newPage.close();

      res({
        data: data_,
        duplicateCount: duplicate_,
      });
    } catch (error) {
      console.log("loi o scraper mangainpage" + error);
    }
  });

module.exports = {
  scraper_Chapter,
  scraper_MangaDetail,
  scraper_MangaGenre,
  scraper_MangaNumberPages,
  scraper_MangaInPage,
  scraper_TopManga,
  scraper_NewUpdateManga,
  scraper_FindManga,
  scraper_HotManga,
  scraper_HomeManga,
};
