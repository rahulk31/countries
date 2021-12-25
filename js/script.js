'use strict';
const url = 'https://restcountries.com/v3.1/all';

const container = document.querySelector('.container');



// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         // console.log(response[0].name.common);
//         // console.log(response[0].capital[0]);
//         // console.log(response[0].languages[Object.keys(response[0].languages)[0]]);
//         // console.log(response[0].population);
//         // console.log(response[0].region);
//         console.log(data)
//         data.forEach(response => {
//             container.insertAdjacentHTML("beforeend", 
//             `
//             <div class="country-div">
//             <div>
//                 <img class="flag" src=${response.flags.svg} alt="">
//             </div>
//             <div class="content">
//                 <h1 class="country">${response.name.common}</h1>
//                 <span class="capital">${response.region}</span>
//                 <div class="data">
//                     <p class="language">${response.languages[Object.keys(response.languages)[0]] ? response.languages[Object.keys(response.languages)[0]] : "NA"}</p>
//                     <p class="currency">$</p>
//                     <p class="population">${response.population}</p>
                    
//                 </div>
//             </div>
//         </div>
//         `)
//         })
//     })

//     // <p class="region">${response.capital[0] ? response.capital[0] : "NA" }</p>

// Using XMLHttpRequest()

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/all');
request.send();

request.addEventListener('load', () => {
    // here this refers to the window object even after using the strict mode.
    // need to understand th logic and the cause behind this reference.
    console.log(this);
    const data = JSON.parse(request.responseText);
    for(let i=0; i<data.length; i++) {
        console.log(data[i].name.common);
    }
})