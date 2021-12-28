const inputCountry = document.querySelector(".search");
const neighbours = document.querySelector(".neighbours");
const allCountries = document.querySelector(".all-countries");
const tableView = document.querySelector(".table-view");
const container = document.querySelector(".container");
const info = document.querySelector(".info");

const oneUrl = "https://restcountries.com/v3.1/name/";
const allUrl = "https://restcountries.com/v3.1/all";
const codeUrl = "https://restcountries.com/v3.1/alpha/";

let currentCountry = {
  name: '',
  borders: []
};

const displayData = (
  flag,
  name,
  capital,
  language,
  population,
  region,
  currency,
  size = ''
) => {
  container.insertAdjacentHTML(
    "beforeend",
    `
                <div class="country-div ${size}">
                    <div>
                        <img class="flag" src=${flag} alt="">
                    </div>
                    <div class="content">
                        <h1 class="country">${name}</h1>
                        <span class="capital">${capital}</span>
                        <div class="data">
                            <p class="currency">${language}</p>
                            <p class="population">${population}</p>
                            <p class="population">${region}</p>
                            <p class="population">${currency.name} (${currency.symbol})</p>
                        </div>
                    </div>
                </div>
        `
  );
};

const fetchAll = () => {
  fetch(allUrl)
    .then((res) => res.json())
    .then((data) => {
      info.classList.add("hidden");
      container.textContent = "";
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        try {
          const flag = data[i].flags.svg;
          const name = data[i].name.common;
          const [capital] = data[i].capital;
          const language = data[i].languages[Object.keys(data[i].languages)[0]];
          const population = data[i].population;
          const region = data[i].region;
          const currency =
            data[i].currencies[Object.keys(data[i].currencies)[0]];

          displayData(
            flag,
            name,
            capital,
            language,
            population,
            region,
            currency
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
};

const fetchOne = (e) => {
  currentCountry.name = inputCountry.value;
  inputCountry.value = "";
  container.textContent = "";
  fetch(oneUrl + currentCountry.name)
    .then((res) => res.json())
    .then((data) => {
      info.classList.add("hidden");
      try {
        const flag = data[0].flags.svg;
        const name = data[0].name.common;
        const [capital] = data[0].capital;
        const language = data[0].languages[Object.keys(data[0].languages)[0]];
        const population = data[0].population;
        const region = data[0].region;
        const currency = data[0].currencies[Object.keys(data[0].currencies)[0]];
        currentCountry.borders = data[0].borders;

        displayData(
          flag,
          name,
          capital,
          language,
          population,
          region,
          currency
        );
      } catch (err) {
        console.log(err);
      }
    });
};

const fetchCode = () => {
  console.log(currentCountry.borders);
  const cb = currentCountry.borders;
  for(let i=0; i<cb.length; i++) {
    fetch(codeUrl+cb[i])
      .then(res => res.json())
      .then(data => {
        try {
          console.log(data)
          const flag = data[0].flags.svg;
          const name = data[0].name.common;
          const [capital] = data[0].capital;
          const language = data[0].languages[Object.keys(data[0].languages)[0]];
          const population = data[0].population;
          const region = data[0].region;
          const currency =
            data[0].currencies[Object.keys(data[0].currencies)[0]];

          displayData(
            flag,
            name,
            capital,
            language,
            population,
            region,
            currency,
            'small'
          );
        } catch (err) {
          console.log(err);
        }
      })
  }
}

const fetchHandler = (arg) => {
  if (arg === "all") {
    fetchAll();
  } else if (arg === "one") {
    fetchOne();
  } else if (arg === "code") {
    fetchCode();
  }
};

inputCountry.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchHandler("one");
  }
});
neighbours.addEventListener('click', () => {
  console.log(currentCountry);
  if(currentCountry.name !== '') fetchHandler('code');
  else {
    // container.textContent = '';
    info.classList.remove('.hidden');
    info.display = 'block';
    info.textContent = "Please search for One country at least to see its neighbours!";
  }
})
allCountries.addEventListener("click", () => {
  fetchHandler("all");
});
