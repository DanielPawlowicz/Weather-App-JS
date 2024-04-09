import './style.css';
import { getWeather } from './weather';
import { ICON_MAP } from './iconMap';

getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(er => {
    console.error(er);
    alert("error getting weather");
});

function renderWeather({ current, daily, hourly}){
    renderCurrentWeather(current);
//     renderDailyWeather(daily);
//     renderHourlyWeather(hourly);
}

function setValue(selector, value, {parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode){
    return `icons/${ICON_MAP.get(iconCode)}.png`;
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode);
    setValue("current-temp", current.currentTemp);
    setValue("current-high", current.highTemp);
    setValue("current-low", current.lowTemp);
    setValue("current-fl-high", current.highFeelsLike);
    setValue("current-fl-low", current.lowFeelsLike);
    setValue("current-wind", current.windSpeed);
    setValue("current-precip", current.precip);
}

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(data => {
//     console.log(data);
// });

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
//     console.log(res.data);
// });
