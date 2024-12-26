import React from "react";
import PropTypes from "prop-types";
export const FormWrapper = ({
  id,
  className = "",
  submitHandler,
  children,
}) => {
  return (
    <form id={id} className={`form ${className}`} onSubmit={submitHandler}>
      {children}
    </form>
  );
};

FormWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  formClass: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
  children: PropTypes.node,
};
