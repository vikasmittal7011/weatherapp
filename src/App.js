import { useEffect, useState } from "react";

import { clear, cloud, drizzle, rain, snow } from "./assets/index";
import UnitType from "./components/UnitType";
import WeatherInfo from "./components/WeatherInfo";
import OtherInfo from "./components/OtherInfo";
import InputSection from "./components/InputSection";
import Loader from "./components/Loader";
import TopSection from "./components/TopSection";

const App = () => {
  const [address, setAddress] = useState("Delhi");
  const [units, setUnits] = useState("metric");
  const [pinCode, setPinCode] = useState("");
  const [searchType, setSearchType] = useState("address");
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const api = "f252146a90794c482631a9aabea1cff9";
  const openCogeAPI = "91e4a7d50f734122ad4fce4a5dd5ca4a";

  const handleSearch = () => {
    setSearchType(searchType === "address" ? "pincode" : "address");
    setAddress("");
    setPinCode("");
  };

  const handleAddress = (place) => {
    setAddress(place);
    setError();
  };

  const handlePicode = (code) => {
    setPinCode(+code);
    setError();
  };

  const handleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const getCoords = async (pincode) => {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${openCogeAPI}`;
    const response = await fetch(geocodeUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.results[0]) {
        return data.results[0].geometry;
      } else {
        setError({
          cod: 404,
          message: "No results found for the provided postal code.",
        });
      }
    } else {
      setError({
        cod: 500,
        message: `Request failed with status: ${response.status}`,
      });
    }
  };

  const getAddress = async (coords) => {
    const query = `${coords.lat},${coords.lon}`;
    const geocodeUrl =
      `https://api.opencagedata.com/geocode/v1/json` +
      "?" +
      "key=" +
      openCogeAPI +
      "&q=" +
      encodeURIComponent(query) +
      "&pretty=1" +
      "&no_annotations=1";
    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWeather = async (location) => {
    setWeatherData();
    setLoading(true);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${api}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      const place = await getAddress(data.coord);
      const img = backGoundImage(data?.weather?.[0]?.icon);
      setWeatherData({
        ...data,
        img,
        address: place?.results?.[0]?.formatted,
      });
      setLoading(false);
    } else {
      setError(data);
      setLoading(false);
    }
  };

  const hanldeClick = async () => {
    setWeatherData();
    if (address) {
      fetchWeather(`q=${address}&units=${units}`);
    } else if (pinCode) {
      const location = await getCoords(pinCode);
      if (location) {
        fetchWeather(`lat=${location.lat}&lon=${location.lng}`);
      }
    }
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setAddress("");
      setPinCode();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          setError({
            cod: 404,
            message: "Plase enable location to use current location",
          });
        }
      );
    } else {
      setError({
        cod: 404,
        message: "Plase enable location to use current location",
      });
    }
  };

  const backGoundImage = (id) => {
    switch (id) {
      case "01d" || "01n":
        return clear;

      case "02d" || "02n":
        return cloud;

      case "03d" || "03n":
        return drizzle;

      case "04d" || "04n":
        return cloud;

      case "09d" || "09n":
        return rain;

      case "10d" || "10n":
        return rain;

      case "13d" || "13n":
        return snow;

      case "50d" || "50n":
        return snow;

      default:
        return clear;
    }
  };

  useEffect(() => {
    hanldeClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return (
    <div className="container main-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopSection
            weatherData={weatherData}
            searchType={searchType}
            handleCurrentLocation={handleCurrentLocation}
            handleSearch={handleSearch}
          />
          <InputSection
            searchType={searchType}
            handleAddress={handleAddress}
            address={address}
            handlePicode={handlePicode}
            pinCode={pinCode}
            hanldeClick={hanldeClick}
          />{" "}
          {weatherData ? (
            <>
              <UnitType units={units} handleUnits={handleUnits} />
              <WeatherInfo weatherData={weatherData} units={units} />
              <OtherInfo weatherData={weatherData} />
            </>
          ) : (
            <>
              {error && (
                <div>
                  <p>Error Code: {error?.cod}</p>
                  <p>Error Message: {error?.message}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
