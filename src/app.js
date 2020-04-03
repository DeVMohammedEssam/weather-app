const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();
const PORT = process.env.PORT || 5000;

//express paths settings
const PublicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//handlebars settings
app.set("view engine", "hbs");
app.set("views", viewsPath);
//setting express options
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(PublicPath));

//routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    devName: "Mohammed Essam"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    devName: "Mohammed Essam"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    devName: "Mohammed Essam"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address)
    return res.status(400).json({ error: "No address query is provided!" });
  geocode(address, (err, { long, lat, location } = {}) => {
    if (err) return res.status(404).json({ error: err });
    //success case
    forecast(long, lat, (err, data) => {
      if (err) return res.status(400).json({ error: err });
      res.status(200).json({ forecast: data, location });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errMsg: "Help article not found.",
    title: "404",
    devName: "Mohammed Essam"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errMsg: "Page not found.",
    title: "404",
    devName: "Mohammed Essam"
  });
});
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
