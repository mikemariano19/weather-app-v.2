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

city.addEventListener('keydown', function(event){
    if(event.key === 'Enter')
    show();
})



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

        icon.innerHTML = ` <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="" id="">`;
        temp.innerHTML = temperatureData.toUpperCase();
        feelsLike.innerHTML = feelsData;
        weatherDesc.innerHTML = weatherDescData.toUpperCase();
        locations.innerHTML = locationData.toUpperCase();
        humidity.innerHTML = humidityData;
        wind.innerHTML = windData;
        country.innerHTML = countryData;
        pressure.innerHTML = pressureData;

        city.value = '';
        // console.log(data)
    })
    .catch(err => alert('Invalid City!'))
}

