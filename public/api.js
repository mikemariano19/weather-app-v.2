let city = document.getElementById('city')
let locations = document.getElementById('location');
let dateAndTime = document.getElementById('date');
let temp = document.getElementById('temperature');
let feelsLike = document.getElementById('feels-like');
let weatherDescription = document.getElementById('weather-description');
let icon = document.getElementById('icon');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let wind = document.getElementById('wind');
let country = document.getElementById('country');
let btn = document.getElementById('btn');


const show = () => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=dc0b2d1eb4fa8ffcf52f194470748c73`;
    
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const date = new Date();
            const formattedDate = formatDateTime(date);
            
            dateAndTime.innerHTML = formattedDate;

            const temperatureData = `${convertToCelsius(data.main.temp)}°`;
            const feelsData = `Feels like ${convertToCelsius(data.main.feels_like)}°`;
            const weatherDescriptionData = data.weather[0].description.toUpperCase();
            const locationData = data.name.toUpperCase();
            const humidityData = `Humidity: ${data.main.humidity}%`;
            const windData = `Wind: ${data.wind.speed} m/s`;
            const countryData = `Country: ${data.sys.country}`;
            const pressureData = `Pressure: ${data.main.pressure} hPa`;
            const iconCode = data.weather[0].icon;
            const weatherCondition = data.weather[0].main.toLowerCase();

            setWeatherIcon(iconCode);
            displayWeatherData({ 
                temperatureData, feelsData, weatherDescriptionData, 
                locationData, humidityData, windData, 
                countryData, pressureData 
            });

            changeBackground(weatherCondition);
            document.getElementById('weather-result').style.display = 'block';
            city.value = ''; // Clear the input field after success
        })
        .catch(handleError);
};

const formatDateTime = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[date.getDay()];
    let hr = date.getHours();
    let min = date.getMinutes();
    let ampm = hr >= 12 ? "pm" : "am";
    
    hr = hr % 12 || 12; // Convert to 12-hour format
    min = min < 10 ? `0${min}` : min;

    let formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}<br>${day} ${hr}:${min}${ampm}`;
    
    return formattedDate;
};

const convertToCelsius = (temp) => {
    return (temp - 273.15).toPrecision(3);
};

const setWeatherIcon = (iconCode) => {
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon">`;
};

const displayWeatherData = ({ temperatureData, feelsData, weatherDescriptionData, locationData, humidityData, windData, countryData, pressureData }) => {
    temp.innerHTML = temperatureData;
    feelsLike.innerHTML = feelsData;
    weatherDescription.innerHTML = weatherDescriptionData;
    locations.innerHTML = locationData;
    humidity.innerHTML = humidityData;
    wind.innerHTML = windData;
    country.innerHTML = countryData;
    pressure.innerHTML = pressureData;
};

const handleError = (err) => {
    document.body.style.backgroundImage = 'url(/public/backgroundImages/errorBG.jpg)';
    document.getElementById('weather-result').style.display = 'none';
};


const changeBackground = (weatherCondition) => {
    let backgroundImage;

    switch (weatherCondition) {
        case 'clear':
            backgroundImage = 'url(/public/backgroundImages/clear_sky.jpg)';
            break;
        case 'clouds':
            backgroundImage = 'url(/public/backgroundImages/cloudy.jpg)';
            break;
        case 'rain':
            backgroundImage = 'url(/public/backgroundImages/raining.jpg)';
            break;
        case 'snow':
            backgroundImage = 'url(/public/backgroundImages/snow.jpg)';
            break;
        case 'thunderstorm':
            backgroundImage = 'url(/public/backgroundImages/thunderstorm.jpg)';
            break;
        default:
            backgroundImage = 'url(/public/backgroundImages/abstract-sky-cloud.jpg)'; // Fallback image
            break;
    }

    document.body.style.backgroundImage = backgroundImage;
}

