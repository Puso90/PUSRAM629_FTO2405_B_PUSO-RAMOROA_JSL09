const cryptoTop = document.querySelector('#crypto-top');
const crypto = document.querySelector('#crypto');
const weather = document.querySelector('#weather');
const time = document.getElementById('time');

//_____________________________________________________________________________________________________________________________________________________
// CRYPTO API 

   //function forCrypto() {
    //For Crypto
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin") 
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => {
            cryptoTop.innerHTML = `
                <img src=${data.image.small}/>
                <span>${data.name}</span>
            `
            crypto.innerHTML += `
                <p>: $${data.market_data.current_price.usd}</p>
                <p>: $${data.market_data.high_24h.usd}</p>
                <p>: $${data.market_data.low_24h.usd}</p>
            `
        })
        .catch(error => console.log(error))

//_____________________________________________________________________________________________________________________________________________________
// TIME API NOT REALLY URL API 

async function showingTime() {
    //For Time 
    const date = new Date() 
        time.textContent = date.toLocaleTimeString("en-us", {timeStyle: "medium"});
} //console.log(`Must show something on time here: ${Object.datetime}` OR ${data.datetime}); // Shows undefined OR API not reachable
setInterval(showingTime, 1000)

//_____________________________________________________________________________________________________________________________________________________



// WEATHER API 
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        }) 
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementsById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)} </p>
                <p class="weather-city">${data.name} </p>
            `
        })
       .catch(error => console.log(error))
});

//_____________________________________________________________________________________________________________________________________________________
// BACKGROUND SHUFFLE IMAGE API 
function showWeatherBackground() {
    // For Background Image
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.body.style.backgroundImage = `url(${data.urls.regular})`
            document.getElementById("author").textContent = `By: ${data.user.name}`
        })  
    }
    showWeatherBackground()