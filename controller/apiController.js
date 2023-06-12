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

const searchProject = async (req, res) => {
  const query = req.params.query;
  let page = req.params.page || 1;
  const url =
    page < 2
      ? `?s=${query}&post_type=wp-manga`
      : `/page/${page}/?s=${query}&post_type=wp-manga`;

  let searchResult = [];
  let pagination = [];

  try {
    await axios({
      url: `${baseUrl}${url}`,
      method: "get",
      headers: {
        "User-Agent": "Chrome",
      },
    }).then((result) => {
      const $ = cheerio.load(result.data);

      $(".c-tabs-item__content").each((i, el) => {
        title = $(el).find(".h4 > a").text();
        thumb = $(el).find("img").attr("data-src");
        genres = $(el)
          .find(".mg_genres > .summary-content > a")
          .map((i, el) => $(el).text())
          .get();
        status_komik = $(el).find(".mg_status > .summary-content").text();
        release_year = $(el).find(".mg_release > .summary-content").text();
        ratings = $(el).find(".post-total-rating > span").text();
        source = $(el).find(".h4 > a").attr("href");
        endpoint = $(el)
          .find(".h4 > a")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");

        let komik = {
          title: title,
          status: status_komik,
          release_year: release_year,
          ratings: ratings,
          thumbs: thumb,
          genres: genres,
          link: { url: source, endpoint: endpoint },
        };
        searchResult.push(komik);
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
        komik_list: searchResult,
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

const comicDetails = async (req, res) => {
  const endpoint = req.params.endpoint;
  const url = `series/${endpoint}`;

  let comic_details = [];
  let chapters = [];
  try {
    await axios({
      url: `${baseUrl}${url}`,
      method: "get",
      headers: {
        "User-Agent": "Chrome",
      },
    }).then((result) => {
      const $ = cheerio.load(result.data);

      $(".profile-manga").each((i, el) => {
        title = $(el).find(".post-title > h1").text().trim();
        alternative = $(el).find(".summary-content").eq(2).text().trim();
        rank = $(el).find(".summary-content").eq(1).text().trim();
        author = $(el).find(".author-content").text().trim();
        artist = $(el).find(".artist-content").text().trim();
        genre = $(el)
          .find(".genres-content > a")
          .map((i, el) => $(el).text())
          .get();
        release = $(el).find(".summary-content").eq(8).text().trim();
        status_komik = $(el).find(".summary-content").eq(9).text().trim();
        sinopsis = $(el)
          .find(".description-summary > .summary__content > p")
          .text();
        thumb = $(el).find("img").attr("data-src");
        averageRating = $(el).find("#averagerate").text();
        totalRating = $(el).find("#countrate").text();
        ratings = `Average ${averageRating} / 5 out of ${totalRating}`;

        let komik_detail = {
          title: title,
          alternative: alternative,
          rank: rank,
          rating: ratings,
          author: author,
          artist: artist,
          genres: genre,
          release: release,
          status: status_komik,
          thumbs: thumb,
          sinopsis: sinopsis,
        };
        comic_details.push(komik_detail);
      });

      $(".wp-manga-chapter").each((i, el) => {
        name_chapter = $(el).find(".chapter-manhwa-title").text();
        source = $(el).find(".chapter-link > a").attr("href");
        endpoint_url = $(el)
          .find(".chapter-link > a")
          .attr("href")
          .replace(`https://shinigami.id`, "")
          .replace("/", "");

        let komik_chapter = {
          name: name_chapter,
          link: { url: source, endpoint: endpoint_url },
        };

        chapters.push(komik_chapter);
      });
    });

    return res.json({
      message: "Data Success",
      comic_details: comic_details,
      chapters: chapters,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const comicChapters = async (req, res) => {
  const endpoint = req.params.endpoint;
  const endpoints = req.params.endpoints;
  const url = `series/${endpoint}/${endpoints}`;

  let chapter_title, images, pagenations;
  try {
    await axios({
      url: `${baseUrl}${url}`,
      method: "get",
      headers: {
        "User-Agent": "Chrome",
      },
    }).then((result) => {
      const $ = cheerio.load(result.data);
      const title = $(".row").find("#chapter-heading").text();
      chapter_title = title;

      $(".read-container").each((i, el) => {
        image = $(el)
          .find(".page-break > img")
          .map((i, el) => $(el).attr("data-src").trim())
          .get();
      });
      images = image;

      const prev = $(".wp-manga-nav")
        .find(".nav-previous > a")
        .attr("href")
        .replace(`https://shinigami.id`, "")
        .replace("/", "");
      const next = $(".wp-manga-nav")
        .find(".nav-next > a")
        .attr("href")
        .replace(`https://shinigami.id`, "")
        .replace("/", "");
      let pagination = {
        prev: prev,
        next: next,
      };
      pagenations = pagination;
    });
    return res.json({
      title: chapter_title,
      images: images,
      pagination: pagenations,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  homeComic,
  projectList,
  searchProject,
  comicDetails,
  comicChapters,
};
