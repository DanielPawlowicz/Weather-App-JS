import axios from "axios";

//latitude=50.0614&longitude=19.9366&

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Europe%2FBerlin

// return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime${timezone}`);

//https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime

//https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime

//https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Europe%2FBerlin

export function getWeather(lat, lon, timezone) {
    return axios.get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime", 
        {
            params:{
                latitude: lat,
                longitude: lon,
                timezone,
            },
        }
    )
    .then(({data}) => {
        // return data;
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({current, daily}) {
        const {
            temperature_2m: currentTemp,
            wind_speed_10m: windSpeed,
            weather_code: iconCode
        } = current

        const {
            temperature_2m_max: [maxTemp],
            temperature_2m_min: [minTemp],
            apparent_temperature_max: [maxFeelsLike],
            apparent_temperature_min: [minFeelsLike],
            precipitation_sum: [precip],
        } = daily

        return{
            currentTemp: Math.round(currentTemp),
            highTemp: Math.round(maxTemp),
            lowTemp: Math.round(minTemp),
            highFeelsLike: Math.round(maxFeelsLike),
            lowFeelsLike: Math.round(minFeelsLike),
            windSpeed ,
            precip: Math.round(precip * 100) / 100,
            iconCode ,
        }
}

function parseDailyWeather({daily}){
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weather_code[index],
            maxTemp: Math.round(daily.temperature_2m_max[index]),
        }
    });
}

function parseHourlyWeather({hourly, current}){
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: hourly.weather_code[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.wind_speed_10m[index]),
            precip: Math.round(hourly.precipitation[index]),
        }
    }).filter(({timestamp}) => timestamp >= current.time * 1000)
}