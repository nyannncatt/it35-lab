import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Inline styles
const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(135deg,rgb(200, 82, 216),rgb(26, 23, 209))',
    padding: '40px 20px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(73, 6, 6, 0.2)',
    width: '100%',
    maxWidth: '400px',
    margin: '50px auto',
    color: '#fff',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in-out',
  },
  input: {
    padding: '10px',
    width: '80%',
    borderRadius: '10px',
    border: 'none',
    marginBottom: '20px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#0077ff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  header: {
    fontSize: '26px',
    marginBottom: '10px',
    fontWeight: 'bold' as const,
    textShadow: '0 0 5px rgba(255,255,255,0.7)',
  },
  icon: {
    width: '100px',
    height: '100px',
    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))',
    animation: 'pulse 2s infinite',
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '8px',
    textShadow: '0 0 4px rgba(0,0,0,0.3)',
  },
  loading: {
    fontSize: '20px',
    textAlign: 'center' as const,
    marginTop: '100px',
    color: '#444',
  },
  error: {
    fontSize: '20px',
    color: 'red',
    textAlign: 'center' as const,
    marginTop: '100px',
  },
};

// CSS animations
const animationStyle = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const WeatherContainer = () => {
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiKey = '2205c9ef35e2bbd60b76fcd2113b3adc';
  const units = 'metric';

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found or failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim() !== '') {
      setCity(searchCity.trim());
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading weather data...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <>
      <style>{animationStyle}</style>
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>

        <h2 style={styles.header}>Weather in {weatherData.name}</h2>
        <img src={iconUrl} alt="Weather Icon" style={styles.icon} />
        <p style={styles.paragraph}>Temperature: {weatherData.main.temp}°C</p>
        <p style={styles.paragraph}>Condition: {weatherData.weather[0].description}</p>
        <p style={styles.paragraph}>Humidity: {weatherData.main.humidity}%</p>
        <p style={styles.paragraph}>Wind: {weatherData.wind.speed} m/s</p>
      </div>
    </>
  );
};

export default WeatherContainer;
