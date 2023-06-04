/* eslint-disable linebreak-style */
/* eslint-disable quote-props */

type ConditionImages = {
  [key: string]: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const apiKey: string = 'e9a5d3b74bf84418b11193028231901';
  const header: HTMLElement | null = document.querySelector('.card-panel');
  const form: HTMLFormElement | null = document.querySelector('.form');
  const input: HTMLInputElement | null = document.querySelector('#inputCity');
  const conditionImages: ConditionImages = {
    'Clear': './img/Clear.jpg',
    'Sunny': './img/Clear.jpg',
    'Partly cloudy': './img/Partly_cloudy.jpg',
    'Cloudy': './img/Cloudy.jpg',
    'Rain': './img/Rain.jpg',
    'Light rain': './img/Light_rain.jpg',
    'Snow': './img/Snow.jpg',
    'Mist': './img/Mist.webp',
  };
  form?.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const city: string = input?.value.trim() || '';
    const url: string = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
      .then((response: Response) => response.json())
      .then((data: any) => {
        if (data.error) {
          const prevCard: HTMLElement | null = document.querySelector('.card');
          if (prevCard) prevCard.remove();
          const html: string = `<div class="card">${data.error.message}</div>`;
          header?.insertAdjacentHTML('afterend', html);
        } else {
          const prevCard: HTMLElement | null = document.querySelector('.card');
          if (prevCard) prevCard.remove();
          let conditionImageUrl: string = './img/Clear.jpg';
          // eslint-disable-next-line no-prototype-builtins
          if (conditionImages.hasOwnProperty(data.current.condition.text)) {
            conditionImageUrl = conditionImages[data.current.condition.text];
          }
          const html: string = `<div class="card z-depth-5">
                              <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                              <div class="card-weather">
                                  <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                  <img class="card-img" src="${conditionImageUrl}" alt="Weather">
                              </div>
                              <div class="card-description">${data.current.condition.text}</div>
                          </div>`;
          header?.insertAdjacentHTML('afterend', html);
        }
      })
      .catch((error: Error) => {
        const prevCard: HTMLElement | null = document.querySelector('.card');
        if (prevCard) prevCard.remove();
        const html: string = `<div class="card">Error: ${error.message}</div>`;
        header?.insertAdjacentHTML('afterend', html);
      });
  });
});
