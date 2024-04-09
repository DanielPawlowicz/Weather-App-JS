import './style.css';
import { getWeather } from './weather';
import { ICON_MAP } from './iconMap';

getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(er => {
    console.error(er);
    alert("error getting weather");
});

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(data => {
//     console.log(data);
// });

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
//     console.log(res.data);
// });


function renderWeather({ current, daily, hourly}){
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    // renderHourlyWeather(hourly);
    document.body.classList.remove("blurred")
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


const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: "long"});
const dailySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.getElementById("day-card-template");

function renderDailyWeather(daily){
    dailySection.innerHTML = "";
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true); // Corrected cloning method
        setValue("temp", day.maxTemp, {parent: element});
        setValue("date", DAY_FORMATTER.format(day.timestamp), {parent: element});
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
        dailySection.append(element);
    })
}


