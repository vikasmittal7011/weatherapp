const WeatherInfo = ({ weatherData, units }) => {
  return (
    <div className="weather-info">
      <img
        src={weatherData?.img}
        alt="weather-icon"
        width="100px"
        height="100px"
      />
      <h2>
        {Math.floor(weatherData?.main?.temp)}°{units === "metric" ? "c" : "f"}
      </h2>
      <p>{weatherData?.weather[0]?.description}</p>
    </div>
  );
};

export default WeatherInfo;
