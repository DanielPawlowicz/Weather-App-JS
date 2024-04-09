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
        return data;

    });
}