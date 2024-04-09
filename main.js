import './style.css';
import { getWeather } from './weather';

getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(data => {
    console.log(data);
});

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(data => {
//     console.log(data);
// });

// getWeather(50.0614, 19.9366, Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
//     console.log(res.data);
// });
