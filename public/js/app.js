console.log("client js was loaded");
const getForecast = (address, cb) => {
  const url = `http://localhost:5000/weather?address=${address}`;
  fetch(url, {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) return cb(data.error);
      //success
      cb(undefined, data);
    })
    .catch(() => cb("Error In Request, please try again!"));
};

const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const showError = document.getElementById("error-msg");
const showData = document.getElementById("data-msg");
const loadingMsg = document.getElementById("loading");

form.addEventListener("submit", e => {
  e.preventDefault();
  loadingMsg.textContent = "Loading...";
  showData.innerHTML = "";
  showError.textContent = "";
  getForecast(searchInput.value, (err, data) => {
    loadingMsg.textContent = "";
    if (err) return (showError.textContent = err);
    const { forecast, location } = data || {};
    const h5 = document.createElement("h5");
    const p = document.createElement("p");
    h5.textContent = "The Forecast for " + location;
    p.textContent = forecast;
    showData.appendChild(h5);
    showData.appendChild(p);
  });
});
