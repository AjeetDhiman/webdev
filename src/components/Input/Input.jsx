import React, { forwardRef } from "react";
import PropTypes from "prop-types";

export const Input = forwardRef(
  ({ type, id, name, className, inputHandler, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        onInput={inputHandler}
        className={`peer rounded-md bg-[#F7F7F7] px-5 py-3 text-black placeholder:text-theme focus:outline-none focus-visible:bg-[#eaeaea] focus-visible:ring-0 focus-visible:transition ${className}`}
        {...props}
      />
    );
  },
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  inputHandler: PropTypes.func,
};
