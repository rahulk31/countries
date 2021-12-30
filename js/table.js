const allCountries = document.querySelector(".all-countries");
const sortOption = document.querySelector(".sort");
const heads = document.querySelector(".heads");
const table = document.querySelector("table");
const message = document.querySelector(".message");

const allUrl = "https://restcountries.com/v3.1/all";
const dataList = [];
let sortedDataList;
let isSorted = false;
var rowsDisplayed = 0;

const displayData = ([
  name,
  flag,
  capital,
  language,
  population,
  region,
  currencyCode,
  currency,
]) => {
  rowsDisplayed++;
  table.insertAdjacentHTML(
    "beforeend",
    `
      <tr>
      <td>${name}</td>
      <td><img src=${flag} width=30px></td>
      <td>${capital ? capital : "-"}</td>
      <td>${language}</td>
      <td>${population}</td>
      <td>${region}</td>
      <td>${currency.name}</td>
      <td>${currencyCode} (${currency.symbol ? currency.symbol : "-"})</td>
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
          const name = data[i].name.common;
          const flag = data[i].flags.svg;
          const [capital] = data[i].capital;
          const language = data[i].languages[Object.keys(data[i].languages)[0]];
          const population = data[i].population;
          const region = data[i].region;
          const currencyCode = Object.keys(data[i].currencies)[0];
          const currency =
            data[i].currencies[Object.keys(data[i].currencies)[0]];

          const argList = [
            name,
            flag,
            capital,
            language,
            population,
            region,
            currencyCode,
            currency,
          ];
          dataList.push(argList);

          displayData(argList);
        } catch (err) {
          console.log(err);
        }
      }
    });
};

const removeData = () => {
  // let i=1;
  while (rowsDisplayed > 0) {
    table.deleteRow(rowsDisplayed);
    rowsDisplayed--;
  }
  rowsDisplayed = 0;
};

const changeHandler = () => {
  console.log(sortOption.value);
  console.log(dataList);

  if (sortOption.value === "population") {
    if (isSorted) return;

    sortedDataList = dataList.sort((a, b) => b[4] - a[4]);
    isSorted = true;
  } else if (sortOption.value === "name") {
    // sortedDataList = dataList.sort((a, b) => a[0] - b[0]);
    message.classList.remove('hidden');
  }
    

  removeData();
  for (let i = 0; i < dataList.length; i++) {
    displayData(dataList[i]);
  }
};

// Function Calls & Event Listeners
fetchAll();
allCountries.addEventListener("click", fetchAll);
sortOption.addEventListener("change", changeHandler);
