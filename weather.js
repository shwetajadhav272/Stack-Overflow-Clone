const apiKey = 'a4f2abef3a86c5c3e6ed4c495d231b43';

function setThemeBasedOnWeather() {
    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main;
            applyTheme(weather);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function applyTheme(weather) {
    const body = document.body;
    if (weather === 'Clear' || weather === 'Clouds') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }
}

// Call the function on page load
window.onload = setThemeBasedOnWeather;
