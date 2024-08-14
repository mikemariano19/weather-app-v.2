let city = document.getElementById('city')
let locations = document.getElementById('location');
let dateAndTime = document.getElementById('date');
let temp = document.getElementById('temperature');
let feelsLike = document.getElementById('feels-like');
let weatherDesc = document.getElementById('weather-description');
let icon = document.getElementById('icon');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let wind = document.getElementById('wind');
let country = document.getElementById('country');
let btn = document.getElementById('btn');

// city.addEventListener('keydown', function(event){
//     if(event.key === 'Enter')
//     show();
//     window.refresh();
// })



 function show(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&appid=dc0b2d1eb4fa8ffcf52f194470748c73')
    .then(response => response.json())
    .then(data => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var d = new Date();
        var day = days[d.getDay()];
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = "am";
        if( hr > 12 ) {
            hr -= 12;
            ampm = "pm";
        }
        var date = d.getDate();
        var month = months[d.getMonth()];   
        var year = d.getFullYear();
        dateAndTime.innerHTML = month + " " + date + ", " + year +"<br>"+ day + " "  + " " + hr + ":" + min + ampm;

        let temperatureData = Math.abs(data['main']['temp']-273.15).toPrecision(3)+'°';
        let feelsData = 'Feels like' + ' ' + Math.abs(data['main']['feels_like']-273.15).toPrecision(3)+'°';
        let weatherDescData = data['weather']['0']['description'];
        let locationData = data['name'];
        let humidityData = 'Humidity:' + ' ' + data['main']['humidity'];
        let windData = 'Wind:' + ' ' + data['wind']['speed'];
        let countryData = 'Country:' + ' ' + data['sys']['country'];
        let pressureData = 'Pressure:' + ' ' + data['main']['pressure'];
        let iconCode = data['weather']['0']['icon'];
        let weatherCondition = data['weather']['0']['main'];


        icon.innerHTML = ` <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="" id="">`;
        temp.innerHTML = temperatureData.toUpperCase();
        feelsLike.innerHTML = feelsData;
        weatherDesc.innerHTML = weatherDescData.toUpperCase();
        locations.innerHTML = locationData.toUpperCase();
        humidity.innerHTML = humidityData;
        wind.innerHTML = windData;
        country.innerHTML = countryData;
        pressure.innerHTML = pressureData;

        changeBackground(weatherCondition.toLowerCase())

        city.value = '';
        console.log(data)

        //  // Set a condition for the background image
        //  let condition = data.weather[0].main;
        //  let backgroundImage = '';
        //  // Select images based on condition
        //  switch(condition.toLowerCase()) {
        //    case 'clouds': backgroundImage = '/images/cloudy.jpg'; break;
        //    case 'rain': backgroundImage = '/images/rainy.jpg'; break;
        //    case 'snow': backgroundImage = '/images/snowy.jpg'; break;
        //    case 'clear': backgroundImage = '/images/sunny.jpg'; break;
        //    default: backgroundImage = '/images/default.jpg';
        //  }
   
        //  // Create a style element and set the selected image as the background
        //  let styleNode = document.createElement("style");
        //  document.head.appendChild(styleNode);
        //  styleNode.innerHTML = `html body { background-image: url('${backgroundImage}'); }`;

        
    })
    .catch(err => alert('Invalid City!'))
}

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
            backgroundImage = 'url(/public/backgroundImages/yelpcamp.png)'; // Fallback image
            break;
    }

    document.body.style.backgroundImage = backgroundImage;
}

