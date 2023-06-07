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

module.exports = { homeComic };