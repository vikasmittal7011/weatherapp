const Input = ({ handleInput, placeholder, type, value }) => {
  const handleChnage = (e) => {
    handleInput(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        onChange={handleChnage}
        value={value}
      />
    </div>
  );
};

export default Input;
