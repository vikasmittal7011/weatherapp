import { search } from "../assets";
import Input from "./Input";

const InputSection = ({
  searchType,
  handleAddress,
  address,
  handlePicode,
  pinCode,
  hanldeClick,
}) => {
  return (
    <div className="search-container">
      {searchType === "address" ? (
        <Input
          handleInput={handleAddress}
          placeholder="Enter city name..."
          type="text"
          value={address}
        />
      ) : (
        <Input
          handleInput={handlePicode}
          placeholder="Enter pincode..."
          type="number"
          value={pinCode}
        />
      )}
      <img
        src={search}
        alt="search"
        width="38px"
        height="38px"
        onClick={hanldeClick}
      />
    </div>
  );
};

export default InputSection;
