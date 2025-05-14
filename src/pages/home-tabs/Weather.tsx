import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonText } from '@ionic/react';

// Replace with your WeatherAPI key
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

// Shared violet-black styles for glowing effect
const glowStyle = {
  boxShadow: '0 0 12px violet',
  backgroundColor: '#111',
  color: 'white',
  border: '1px solid violet',
  borderRadius: '10px',
  padding: '15px',
};

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Default location (you can use a specific city or fetch based on geolocation)
  const defaultCity = 'New York'; // Change to any city you prefer

  // Function to fetch the weather data
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: city,
          aqi: 'no', // You can turn off the air quality data if you don't need it
        },
      });

      console.log('Weather API Response:', response.data);  // Debugging response
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather data:', err);  // Log error
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
    <IonContent style={{ backgroundColor: '#121212' }}>
      {weatherData && (
        <div style={{ padding: '20px', color: 'white' }}>
          <IonText>
            <h2 style={glowStyle}>Weather in {weatherData.location.name}</h2>
            <p style={{ color: 'white' }}>Here’s the current weather information:</p>
          </IonText>

          <IonCard style={{ marginTop: '20px', ...glowStyle }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: 'violet' }}>Weather Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>Temperature: {weatherData.current.temp_c}°C</IonLabel>
              <br />
              <IonLabel>Weather: {weatherData.current.condition.text}</IonLabel>
              <br />
              <IonLabel>Humidity: {weatherData.current.humidity}%</IonLabel>
              <br />
              <IonLabel>Wind Speed: {weatherData.current.wind_kph} km/h</IonLabel>
            </IonCardContent>
          </IonCard>
        </div>
      )}
    </IonContent>
  );
};

export default Weather;
