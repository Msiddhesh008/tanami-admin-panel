import React, { useState } from "react";

const input01Style = {
  width: "100%",
  border: "1px solid #ADB3BD",
  outline: "none",
  height: 50,
  fontSize: "16px",
};

const focusedInputStyle = {
  border: "1px solid #38187C", // Change border color for focused state
};

const Input01 = ({ type, placeholder, onChange, name, register }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input
      style={
        
        isFocused ? { ...input01Style, ...focusedInputStyle } : input01Style
      }
      type={type}
      name={name}
      className="rounded-3 ps-3 d-flex  align-items-center"
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default Input01;
