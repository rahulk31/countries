'use strict';
const url = 'https://restcountries.com/v3.1/all';

const container = document.querySelector('.container');


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
        try {
            const [capital] = data[i].capital;
            const currency = data[i].currencies[Object.keys(data[i].currencies)[0]];
            const language = data[i].languages[Object.keys(data[i].languages)[0]]

            console.log(data[i]);
            container.insertAdjacentHTML("beforeend", 
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
        `)
        
        } catch(err) {
            console.log(err.message);
        }
    }
        
})