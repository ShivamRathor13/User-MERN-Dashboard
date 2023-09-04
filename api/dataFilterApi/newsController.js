// const News = require("../modals");

// exports.getAllNews = async (req, res) => {
//   try {
//     const newsItems = await News.find();

//     res.status(200).json({
//       status: "success",
//       // requestedAt: req.requestTime,
//       results: newsItems.length,
//       data: {
//         news: newsItems,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// exports.getAllNews = async (req, res) => {
//   try {
//     const {
//       end_year,
//       topic,
//       sector,
//       region,
//       pest,
//       source,
//       swot,
//       country,
//       city,
//     } = req.query;
//     let query = {};

//     if (end_year) {
//       query.end_year = end_year;
//     }

//     if (topic) {
//       query.topic = topic;
//     }

//     if (sector) {
//       query.sector = sector;
//     }

//     if (region) {
//       query.region = region;
//     }

//     if (pest) {
//       query.pestle = pest;
//     }

//     if (source) {
//       query.source = source;
//     }

//     if (swot) {
//       // Add a condition for SWOT if applicable.
//     }

//     if (country) {
//       query.country = country;
//     }

//     if (city) {
//       query.city = city;
//     }

//     const newsItems = await News.find(query);

//     res.status(200).json({
//       status: "success",
//       results: newsItems.length,
//       data: {
//         news: newsItems,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

const News = require("../modals");

exports.getAllNews = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pest,
      source,
      swot,
      country,
      city,
    } = req.query;
    let query = {};

    if (end_year) {
      query.end_year = end_year;
    }

    if (topic) {
      query.topic = topic;
    }

    if (sector) {
      query.sector = sector;
    }

    if (region) {
      query.region = region;
    }

    if (pest) {
      query.pestle = pest;
    }

    if (source) {
      query.source = source;
    }

    if (swot) {
      // Add a condition for SWOT if applicable.
    }

    if (country) {
      query.country = country;
    }

    if (city) {
      query.city = city;
    }

    const newsItems = await News.find(query);

    res.status(200).json({
      status: "success",
      results: newsItems.length,
      data: {
        news: newsItems,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
