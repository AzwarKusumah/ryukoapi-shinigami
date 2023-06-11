const axios = require("axios");
const cheerio = require("cheerio");
const baseUrl = require("../base/baseUrl");

const homeComic = async (req, res) => {
  let sedang_hangat = [];
  let komik_terbaru = [];
  let mirror = [];
  let thumb, title, url, endpoint, tipe;
  try {
    axios({
      url: baseUrl,
      method: "get",
      headers: {
        "User-Agent": "Chrome",
      },
    }).then((result) => {
      const $ = cheerio.load(result.data);

      $(".recommendations .col-xl-2").each((i, el) => {
        title = $(el).find("h5").text();
        tipe = $(el).find(".series-link > span").text();
        thumb = $(el).find("img").attr("src");
        url = $(el).find(".series-link").attr("href");
        endpoint = $(el)
          .find(".series-link")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");
        sedang_hangat.push({ title, tipe, thumb, url, endpoint });
      });

      $(".latest .col-xl-3").each((i, el) => {
        title = $(el).find("h5").text();
        tipe = $(el).find(".series-link > span").text();
        thumb = $(el).find("img").attr("src");
        url = $(el).find(".series-link").attr("href");
        endpoint = $(el)
          .find(".series-link")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");
        komik_terbaru.push({ title, tipe, thumb, url, endpoint });
      });

      $(".recommendations2 .col-xl-2").each((i, el) => {
        title = $(el).find("h5").text();
        tipe = $(el).find(".series-link > span").text();
        thumb = $(el).find("img").attr("src");
        url = $(el).find(".series-link").attr("href");
        endpoint = $(el)
          .find(".series-link")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");
        mirror.push({ title, tipe, thumb, url, endpoint });
      });
      return res.json({
        message: "Data Success",
        data: {
          sedang_hangat: sedang_hangat,
          komik_terbaru: komik_terbaru,
          mirror: mirror,
        },
      });
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const projectList = async (req, res) => {
  const page = req.params.page;
  const url = page < 2 ? "/project" : `/project/page/${page}`;

  try {
    axios({
      url: `${baseUrl}${url}`,
      method: "get",
      headers: {
        "User-Agent": "Chrome",
      },
    }).then((result) => {
      const $ = cheerio.load(result.data);

      let list_komik = [];
      let pagination = [];

      $(".page-listing-item .page-item-detail").each((i, el) => {
        title = $(el).find(".h5 > a ").text();
        tipe = $(el).find("a > span").text();
        thumb = $(el).find("a > img").attr("data-src");
        source = $(el).find("a").attr("href");
        endpoint = $(el)
          .find("a")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");
        latest_chapter = $(el)
          .find(".chapter-item > .chapter > a")
          .first()
          .text()
          .trim();
        link_chapter = $(el).find(".chapter-item > .chapter > a").attr("href");

        let komik = {
          title: title,
          tipe: tipe,
          thumb: thumb,
          link: { url: source, endpoint: endpoint },
          latest_link: { name: latest_chapter, link_chapter: link_chapter },
        };
        list_komik.push(komik);
      });

      $(
        ".wp-pagenavi .page, .wp-pagenavi .current, .previouspostslink, .nextpostslink"
      ).each((i, el) => {
        page_number = $(el).text();
        link = $(el).attr("href");
        let endpoint = "";

        if (link) {
          endpoint = link.replace(`https://shinigami.id`, "").replace("/", "");
        }

        pagination.push({
          name: page_number,
          url: link,
          endpoint: endpoint,
        });
      });

      return res.json({
        message: "Data Success",
        komik_list: list_komik,
        pagination: pagination,
      });
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

module.exports = { homeComic, projectList };
