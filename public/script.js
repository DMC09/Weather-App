// SEARCH BOX
const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)


searchBox.addListener('places_changed', () => {
  console.log('Location Selected');
  const place = searchBox.getPlaces()[0]
  if (place == null) return
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
    console.log(data);
    setWeatherData(data, place.formatted_address)
  })
})

const icon = new Skycons({color: '#B2D1D9'})
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const percipitationElement = document.querySelector('[data-percipitation]')
const windElement = document.querySelector('[data-wind]')
const humidityElement = document.querySelector('[data-humidity]')
icon.set ('icon', 'cloudy')
icon.play()


function setWeatherData(data, place) {
  console.log(data);
  console.log('Updating Weather Data');
  locationElement.textContent = place
  statusElement.textContent = data.summary
  temperatureElement.textContent = ` ${data.temperature} ℉ `
  percipitationElement.textContent = `${data.precipProbability * 100}%`
  windElement.textContent =  ` ${data.windSpeed} mph `
  humidityElement.textContent = `${data.humidity * 100}%`
  icon.set('icon', data.icon)
  icon.play()
}
