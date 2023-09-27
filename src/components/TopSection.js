const TopSection = ({
  weatherData,
  searchType,
  handleCurrentLocation,
  handleSearch,
}) => {
  return (
    <>
      <p>{weatherData?.address}</p>
      <div className="search-options">
        <p onClick={handleSearch} className="search-type">
          Search via {searchType}
        </p>
        <p onClick={handleCurrentLocation} className="search-type">
          Use current location
        </p>
      </div>
    </>
  );
};

export default TopSection;
