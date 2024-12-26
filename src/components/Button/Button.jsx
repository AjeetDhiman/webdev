import React from "react";
import PropTypes from "prop-types";

export const Button = ({ type = "button", id, className, children }) => {
  return (
    <button
      type={type}
      id={id}
      className={`btn${className ? " " + className : " " + "btn-default"}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
