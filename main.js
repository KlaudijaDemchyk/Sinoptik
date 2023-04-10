document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e9a5d3b74bf84418b11193028231901';
    const header = document.querySelector('.card-panel');
    const form = document.querySelector('.form');
    const input = document.querySelector('#inputCity');

    const conditionImages = {
        'Clear': './img/Clear.jpg',
        'Sunny': './img/Clear.jpg',
        'Partly cloudy': './img/Partly_cloudy.jpg',
        'Cloudy': './img/Cloudy.jpg',
        'Rain': './img/Rain.jpg',
        'Light rain': './img/Light_rain.jpg',
        'Snow': './img/Snow.jpg',
    };

    form.onsubmit = function (e) {
        e.preventDefault();

        let city = input.value.trim();

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                if (data.error) {
                    const prevCard = document.querySelector('.card');
                    if (prevCard) prevCard.remove();
                    const html = `<div class="card">${data.error.message}</div>`;
                    header.insertAdjacentHTML('afterend', html);

                } else {
                    const prevCard = document.querySelector('.card');
                    if (prevCard) prevCard.remove();

                    const conditionImageUrl = conditionImages[data.current.condition.text];

                    const html = `<div class="card z-depth-5">
                            <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                            <div class="card-weather">
                                <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                <img class="card-img" src="${conditionImageUrl}" alt="Weather">
                            </div>
                            <div class="card-description">${data.current.condition.text}</div>
                        </div>`;
                    header.insertAdjacentHTML('afterend', html);
                }
            });
    }
});
