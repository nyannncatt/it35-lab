import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel } from '@ionic/react';

// Your OpenWeatherMap API Key (Replace this with your own key)
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Default location (you can use a specific city or fetch based on geolocation)
  const defaultCity = 'New York';  // Change to any city you prefer

  // Function to fetch the weather data
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Optional: Use 'imperial' for Fahrenheit
        },
      });
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching weather data');
    }
  };

  // Fetch the weather data when the component mounts
  useEffect(() => {
    fetchWeather(defaultCity);
  }, []);

  if (loading) {
    return <IonLabel>Loading weather data...</IonLabel>;
  }

  if (error) {
    return <IonLabel>{error}</IonLabel>;
  }

  // Render the weather data
  return (
    <IonContent>
      {weatherData && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Weather in {weatherData.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Temperature: {weatherData.main.temp}°C</IonLabel>
            <br />
            <IonLabel>Weather: {weatherData.weather[0].description}</IonLabel>
            <br />
            <IonLabel>Humidity: {weatherData.main.humidity}%</IonLabel>
            <br />
            <IonLabel>Wind Speed: {weatherData.wind.speed} m/s</IonLabel>
          </IonCardContent>
        </IonCard>
      )}
    </IonContent>
  );
};

export default Weather;
