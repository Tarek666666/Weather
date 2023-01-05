//declaring general variabels
const userInput = document.querySelector(".input_text");
const submitBtn = document.querySelector(".form");
let cardsContainer = document.querySelector(".cards_container");
let city = "";
let searchedCities = [];
let errorDisplay = document.querySelector(".error_area");
let errorMessage = "";

// catching the user's input and save it into variable

userInput.addEventListener("keyup", function (e) {
    city = e.target.value;
});

// when user clicks on submit button we call the fuction to fetch the data of the city
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    userInput.value = "";

    //input field shouldnot be empty
    if (city.length == 0) {
        errorDisplay.classList.add("visible");

        errorMessage = "You can't leave it empty";
        errorDisplay.innerHTML = errorMessage;
    } else {
        // check if the new city is already existed before and if so gives an error
        if (searchedCities.includes(city)) {
            errorDisplay.classList.add("visible");
            errorMessage = "You Already Have the Data of this City !!!";
            errorDisplay.innerHTML = errorMessage;
        } else {
            // if the city is to be searched for first time continue
            errorDisplay.classList.remove("visible");
            searchedCities.push(city);
            getCityInfo();
        }
    }

    //reset value of city
    city = "";
});

function getCityInfo() {
    const key = "18276d188c589a15735372f13b4d610b";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                errorDisplay.classList.add("visible");
                errorMessage = "Please Enter a valid City";
                errorDisplay.innerHTML = errorMessage;
            }
        })
        .then((cityInfo) => {
            displayInfo(cityInfo);
        })
        .catch((err) => console.log(err));
}

function displayInfo(cityInfo) {
    const {
        main,
        main: { temp, temp_max, temp_min },
        id,
        name,
        weather,
        sys,
        sys: { country },
        wind,
        wind: { speed },
    } = cityInfo;
    let mainWeather = weather[0].main;
    let typeCode = weather[0].id;

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`${name}_card`);

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card_header");
    let cityName = document.createElement("div");
    cityName.classList.add("city_name");
    let countryName = document.createElement("div");
    countryName.classList.add("Country");

    let cardIcon = document.createElement("div");
    cardIcon.classList.add("card_icon");
    let canvasIcon = document.createElement("canvas");
    canvasIcon.setAttribute("id", "icon");
    canvasIcon.classList.add(`${name}`);

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card_footer");
    let mainWeatherInfo = document.createElement("div");
    mainWeatherInfo.classList.add("main_weather_info");
    let tempRight = document.createElement("div");
    tempRight.classList.add("temp");

    cardsContainer.appendChild(card);
    card.appendChild(cardHeader);
    cardHeader.appendChild(cityName);
    cardHeader.appendChild(countryName);
    card.appendChild(cardIcon);
    cardIcon.appendChild(canvasIcon);
    card.appendChild(cardFooter);
    cardFooter.appendChild(mainWeatherInfo);
    cardFooter.appendChild(tempRight);

    let countryDisplay = document.querySelector(`.${name}_card`);
    countryDisplay.querySelector(".Country").innerHTML = country;
    countryDisplay.querySelector(".city_name").innerHTML = name;
    let iconDisplay = document.querySelector(`.${name}`);

    mainWeatherInfo.innerHTML = ` <div class="wind"><i class="fa fa-duotone fa-wind"></i>${Math.round(
        speed
    )}</div>
    <div class="max"><i class='fas fa-temperature-high' ></i>${Math.round(temp_max)}</div>
     <div class="min"><i class='fas fa-temperature-low' ></i>${Math.round(temp_min)}</div>`;

    tempRight.innerHTML = Math.round(temp);

    checkUpdateWeatherIcon(typeCode, iconDisplay);

    console.log(iconDisplay);
}

function checkUpdateWeatherIcon(typeCode, iconDisplay) {
    let skycons = new Skycons({ color: "white" });

    if (typeCode <= 400) {
        skycons.add(iconDisplay, Skycons.FOG);
        skycons.play();
    } else if (typeCode >= 401 && typeCode <= 599) {
        skycons.add(iconDisplay, Skycons.RAIN);
        skycons.color = "aqua";
        skycons.play();
    } else if (typeCode >= 600 && typeCode <= 700) {
        skycons.add(iconDisplay, Skycons.SNOW);
        skycons.play();
    } else if (typeCode >= 701 && typeCode <= 799) {
        skycons.add(iconDisplay, Skycons.FOG);
        skycons.play();
    } else if (typeCode == 800) {
        skycons.add(iconDisplay, Skycons.CLEAR_DAY);
        skycons.color = "orange";
        skycons.play();
    } else if (typeCode > 800) {
        skycons.add(iconDisplay, Skycons.PARTLY_CLOUDY_DAY);
        skycons.play();
    }
    console.log(typeCode);
}
