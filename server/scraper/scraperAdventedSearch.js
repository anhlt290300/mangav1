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

const scraper_AdventedSearch = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);

      await autoScroll(newPage);
      const result = {};

      const mangas = await newPage.$$eval(
        ".Module.Module-223 > .ModuleContent > .items > .row > .item",
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

      const lastPage = await newPage.$$eval(
        "#ctl00_mainContent_ctl02_divPager.pagination-outter > ul > li",
        (els) => {
          lastPage = els[els.length - 1]?.querySelector("a").href;
          console.log(lastPage);  
          if (lastPage)
            return {
              page: lastPage.slice(lastPage.indexOf("page") + 5),
              href: lastPage.replace("https://www.nettruyenvt.com", ""),
            };
          else return -1;
        }
      );

      result.mangas = mangas;
      result.pages = lastPage;
      await newPage.close();
      await browser.close();
      res(result);
    } catch (error) {
      console.log("loi o scraper " + error);
    }
  });

module.exports = scraper_AdventedSearch;
