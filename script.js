const API_KEY = "607f7dd5135138fe599232479758b981";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const errorDiv = document.getElementById("error");
const weatherCard = document.getElementById("weather");
const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const iconEl = document.getElementById("weather-icon");


async function getWeather(city) {

    errorDiv.textContent = "";
    weatherCard.classList.add("hidden");
    errorDiv.textContent = "Loading..."

    if (!city) {
        errorDiv.textContent = "Please enter a city name.";
        weatherCard.classList.add("hidden");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
        )}&appid=${API_KEY}&units=metric`;

        const res = await fetch(url);

        if (!res.ok) {
            if (res.status === 404) {
                errorDiv.textContent = "City not found. Please try again.";
            } else {
                errorDiv.textContent = "Unable to fetch weather. Try again later.";
            }
            weatherCard.classList.add("hidden");
            return;
        }

        const data = await res.json();
        console.log(data)
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const cityName = `${data.name}, ${data.sys.country}`;
        const iconCode = data.weather[0].icon;

        iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconEl.classList.remove("hidden");


        errorDiv.textContent = "";
        cityNameEl.textContent = cityName;
        tempEl.textContent = `Temperature: ${temp.toFixed(1)}°C`;
        if (temp > 28) {
            document.body.style.background = "linear-gradient(#ff9966, #ff5e62)";
        } else if (temp < 10) {
            document.body.style.background = "linear-gradient(#4facfe, #00f2fe)";
        } else {
            document.body.style.background = "linear-gradient(#0f172a, #a7b0d7ff)";
        }

        descEl.textContent = `Condition: ${description}`;
        humidityEl.textContent = `Humidity: ${humidity}%`;

        weatherCard.classList.remove("hidden");
    } catch (err) {
        console.error(err);
        errorDiv.textContent = "Network error. Please check your connection.";
        weatherCard.classList.add("hidden");
    }
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeather(city);
    cityInput.value="";
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        getWeather(city);
        cityInput.value="";
    }
});

