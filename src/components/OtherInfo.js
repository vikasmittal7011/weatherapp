import { humidity, wind } from "../assets";

const OtherInfo = ({ weatherData }) => {
  return (
    <div className="other-weather-info">
      <div className="info-container">
        <img src={humidity} alt="humidity" />
        <div>
          <p>{weatherData?.main?.humidity}%</p>
          <p>humidity</p>
        </div>
      </div>
      <div className="info-container">
        <img src={wind} alt="wind" />
        <div>
          <p>{Math.floor(weatherData?.wind?.speed)} km/h</p>
          <p>wind speed</p>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
