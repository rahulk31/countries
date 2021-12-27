const inputCountry = document.querySelector(".search");
const neighbours = document.querySelector(".neighbours");
const allCountries = document.querySelector(".all-countries");
const tableView = document.querySelector(".table-view");
const container = document.querySelector(".container");

const oneUrl = "https://restcountries.com/v3.1/name/";
const allUrl = "https://restcountries.com/v3.1/all";

const inputHandler = (e) => {
    container.textContent = '';
  if (e.key === "Enter") {
    const url = oneUrl + inputCountry.value;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.addEventListener("load", () => {
      const data = JSON.parse(request.responseText);

      try {
        const [capital] = data[0].capital;
        const currency = data[0].currencies[Object.keys(data[0].currencies)[0]];
        const language = data[0].languages[Object.keys(data[0].languages)[0]];

        console.log(data[0]);
        container.insertAdjacentHTML(
          "beforeend",
          `
                <div class="country-div">
                    <div>
                        <img class="flag" src=${data[0].flags.svg} alt="">
                    </div>
                    <div class="content">
                        <h1 class="country">${data[0].name.common}</h1>
                        <span class="capital">${capital}</span>
                        <div class="data">
                            <p class="currency">${language}</p>
                            <p class="population">${data[0].population}</p>
                            <p class="population">${data[0].region}</p>
                            <p class="population">${currency.name} (${currency.symbol})</p>
                        </div>
                    </div>
                </div>
        `
        );
      } catch (err) {
        console.log(err.message);
      }
    });
    inputCountry.value = '';
  }
};

const allCountriesHandler = () => {
  const request = new XMLHttpRequest();
  request.open("GET", allUrl);
  request.send();

  request.addEventListener("load", () => {
    const data = JSON.parse(request.responseText);
    for (let i = 0; i < data.length; i++) {
      try {
        const [capital] = data[i].capital;
        const currency = data[i].currencies[Object.keys(data[i].currencies)[0]];
        const language = data[i].languages[Object.keys(data[i].languages)[0]];

        console.log(data[i]);
        container.insertAdjacentHTML(
          "beforeend",
          `
                <div class="country-div">
                    <div>
                        <img class="flag" src=${data[i].flags.svg} alt="">
                    </div>
                    <div class="content">
                        <h1 class="country">${data[i].name.common}</h1>
                        <span class="capital">${capital}</span>
                        <div class="data">
                            <p class="currency">${language}</p>
                            <p class="population">${data[i].population}</p>
                            <p class="population">${data[i].region}</p>
                            <p class="population">${currency.name} (${currency.symbol})</p>
                        </div>
                    </div>
                </div>
        `
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  });
};

inputCountry.addEventListener("keypress", inputHandler);
allCountries.addEventListener("click", allCountriesHandler);
