import { arrow } from "../assets";

const UnitType = ({ units, handleUnits }) => {
  return (
    <div className="weahter-type">
      <p className={`${units === "metric" && "active"}`}>Celsius</p>
      <img
        src={arrow}
        alt="arrow"
        width="30px"
        height="30px"
        onClick={handleUnits}
      />
      <p className={`${units === "imperial" && "active"}`}>Fahrenheit</p>
    </div>
  );
};

export default UnitType;
