const allCountries = document.querySelector('.all-countries');
const heads = document.querySelector('.heads');
const table = document.querySelector('table');

const allUrl = "https://restcountries.com/v3.1/all";


const displayData = (
    flag,
    name,
    capital,
    language,
    population,
    region,
    currency
  ) => {
    table.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
      <td>${name}</td>
      <td><img src=${flag} width=30px></td>
      <td>${capital}</td>
      <td>${language}</td>
      <td>${population}</td>
      <td>${region}</td>
      <td>${currency.name}</td>
      <td>${currency.symbol}</td>
    </tr>
          `
    );
  };

const fetchAll = () => {
    fetch(allUrl)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
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

  fetchAll();

  allCountries.addEventListener('click', fetchAll);